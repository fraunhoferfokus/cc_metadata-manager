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

export type Resource = {
    href: string
    rel: string
}

/**
 * @public
 * The payload which is passed to the constructor of {@link BiLoMetadataModel} 
 */
export interface iBiLoMetadataModel {
    id: string
    title: string
    description: string
    author: string
    publisher: string
    cover?: Resource
    coverSmall?: Resource
    modified: number
}

/**
 * BiLoMetadata datamodel
 * @public
 */
export default class BiLoMetadataModel implements iBiLoMetadataModel {
    id: string
    title: string
    description: string
    author: string
    publisher: string
    cover?: Resource
    coverSmall?: Resource
    modified: number

    constructor(payload: iBiLoMetadataModel) {
        this.id = payload.id
        this.title = payload.title
        this.description = payload.description
        this.author = payload.author
        this.publisher = payload.publisher
        this.modified = payload.modified

        if (payload.cover) {
            this.cover = payload.cover
        }
        if (payload.coverSmall) {
            this.coverSmall = payload.coverSmall
        }
    }
}

/**
 * @openapi
 * components:
 *   schemas:
 *      BiLoMetadata:
 *        type: object
 *        required:
 *          - id
 *          - title
 *          - description
 *          - author
 *          - publisher
 *          - modified
 *        properties:
 *          id:
 *            type: string
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          author:
 *            type: string
 *          publisher:
 *            type: string
 *          cover:
 *            $ref: '#/components/schemas/BiLoResource'
 *          coverSmall:
 *            $ref: '#/components/schemas/BiLoResource'
 *          modified:
 *            type: number
 *        xml:
 *          name: BiLoMetadata
 *        additionalProperties: false
 *      BiLoResource:
 *        type: object
 *        required:
 *          - href
 *          - rel
 *        properties:
 *          href:
 *            type: string
 *          rel:
 *            type: string
 *        xml:
 *          name: Resource
 */
