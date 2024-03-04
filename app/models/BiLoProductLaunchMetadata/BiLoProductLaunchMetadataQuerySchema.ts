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

import BiLoProductLaunchMetadataQueryModel from './BiLoProductLaunchMetadataQueryModel'
import {
    BiLoProductLaunchMetadata,
} from './BiLoProductLaunchMetadataSchema'
import {
    JSONSchemaType,
} from 'ajv'

const BiLoProductLaunchMetadataQuery: any = {
    title: 'Bildungslogin (BiLo) Product-launch-metadata JSON Schema',
    type: 'object',
    required: [
        'query',
        'status',
    ],
    properties: {
        query: {
            type: 'object',
            required: [
                'id',
            ],
            properties: {
                id: {
                    examples: [
                        '7bd46a45-345c-4237-a451-4444736eb011',
                    ],
                    type: 'string',
                },
            },
        },
        status: {
            examples: [
                200,
                404,
                500,
            ],
            type: 'number',
        },
        data: {
            $ref: '#/definitions/BiLoProductLaunchMetadata',
        },
    },
    definitions: {
        BiLoProductLaunchMetadata: {
            type: BiLoProductLaunchMetadata.type,
            required: BiLoProductLaunchMetadata.required,
            properties: BiLoProductLaunchMetadata.properties,
        }
    },
    additionalProperties: false,
}
const BiLoProductLaunchMetadataQuerySchema: JSONSchemaType<BiLoProductLaunchMetadataQueryModel> = BiLoProductLaunchMetadataQuery

export default BiLoProductLaunchMetadataQuerySchema
