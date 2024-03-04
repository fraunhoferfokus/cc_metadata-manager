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

import MetadataModel from './MetadataModel'
import {
    JSONSchemaType,
} from 'ajv'

export const Metadata: any = {
    title: 'Metadata JSON Schema',
    type: 'object',
    required: [
        'lom',
    ],
    properties: {
        lom: {
            type: 'object',
            required: [],
            properties: {
                general: {
                    $ref: '#/definitions/General',
                },
                lifecycle: {
                    $ref: '#/definitions/Lifecycle',
                },
                metametadata: {
                    $ref: '#/definitions/MetaMetadata',
                },
                technical: {
                    $ref: '#/definitions/Technical',
                },
                educational: {
                    $ref: '#/definitions/Educational',
                },
                rights: {
                    $ref: '#/definitions/Rights',
                },
                relation: {
                    $ref: '#/definitions/Relation',
                },
                annotation: {
                    $ref: '#/definitions/Annotation',
                },
                classification: {
                    $ref: '#/definitions/Classification',
                },
            },
        },
    },
    definitions: {
        LangString: {
            type: 'object',
            required: [
                '@_xml:lang',
                'value',
            ],
            properties: {
                '@_xml:lang': {
                    examples: [
                        'de',
                    ],
                    type: 'string',
                    maxLength: 100,
                },
                value: {
                    examples: [
                        'an example string',
                    ],
                    type: 'string',
                    maxLength: 2000,
                },
            },
        },
        LangStringArray: {
            type: 'array',
            items: {
                type: 'object',
                required: [
                    '@_xml:lang',
                    'value',
                ],
                properties: {
                    '@_xml:lang': {
                        examples: [
                            'de',
                        ],
                        type: 'string',
                        maxLength: 100,
                    },
                    value: {
                        examples: [
                            'an example string',
                        ],
                        type: 'string',
                        maxLength: 2000,
                    },
                },
            },
        },
        DateType: {
            type: 'object',
            required: [
                'datetime',
                'description',
            ],
            properties: {
                datetime: {
                    examples: [
                        '1999-06-11',
                    ],
                    type: 'string',
                    maxLength: 200,
                },
                description: {
                    examples: [
                        'circa 1300 BC',
                        'Fall 1999',
                    ],
                    type: 'string',
                    maxLength: 2000,
                },
            },
        },
        CatalogEntry: {
            type: 'object',
            required: [
                'catalog',
                'entry',
            ],
            properties: {
                catalog: {
                    examples: [
                        'ISBN',
                    ],
                    type: 'string',
                },
                entry: {
                    examples: [
                        '0-123-45678-9',
                    ],
                    type: 'string',
                },
            },
        },
        CatalogEntryArray: {
            type: 'array',
            items: {
                type: 'object',
                required: [
                    'catalog',
                    'entry',
                ],
                properties: {
                    catalog: {
                        examples: [
                            'ISBN',
                        ],
                        type: 'string',
                    },
                    entry: {
                        examples: [
                            '0-123-45678-9',
                        ],
                        type: 'string',
                    },
                },
            },
        },
        StateVocabulary: {
            type: 'object',
            required: [
                'source',
                'value',
            ],
            properties: {
                source: {
                    $ref: '#/definitions/LangString',
                },
                value: {
                    $ref: '#/definitions/LangString',
                },
            },
        },
        StateVocabularyArray: {
            type: 'array',
            items: {
                type: 'object',
                required: [
                    'source',
                    'value',
                ],
                properties: {
                    source: {
                        $ref: '#/definitions/LangString',
                    },
                    value: {
                        $ref: '#/definitions/LangString',
                    },
                },
            },
        },
        EnumeratedVocabulary: {
            type: 'object',
            required: [
                'source',
                'value',
            ],
            properties: {
                source: {
                    $ref: '#/definitions/LangString',
                },
                value: {
                    $ref: '#/definitions/LangString',
                },
            },
        },
        Contribute: {
            type: 'array',
            items: {
                type: 'object',
                required: [],
                properties: {
                    role: {
                        $ref: '#/definitions/StateVocabulary',
                    },
                    entity: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                    date: {
                        $ref: '#/definitions/DateType',
                    },
                },
            },
        },
        Composite: {
            type: 'array',
            items: {
                type: 'object',
                required: [],
                properties: {
                    type: {
                        $ref: '#/definitions/StateVocabulary',
                    },
                    name: {
                        $ref: '#/definitions/StateVocabulary',
                    },
                    minimumversion: {
                        type: 'string',
                    },
                    maximumversion: {
                        type: 'string',
                    },
                },
            },

        },
        Requirement: {
            type: 'array',
            items: {
                type: 'object',
                required: [],
                properties: {
                    orcomposite: {
                        $ref: '#/definitions/Composite',
                    },
                },
            },
        },
        Resource: {
            type: 'object',
            required: [],
            properties: {
                identifier: {
                    type: 'string'
                },
                description: {
                    $ref: '#/definitions/LangStringArray',
                },
                catalogentry: {
                    $ref: '#/definitions/CatalogEntryArray',
                },
            },
        },
        Taxon: {
            type: 'array',
            items: {
                type: 'object',
                required: [],
                properties: {
                    id: {
                        type: 'string',
                        maxLength: 100,
                    },
                    entry: {
                        $ref: '#/definitions/LangString',
                    },
                },
            },
        },
        Taxonpath: {
            type: 'array',
            items: {
                type: 'object',
                required: [],
                properties: {
                    source: {
                        $ref: '#/definitions/LangString',
                    },
                    taxon: {
                        $ref: '#/definitions/Taxon',
                    },
                },
            },
        },
        General: {
            type: 'object',
            required: [
                'Structure',
                'AggregationLevel',
            ],
            properties: {
                identifier: {
                    type: 'string',
                },
                title: {
                    $ref: '#/definitions/LangString',
                },
                catalogentry: {
                    $ref: '#/definitions/CatalogEntryArray',
                },
                language: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
                description: {
                    $ref: '#/definitions/LangStringArray',
                },
                keyword: {
                    $ref: '#/definitions/LangStringArray',
                },
                coverage: {
                    $ref: '#/definitions/LangStringArray',
                },
                structure: {
                    $ref: '#/definitions/StateVocabulary',
                },
                aggregationLevel: {
                    $ref: '#/definitions/EnumeratedVocabulary',
                },
            },
        },
        LifeCycle: {
            type: 'object',
            required: [],
            properties: {
                version: {
                    $ref: '#/definitions/LangString',
                },
                status: {
                    $ref: '#/definitions/StateVocabulary',
                },
                contribute: {
                    $ref: '#/definitions/Contribute',
                },
            },
        },
        MetaMetadata: {
            type: 'object',
            required: [],
            properties: {
                identifier: {
                    type: 'string',
                },
                catalogentry: {
                    $ref: '#/definitions/CatalogEntryArray',
                },
                contribute: {
                    $ref: '#/definitions/Contribute',
                },
                metadataschema: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
                language: {
                    type: 'string',
                }
            },
        },
        Technical: {
            type: 'object',
            required: [],
            properties: {
                format: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
                size: {
                    type: 'string',
                },
                location: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
                requirement: {
                    $ref: '#/definitions/Requirement',
                },
                installationremarks: {
                    $ref: '#/definitions/LangString',
                },
                otherplatformrequirements: {
                    $ref: '#/definitions/LangString',
                },
                duration: {
                    $ref: '#/definitions/DateType',
                },
            },
        },
        Educational: {
            type: 'array',
            items: {
                type: 'object',
                required: [],
                properties: {
                    interactivitytype: {
                        $ref: '#/definitions/StateVocabulary',
                    },
                    learningresourcetype: {
                        $ref: '#/definitions/StateVocabularyArray',
                    },
                    interactivitylevel: {
                        $ref: '#/definitions/EnumeratedVocabulary',
                    },
                    semanticdensity: {
                        $ref: '#/definitions/EnumeratedVocabulary',
                    },
                    intendedenduserrole: {
                        $ref: '#/definitions/StateVocabularyArray',
                    },
                    context: {
                        $ref: '#/definitions/StateVocabularyArray',
                    },
                    typicalagerange: {
                        $ref: '#/definitions/LangStringArray',
                    },
                    difficulty: {
                        $ref: '#/definitions/EnumeratedVocabulary',
                    },
                    typicallearningtime: {
                        $ref: '#/definitions/DateType',
                    },
                    description: {
                        $ref: '#/definitions/LangString',
                    },
                    language: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                },
            },
        },
        Rights: {
            type: 'object',
            required: [],
            properties: {
                cost: {
                    $ref: '#/definitions/StateVocabulary',
                },
                copyrightandotherrestrictions: {
                    $ref: '#/definitions/StateVocabulary',
                },
                description: {
                    $ref: '#/definitions/LangString',
                },
            },
        },
        Relation: {
            type: 'array',
            items: {
                type: 'object',
                required: [],
                properties: {
                    kind: {
                        $ref: '#/definitions/StateVocabulary',
                    },
                    resourc: {
                        $ref: '#/definitions/Resource',
                    },
                },
            },
        },
        Annotation: {
            type: 'array',
            items: {
                type: 'object',
                required: [],
                properties: {
                    person: {
                        type: 'string',
                    },
                    date: {
                        $ref: '#/definitions/DateType',
                    },
                    description: {
                        $ref: '#/definitions/LangString',
                    },
                },
            },
        },
        Classification: {
            type: 'array',
            items: {
                type: 'object',
                required: [],
                properties: {
                    purpose: {
                        $ref: '#/definitions/StateVocabulary',
                    },
                    taxonpath: {
                        $ref: '#/definitions/Taxonpath',
                    },
                    description: {
                        $ref: '#/definitions/LangString',
                    },
                    keyword: {
                        $ref: '#/definitions/LangStringArray',
                    },
                },
            },
        },
    },
    additionalProperties: false,
}

const MetadataSchema: JSONSchemaType<MetadataModel> = { ...Metadata }

export default MetadataSchema