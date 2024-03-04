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

import axios from 'axios'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

import BiLoMetadataQueryModel from '../models/BiLoMetadata/BiLoMetadataQueryModel'
import BiLoProductLaunchMetadataQueryModel from '../models/BiLoProductLaunchMetadata/BiLoProductLaunchMetadataQueryModel'
import BiLoProductLaunchMetadataQuerySchema from '../models/BiLoProductLaunchMetadata/BiLoProductLaunchMetadataQuerySchema'
import MetadataQueryModel from '../models/Metadata/MetadataQueryModel'
import MetadataModel, {
    General,
    Technical,
    Annotation,
} from '../models/Metadata/MetadataModel'

const LAUNCH_METADATA_PROVIDER_API_PROTOCOL: string = (process.env.LAUNCH_METADATA_PROVIDER_API_PROTOCOL) ? process.env.LAUNCH_METADATA_PROVIDER_API_PROTOCOL : 'http'
const LAUNCH_METADATA_PROVIDER_API_HOST: string = (process.env.LAUNCH_METADATA_PROVIDER_API_HOST) ? process.env.LAUNCH_METADATA_PROVIDER_API_HOST : '127.0.0.1'
const LAUNCH_METADATA_PROVIDER_API_PORT: number = (process.env.LAUNCH_METADATA_PROVIDER_API_PORT) ? parseInt(process.env.LAUNCH_METADATA_PROVIDER_API_PORT) : 3041
const LAUNCH_METADATA_PROVIDER_API_BASE_PATH: string = (process.env.LAUNCH_METADATA_PROVIDER_API_BASE_PATH)
    ? (process.env.LAUNCH_METADATA_PROVIDER_API_BASE_PATH.indexOf('/') == 0)
        ? process.env.LAUNCH_METADATA_PROVIDER_API_BASE_PATH
        : '/' + process.env.LAUNCH_METADATA_PROVIDER_API_BASE_PATH
    : ''

const LAUNCH_METADATA_PROVIDER_API = LAUNCH_METADATA_PROVIDER_API_PROTOCOL + '://' + LAUNCH_METADATA_PROVIDER_API_HOST + ':' + LAUNCH_METADATA_PROVIDER_API_PORT + LAUNCH_METADATA_PROVIDER_API_BASE_PATH

const AJV = new Ajv({
    strict: false
})
addFormats(AJV)
const VALIDATE_LAUNCH = AJV.compile(BiLoProductLaunchMetadataQuerySchema)

const DEFAULT: any = {
    LANGSTRING: {
        language: 'x-none',
    },
    STRUCTURE: {
        source: 'LOMv1.0',
        value: 'atomic',
    },
    AGGREGATIONLEVEL: {
        source: 'LOMv1.0',
        value: '1',
    },
}

class BiLoTransformator {
    biloMetadataQuery: BiLoMetadataQueryModel

    constructor(data: BiLoMetadataQueryModel) {
        this.biloMetadataQuery = data
    }

    getGeneral(): General | undefined {
        if (this.biloMetadataQuery.data) {
            let general: General = {
                identifier: this.biloMetadataQuery.data.id,
                title: {
                    '@_xml:lang': DEFAULT.LANGSTRING.language,
                    value: this.biloMetadataQuery.data.title,
                },
                catalogentry: [
                    {
                        catalog: this.biloMetadataQuery.data.publisher,
                        entry: this.biloMetadataQuery.data.id,
                    },
                ],
                description: [
                    {
                        '@_xml:lang': DEFAULT.LANGSTRING.language,
                        value: this.biloMetadataQuery.data.description,
                    },
                ],
                structure: {
                    source: {
                        '@_xml:lang': DEFAULT.LANGSTRING.language,
                        value: DEFAULT.STRUCTURE.source,
                    },
                    value: {
                        '@_xml:lang': DEFAULT.LANGSTRING.language,
                        value: DEFAULT.STRUCTURE.value,
                    },
                },
                aggregationlevel: {
                    source: {
                        '@_xml:lang': DEFAULT.LANGSTRING.language,
                        value: DEFAULT.AGGREGATIONLEVEL.source,
                    },
                    value: {
                        '@_xml:lang': DEFAULT.LANGSTRING.language,
                        value: DEFAULT.AGGREGATIONLEVEL.value,
                    },
                },
            }
            return general
        }
        return undefined
    }

    getTechnical(): Promise<Technical | undefined> {
        return new Promise(async (resolve) => {
            if (this.biloMetadataQuery.data) {
                let technical: Technical = {}
                await axios.get(`${LAUNCH_METADATA_PROVIDER_API}/${this.biloMetadataQuery.query.id}`)
                    .then(function (request_product_launch_metadata_response) {
                        const request_product_launch_metadata_response_data: BiLoProductLaunchMetadataQueryModel = request_product_launch_metadata_response.data
                        if (VALIDATE_LAUNCH(request_product_launch_metadata_response_data)) {
                            const biloProductLaunchMetaDataQueryObj: BiLoProductLaunchMetadataQueryModel = new BiLoProductLaunchMetadataQueryModel(request_product_launch_metadata_response_data)
                            if (biloProductLaunchMetaDataQueryObj.data) {
                                technical.location = [
                                    biloProductLaunchMetaDataQueryObj.data.href
                                ]
                            }
                        } else {
                            resolve(undefined)
                        }
                        resolve(technical)
                    })
                    .catch(function (request_product_launch_metadata_response_error) {
                        resolve(undefined)
                    })
            } else {
                resolve(undefined)
            }
        })
    }

    getAnnotations(): Annotation[] | undefined {
        if (this.biloMetadataQuery.data) {
            let annotations: Annotation[] = []
            if (this.biloMetadataQuery.data.cover?.href) {
                let annotation_cover: Annotation = {
                    description: {
                        '@_xml:lang': 'cover',
                        value: this.biloMetadataQuery.data.cover?.href,
                    },
                }
                annotations.push(annotation_cover)
            }
            if (this.biloMetadataQuery.data.coverSmall?.href) {
                let annotation_cover_small: Annotation = {
                    description: {
                        '@_xml:lang': 'coverSmall',
                        value: this.biloMetadataQuery.data.coverSmall?.href,
                    },
                }
                annotations.push(annotation_cover_small)
            }
            return annotations
        }
        return undefined
    }

    toMetadata(): Promise<MetadataModel | undefined> {
        return new Promise(async (resolve) => {
            try {
                let metadata: MetadataModel = {
                    lom: {},
                }

                if (this.biloMetadataQuery.data) {
                    metadata.lom = {
                        general: this.getGeneral(),
                        annotation: this.getAnnotations(),
                    }
                    let technical = await this.getTechnical()
                    if (technical) {
                        metadata.lom.technical = technical
                    }
                }

                resolve(metadata)
            } catch (err) {
                resolve(undefined)
            }
        })
    }

    toMetadataQuery(): Promise<MetadataQueryModel | undefined> {
        return new Promise(async (resolve) => {

            try {
                let metadataQuery: MetadataQueryModel = new MetadataQueryModel({
                    query: this.biloMetadataQuery.query,
                    status: this.biloMetadataQuery.status,
                })

                if (this.biloMetadataQuery.data) {
                    let metadata: MetadataModel = {
                        lom: {
                            general: this.getGeneral(),
                            annotation: this.getAnnotations(),
                        }
                    }
                    metadataQuery.data = metadata
                }

                resolve(metadataQuery)
            } catch (err) {
                resolve(undefined)
            }
        })
    }

}

export default BiLoTransformator