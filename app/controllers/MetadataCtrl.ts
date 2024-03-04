/* -----------------------------------------------------------------------------
 *  Copyright (c) 2023, Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published by
 *  the Free Software Foundation, version 3.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program. If not, see <https://www.gnu.org/licenses/>.  
 *
 *  No Patent Rights, Trademark Rights and/or other Intellectual Property
 *  Rights other than the rights under this license are granted.
 *  All other rights reserved.
 *
 *  For any other rights, a separate agreement needs to be closed.
 *
 *  For more information please contact:  
 *  Fraunhofer FOKUS
 *  Kaiserin-Augusta-Allee 31
 *  10589 Berlin, Germany
 *  https://www.fokus.fraunhofer.de/go/fame
 *  famecontact@fokus.fraunhofer.de
 * -----------------------------------------------------------------------------
 */

import dotenv from 'dotenv'
dotenv.config()

import express, {
    Request,
    Response,
    NextFunction
} from 'express'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import axios from 'axios'
import {
    XMLBuilder,
} from 'fast-xml-parser'

import BiLoMetadataQueryModel from '../models/BiLoMetadata/BiLoMetadataQueryModel'
import BiLoMetadataQuerySchema from '../models/BiLoMetadata/BiLoMetadataQuerySchema'
import MetadataQueryModel from '../models/Metadata/MetadataQueryModel'
import MetadataQuerySchema from '../models/Metadata/MetadataQuerySchema'

import BiLoTransformer from '../helpers/BiLoTransformator'

const CORS_ACCESS_CONTROL_ALLOW_ORIGIN: string = (process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGIN) ? process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGIN : '*'

const METADATA_PROVIDER_API_PROTOCOL: string = (process.env.METADATA_PROVIDER_API_PROTOCOL) ? process.env.METADATA_PROVIDER_API_PROTOCOL : 'http'
const METADATA_PROVIDER_API_HOST: string = (process.env.METADATA_PROVIDER_API_HOST) ? process.env.METADATA_PROVIDER_API_HOST : '127.0.0.1'
const METADATA_PROVIDER_API_PORT: number = (process.env.METADATA_PROVIDER_API_PORT) ? parseInt(process.env.METADATA_PROVIDER_API_PORT) : 3041
const METADATA_PROVIDER_API_BASE_PATH: string = (process.env.METADATA_PROVIDER_API_BASE_PATH)
    ? (process.env.METADATA_PROVIDER_API_BASE_PATH.indexOf('/') == 0)
        ? process.env.METADATA_PROVIDER_API_BASE_PATH
        : '/' + process.env.METADATA_PROVIDER_API_BASE_PATH
    : ''

const METADATA_PROVIDER_API = METADATA_PROVIDER_API_PROTOCOL + '://' + METADATA_PROVIDER_API_HOST + ':' + METADATA_PROVIDER_API_PORT + METADATA_PROVIDER_API_BASE_PATH

const AJV = new Ajv({
    strict: false
})
addFormats(AJV)
const VALIDATE = AJV.compile(BiLoMetadataQuerySchema)

const FAST_XML_PARSER_OPTIONS = {
    attributeNamePrefix: '@_',
    textNodeName: 'value',
    ignoreAttributes: false,
}
const BUILDER = new XMLBuilder(FAST_XML_PARSER_OPTIONS)

class MetadataController {

    router: express.Router
    constructor() {
        this.router = express.Router({ mergeParams: true });
    }

    ping: express.Handler = async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN)

        let t_req = req.header('Date') ?? '1970-01-01T00:00:01.000Z'
        let t_res = Date.now()
        let response = {
            msg: 'ping',
            t: t_res,
            elapsed: t_res - new Date(t_req).getTime()
        }
        return res.json(response)
    }

    getInfo: express.Handler = async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN)

        return res.json({ ...MetadataQuerySchema })
    }

    getMetadataByQueryIDs = async (req: Request, res: Response, next: NextFunction) => {

        let context = {
            config: {
                headers: {
                    Authorization: '',
                    'Content-Type': ''
                }
            }
        }

        try {
            // import url search params using improt syntax


            // create new search params
            const params = new URLSearchParams({
                client_id: process.env.OIDC_BILO_CLIENT_ID!,
                client_secret: process.env.OIDC_BILO_CLIENT_SECRET!,
                grant_type: 'client_credentials'
            })

            const response = await axios.post(process.env.OIDC_AUTH_BILO_ENDPOINT!, params)
            context.config = {
                headers: {
                    Authorization: `Bearer ${response.data.access_token}`,
                    'Content-Type': 'application/vnd.de.bildungslogin.mediaquery+json'

                }
            }


        } catch (err: any) {
            return next(err)
        }



        try {
            const METADATA_BILO_API = process.env.METADATA_BILO_API || METADATA_PROVIDER_API
            res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN)
            let accept_header = req.header('Accept')?.toLowerCase() ?? ''
            let product_ids = req.body
            let list_of_MetadataQuery_responses: MetadataQueryModel[] = []
            let list_of_BiLoMetadataQuery_responses: BiLoMetadataQueryModel[] = []
            let reuest = (await axios.post(`${METADATA_BILO_API}`, product_ids, context.config)).data

            let i = 0
            for (let request_product_id_response of reuest) {
                let product_id = product_ids[i]
                const request_product_id_response_data: BiLoMetadataQueryModel = request_product_id_response
                if (VALIDATE(request_product_id_response_data)) {
                    const biloMetaDataQueryObj: BiLoMetadataQueryModel = new BiLoMetadataQueryModel(request_product_id_response_data)
                    list_of_BiLoMetadataQuery_responses.push(biloMetaDataQueryObj)
                    if (biloMetaDataQueryObj.data) {
                        let metadataQueryObj = await new BiLoTransformer(biloMetaDataQueryObj).toMetadataQuery()
                        if (metadataQueryObj) {
                            list_of_MetadataQuery_responses.push(metadataQueryObj)
                        }
                    }
                }
                 else {
                    const biloMetaDataErrorObj: BiLoMetadataQueryModel = new BiLoMetadataQueryModel({
                        query: {
                            id: product_id,
                        },
                        status: 406, //TODO: check whether 422 is more suitable
                    })
                    list_of_BiLoMetadataQuery_responses.push(biloMetaDataErrorObj)
                    let metadataQueryErrorObj = await new BiLoTransformer(biloMetaDataErrorObj).toMetadataQuery()
                    if (metadataQueryErrorObj) {
                        list_of_MetadataQuery_responses.push(metadataQueryErrorObj)
                    }
                }
                i++
            }

            let schema = req.query.schema
            if (schema === 'urn:bilo:metadata') {
                if (accept_header.indexOf('xml') > -1) {
                    res.set('Content-Type', 'text/xml')
                    return res.status(200).send(BUILDER.build({
                        MetadataQueries: {
                            MetadataQuery: list_of_BiLoMetadataQuery_responses,
                        }
                    }))
                }
                return res.status(200).json(list_of_BiLoMetadataQuery_responses)
            }
            if (accept_header.indexOf('xml') > -1) {
                res.set('Content-Type', 'text/xml')
                return res.status(200).send(BUILDER.build({
                    MetadataQueries: {
                        MetadataQuery: list_of_MetadataQuery_responses,
                    }
                }))
            }
            return res.status(200).json(list_of_MetadataQuery_responses)



        } catch (err) {
            console.error(err)
            return next(err)
        }
    }

    getMetadataByID = async (req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN)

        let accept_header = req.header('Accept')?.toLowerCase() ?? ''
        let product_id = req.params.product_id
        let biloMetaDataQueryObj: BiLoMetadataQueryModel | undefined
        let metadataQueryObj: MetadataQueryModel | undefined

        const request_product_id = encodeURIComponent(product_id)

        await axios.get(`${METADATA_PROVIDER_API}/${request_product_id}`)
            .then(async function (request_product_id_response) {
                const request_product_id_response_data: BiLoMetadataQueryModel = request_product_id_response.data
                if (VALIDATE(request_product_id_response_data)) {
                    biloMetaDataQueryObj = new BiLoMetadataQueryModel(request_product_id_response_data)
                    if (biloMetaDataQueryObj.data) {
                        metadataQueryObj = await new BiLoTransformer(biloMetaDataQueryObj).toMetadataQuery()
                    }
                } else {
                    biloMetaDataQueryObj = new BiLoMetadataQueryModel({
                        query: {
                            id: product_id,
                        },
                        status: 406, //TODO: check whether 422 is more suitable
                    })
                    metadataQueryObj = await new BiLoTransformer(biloMetaDataQueryObj).toMetadataQuery()

                }
            })
            .catch(async function (request_product_id_response_error) {
                biloMetaDataQueryObj = new BiLoMetadataQueryModel({
                    query: {
                        id: product_id,
                    },
                    status: request_product_id_response_error.response.status,
                })
                metadataQueryObj = await new BiLoTransformer(biloMetaDataQueryObj).toMetadataQuery()
            })

        try {
            let schema = req.query.schema
            if (schema === 'urn:bilo:metadata') {
                if (accept_header.indexOf('xml') > -1) {
                    res.set('Content-Type', 'text/xml')
                    return res.status(200).send(BUILDER.build({
                        MetadataQuery: biloMetaDataQueryObj,
                    }))
                }
                return res.status(200).json(biloMetaDataQueryObj)
            }
            if (accept_header.indexOf('xml') > -1) {
                res.set('Content-Type', 'text/xml')
                return res.status(200).send(BUILDER.build({
                    MetadataQuery: metadataQueryObj
                }))
            }
            return res.status(200).json(metadataQueryObj)
        }
        catch (error) {
            return res.status(400)
        }
    }

    getMetadata = async (req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Access-Control-Allow-Origin', CORS_ACCESS_CONTROL_ALLOW_ORIGIN)

        let accept_header = req.header('Accept')?.toLowerCase() ?? ''
        let list_of_BiLoMetaDataQuery_objects: BiLoMetadataQueryModel[] = []
        let list_of_MetadataQuery_objects: MetadataQueryModel[] = []

        await axios.get(`${METADATA_PROVIDER_API}`)
            .then(function (request_product_metadata_response) {
                let request_product_metadata_response_data: BiLoMetadataQueryModel[] = request_product_metadata_response.data.map(item => {
                    return {
                        query: {
                            id: item.id
                        },
                        status: 200,
                        data: item
                    }
                })
                request_product_metadata_response_data.forEach(async (element) => {
                    if (VALIDATE(element)) {
                        let biloMetaDataQueryObj = new BiLoMetadataQueryModel(element)
                        list_of_BiLoMetaDataQuery_objects.push(biloMetaDataQueryObj)
                        if (biloMetaDataQueryObj.data) {
                            let metadataQueryObj = await new BiLoTransformer(biloMetaDataQueryObj).toMetadataQuery()
                            if (metadataQueryObj) {
                                list_of_MetadataQuery_objects.push(metadataQueryObj)
                            }
                        }
                    } else {
                        let item = element as BiLoMetadataQueryModel
                        let biloMetaDataQueryErrorObj = new BiLoMetadataQueryModel({
                            query: {
                                id: item.query.id ?? 'unknown'
                            },
                            status: 406, //TODO: check whether 422 is more suitable
                        })
                        list_of_BiLoMetaDataQuery_objects.push(biloMetaDataQueryErrorObj)
                        let metadataQueryErrorObj = await new BiLoTransformer(biloMetaDataQueryErrorObj).toMetadataQuery()
                        if (metadataQueryErrorObj) {
                            list_of_MetadataQuery_objects.push(metadataQueryErrorObj)
                        }

                    }
                })
            })
            .catch(function (request_product_id_response_error) {
                console.error(request_product_id_response_error)
            })

        try {
            let schema = req.query.schema
            if (schema === 'urn:bilo:metadata') {
                if (accept_header.indexOf('xml') > -1) {
                    res.set('Content-Type', 'text/xml')
                    return res.status(200).send(BUILDER.build({
                        MetadataQueries: {
                            MetadataQuery: list_of_BiLoMetaDataQuery_objects
                        }
                    }))
                }
                return res.status(200).json(list_of_BiLoMetaDataQuery_objects)
            }
            if (accept_header.indexOf('xml') > -1) {
                res.set('Content-Type', 'text/xml')
                return res.status(200).send(BUILDER.build({
                    MetadataQueries: {
                        MetadataQuery: list_of_MetadataQuery_objects
                    }
                }))
            }
            return res.status(200).json(list_of_MetadataQuery_objects)
        }
        catch (error) {
            return res.status(400)
        }
    }

}

const CONTROLLER = new MetadataController()

/**
 * @openapi
 * /ping:
 *   get:
 *     description: Request Server heartbeat
 *     tags:
 *       - Info
 *     responses:
 *       200:
 *         description: Returns a heartbeat object.
 */
CONTROLLER.router.get('/ping', CONTROLLER.ping)

/**
 * @openapi
 * /info:
 *   get:
 *     description: Request info (e.g. JSON-schema)
 *     tags:
 *       - Info
 *     responses:
 *       200:
 *         description: Returns info (e.g. JSON-schema).
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MetadataQuery'
 */
CONTROLLER.router.get('/info', CONTROLLER.getInfo)

/**
 * @openapi
 * /getMetadataById:
 *   get:
 *     description: Request Metadata by Product-Ids
 *     tags:
 *       - Metadata
 *     produces:
 *       - application/json
 *       - text/xml
 *     parameters:
 *       - in: query
 *         name: product_id
 *         description: Product-Id
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           collectionFormat: multi
 *       - in: query
 *         name: schema
 *         description: Schema URN
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - 'urn:bilo:metadata'
 *             - 'urn:1edtech:metadata:v1p2p1'
 *     responses:
 *       200:
 *         description: Returns a list of Metadata-query objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 oneOf:
 *                   - $ref: '#/components/schemas/MetadataQuery'
 *                   - $ref: '#/components/schemas/BiLoMetadataQuery'
 *           text/xml:
 *             schema:
 *               type: array
 *               items:
 *                 oneOf:
 *                   - $ref: '#/components/schemas/MetadataQuery'
 *                   - $ref: '#/components/schemas/BiLoMetadataQuery'
 *       400:
 *         description: Bad Request.
 *       406:
 *         description: Not Acceptable.
 *       500:
 *         description: Internal Server Error.
 */
CONTROLLER.router.post('/getMetadataById', CONTROLLER.getMetadataByQueryIDs)

/**
 * @openapi
 * /{product_id}:
 *   get:
 *     description: Request Metadata by Product-Id
 *     tags:
 *       - Metadata
 *     produces:
 *       - application/json
 *       - text/xml
 *     parameters:
 *       - in: path
 *         name: product_id
 *         description: Product-Id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: schema
 *         description: Schema URN
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - 'urn:bilo:metadata'
 *             - 'urn:1edtech:metadata:v1p2p1'
 *     responses:
 *       200:
 *         description: OK - Returns a Metadata-query object.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/MetadataQuery'
 *                 - $ref: '#/components/schemas/BiLoMetadataQuery'
 *           text/xml:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/MetadataQuery'
 *                 - $ref: '#/components/schemas/BiLoMetadataQuery'
 *       400:
 *         description: Bad Request.
 *       406:
 *         description: Not Acceptable.
 *       500:
 *         description: Internal Server Error.
 */
CONTROLLER.router.get('/:product_id', CONTROLLER.getMetadataByID)

/**
 * @openapi
 * /:
 *   get:
 *     description: Request List of Metadata
 *     tags:
 *       - Metadata
 *     produces:
 *       - application/json
 *       - text/xml
 *     parameters:
 *       - in: query
 *         name: schema
 *         description: Schema URN
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - 'urn:bilo:metadata'
 *             - 'urn:1edtech:metadata:v1p2p1'
 *     responses:
 *       200:
 *         description: Returns a list of Metadata-query objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 oneOf:
 *                   - $ref: '#/components/schemas/MetadataQuery'
 *                   - $ref: '#/components/schemas/BiLoMetadataQuery'
 *           text/xml:
 *             schema:
 *               type: array
 *               items:
 *                 oneOf:
 *                   - $ref: '#/components/schemas/MetadataQuery'
 *                   - $ref: '#/components/schemas/BiLoMetadataQuery'
 *       400:
 *         description: Bad Request.
 *       406:
 *         description: Not Acceptable.
 *       500:
 *         description: Internal Server Error.
 */
CONTROLLER.router.get('/', CONTROLLER.getMetadata)

export default CONTROLLER



