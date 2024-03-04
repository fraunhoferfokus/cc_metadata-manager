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

/**
 * @constructs LangString
 * @description String in one or more human languages.
 * @external LangString
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/dataTypes.xsd}
 * @see {@link https://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {string} language - Human language in which the string is expressed.
 * @example 'de'
 * @property {string} string - Actual string value.
 * @example 'an example string'
 */
export type LangString = {
    '@_xml:lang': string
    value: string
}

/**
 * @constructs DateType
 * @description .
 * @external DateType
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/dataTypes.xsd}
 * @see {@link https://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {string} datetime - Date expressed as per ISO8601 standard.
 * @example '1999-06-11'
 * @property {string} description - Description of the date.
 * @example 'circa 1300 BC, Fall 1999'
 */
export type DateType = {
    datetime: string
    description: string
}

/**
 * @constructs CatalogEntry
 * @description Catalog entry for learning object.
 * @external CatalogEntry
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @property {string} catalog - Catalog in which the learning object is listed.
 * @example 'ISBN'
 * @property {string} entry - Actual identifier/entry of the learning object.
 * @example '0-123-45678-9'
 */
export type CatalogEntry = {
    catalog: string
    entry: string
}

/**
 * @constructs StateVocabulary
 * @description Vocabulary as structured collections of terms that can serve as values.
 * @external Vocabulary
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/vocabTypes.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {LangString} source - Source of vocabulary item(s).
 * @example {language:'x-none',string:'Catalog A'}
 * @property {LangString} value - Actual descriptor.
 * @example {language:'x-none',string:'value'}
 */
export type StateVocabulary = {
    source: LangString,
    value: LangString
}

/**
 * @constructs EnumeratedVocabulary
 * @description Vocabulary as structured collections of terms that can serve as enumerated values.
 * @external Vocabulary
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/vocabTypes.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/vocabValues.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {LangString} source - Source of vocabulary item(s).
 * @example {language:'x-none',string:'Catalog A'}
 * @property {LangString} value - Actual enumerated descriptor.
 * @example {language:'x-none',string:'value'}
 */
export type EnumeratedVocabulary = {
    source: LangString
    value: LangString
}

/**
 * @constructs Contribute
 * @description Persons or organizations contributing to the resource (includes creation, edits, and publication).
 * @external Contribute
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {StateVocabulary} role - Kind of contribution. [Author, Publisher, Unknown, Initiator, Terminator, Validator, Editor, Graphical Designer, Technical Implementer, Content Provider, Technical Validator, Educational Validator, Script Writer, Instructional Designer]
 * @example {source:{language:'x-none',string:'Roles'},value:{language:'x-none',string:'Author'}}
 * @property {string[]} entity - Entity or entities involved, most relevant first. [vCard]
 * @property {DateType} date - Date of contribution.
 */
export type Contribute = {
    role?: StateVocabulary
    entity?: string[]
    date?: DateType
}

/**
 * @constructs Composite
 * @description Needs in order to access the resource.
 * @external Composite
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {StateVocabulary} export type - Type of requirement.
 * @example {source:{language:'x-none',string:'System software'},value:{language:'x-none',string:'OS'}}
 * @property {StateVocabulary} name - Name of the required item.
 * @example {source:{language:'x-none',string:'Operation system'},value:{language:'x-none',string:'Debian'}}
 * @property {string} minimumversion - Lowest version of the required item.
 * @example '8.0'
 * @property {string} maximumversion - Highest version of the required item.
 * @example '9.0'
 */
export type Composite = {
    type?: StateVocabulary
    name?: StateVocabulary
    minimumversion?: string
    maximumversion?: string
}

/**
 * @constructs Requirement
 * @description Requirement. If there are multiple Composite requirements, then the logical connector is OR.
 * @external Requirement
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {Composite[]} orcomposite - List of Composite requirements. If there are multiple Composite requirements, then the logical connector is OR.
 */
export type Requirement = {
    orcomposite?: Composite[]
}

/**
 * @constructs Resource
 * @description Resource the relationship holds for.
 * @external Resource
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {string} identifier - Unique Identifier of the other resource.
 * @property {LangString[]} description - Description of the other resource.
 * @property {CatalogEntry[]} catalogentry - Description of the other resource.
 */
export type Resource = {
    identifier?: string
    description?: LangString
    catalogentry?: CatalogEntry[]
}

/**
 * @constructs Taxon
 * @description An entry in a classification. An ordered list of Taxons creates a taxonomic path, i.e. "taxonomic stairway": this is a path from a more general to more specific entry in a classification.
 * @external Taxon
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {string} id - Taxon's identifier in taxonomic system.
 * @property {LangString} entry - Taxon's name or label (other than identifier).
 */
export type Taxon = {
    id?: string
    entry?: LangString
}

/**
 * @constructs Taxonpath
 * @description A taxonomic path in a specific classification.
 * @external Taxonpath
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {LangString} source - A specific classification.
 * @property {Taxon[]} taxon - An entry in a classification. An ordered list of Taxons creates a taxonomic path, i.e. "taxonomic stairway": this is a path from a more general to more specific entry in a classification.
 */
export type Taxonpath = {
    source?: LangString
    taxon?: Taxon[]
}

/**
 * @constructs General
 * @description Groups information describing learning object as a whole.
 * @external General
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {string} identifier - Globally unique label for learning object.
 * @property {LangString} title - Learning object's name.
 * @property {CatalogEntry} catalogentry - Designation given to resource.
 * @property {string[]} language - Learning object's language (can be Language without Country subcode; implies intended language of target audience). "None" is also acceptable.
 * @property {LangString[]} description - Describes learning object's content.
 * @property {LangString[]} keyword - Contains keyword description of the resource.
 * @property {LangString[]} coverage - Temporal / spatial characteristics of content (e.g., historical context).
 * @property {StateVocabulary} structure - Underlying organizational structure of the resource.
 * @property {EnumeratedVocabulary} aggregationlevel - The functional size of the resource.
 */
export type General = {
    identifier?: string
    title?: LangString
    catalogentry?: CatalogEntry[]
    language?: string[]
    description?: LangString[]
    keyword?: LangString[]
    coverage?: LangString[]
    structure: StateVocabulary
    aggregationlevel: EnumeratedVocabulary
}

/**
 * @constructs LifeCycle
 * @description History and current state of resource.
 * @external LifeCycle
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {LangString} version - The edition of the learning object.
 * @property {StateVocabulary} status - Learning object's editorial condition.
 * @property {Contribute[]} contribute - Persons or organizations contributing to the resource (includes creation, edits, and publication).
 */
export type LifeCycle = {
    version?: LangString
    status?: StateVocabulary
    contribute?: Contribute[]
}

/**
 * @constructs MetaMetadata
 * @description Features of the description rather than the resource.
 * @external MetaMetadata
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {CatalogEntry[]} identifier - A unique label for the meta-data.
 * @property {Contribute[]} contribute - Persons or organizations contributing to the meta-data.
 * @property {string[]} metadatascheme - Names the structure of the meta-data (this includes version).
 * @example 'LOMv1.0'
 * @property {string} language - Language of the meta-data instance. This is the default language for all LangString values.
 * @example 'none'
 */
export type MetaMetadata = {
    identifier?: string
    catalogentry?: CatalogEntry[]
    contribute?: Contribute[]
    metadatascheme?: string[]
    language?: string
}

/**
 * @constructs Technical
 * @description Technical features of the learning object.
 * @external Technical
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {string[]} format - Technical data export type of the resource.
 * @example 'application/x-toolbook'
 * @property {string} size - The size of the digital resource in bytes. Only the digits '0' - '9' should be used; the unit is bytes, not MBytes, GB, etc.
 * @property {string[]} location - A location or a method that resolves to a location of the resource. Preferable Location first.
 * @property {Requirement[]} requirement - Needs in order to access the resource. If there are multiple requirements, then the logical connector is AND.
 * @property {LangString} installationremarks - Description on how to install the resource.
 * @property {LangString} otherplatformrequirements - Information about other software and hardware requirements.
 * @property {DateType} duration - Time a continuous learning object takes when played at intended speed, in seconds.
 */
export type Technical = {
    format?: string[]
    size?: string
    location?: string[]
    requirement?: Requirement[]
    installationremarks?: LangString
    otherplatformrequirements?: LangString
    duration?: DateType
}

/**
 * @constructs Educational
 * @description Educational or pedagogic features of the learning object.
 * @external Educational
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {StateVocabulary} interactivityexport type - The export type of interactivity supported by the learning object.
 * @property {StateVocabulary[]} learningresourceexport type - Specific kind of resource, most dominant kind first.
 * @property {EnumeratedVocabulary} interactivitylevel - Level of interactivity between an end user and the learning object.
 * @property {EnumeratedVocabulary} semanticdensity - Subjective measure of the learning object's usefulness as compared to its size or duration.
 * @property {StateVocabulary[]} intendedenduserrole - Normal user of the learning object, most dominant first.
 * @property {StateVocabulary[]} context - The typical learning environment where use of learning object is intended to take place.
 * @property {LangString[]} typicalagerange - Age of the typical intended user.
 * @property {EnumeratedVocabulary} difficulty - How hard it is to work through the learning object for the typical target audience.
 * @property {DateType} typicallearningtime - Approximate or typical time it takes to work with the resource.
 * @property {LangString} description - Comments on how the learning object is to be used.
 * @property {string[]} language - User's natural language.
 */
export type Educational = {
    interactivitytype?: StateVocabulary
    learningresourcetype?: StateVocabulary[]
    interactivitylevel?: EnumeratedVocabulary
    semanticdensity?: EnumeratedVocabulary
    intendedendUserrole?: StateVocabulary[]
    context?: StateVocabulary[]
    typicalagerange?: LangString[]
    difficulty?: EnumeratedVocabulary
    typicallearningtime?: DateType
    description?: LangString
    language?: string[]
}

/**
 * @constructs Rights
 * @description Conditions of use of the resource.
 * @external Rights
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {StateVocabulary} cost - Whether use of the resource requires payment.
 * @property {StateVocabulary} copyrightandotherrestrictions - Whether copyright or other restrictions apply.
 * @property {LangString} description - Comments on the conditions of use of the resource.
 */
export type Rights = {
    cost?: StateVocabulary
    copyrightandotherrestrictions?: StateVocabulary
    description?: LangString

}

/**
 * @constructs Relation
 * @description Features of the resource in relationship to other learning objects.
 * @external Relation
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {StateVocabulary} kind - Nature of the relationship between the resource being described and the one identified by Resource (7.2).
 * @property {Resource} resource - Resource the relationship holds for.
 */
export type Relation = {
    kind?: StateVocabulary
    resource?: Resource
}

/**
 * @constructs Annotation
 * @description Comments on the educational use of the learning object.
 * @external Annotation
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {string} person - Annotator.
 * @property {DateType} date - Date that the annotation was created.
 * @property {LangString} description - The content of the annotation.
 */
export type Annotation = {
    person?: string
    date?: DateType
    description?: LangString
}

/**
 * @constructs Classification
 * @description Description of a characteristic of the resource by entries in classifications.
 * @external Classification
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {StateVocabulary} purpose - Characteristics of the resource described by this classification entry.
 * @property {Taxonpath} taxonpath - A taxonomic path in a specific classification.
 * @property {LangString} description - A textual description of learning object relative to its stated purpose.
 * @property {LangString[]} keyword - Contains keyword description of learning objective relative to its stated purpose.
 */
export type Classification = {
    purpose?: StateVocabulary
    taxonpath?: Taxonpath[]
    description?: LangString
    keyword?: LangString[]
}

/**
 * @constructs Metadata
 * @description IEEE LOM [learning object metadata standard]
 * @version 1.3
 * @see {@link https://standards.ieee.org/findstds/standard/1484.12.1-2002.html}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementNames.xsd}
 * @see {@link http://standards.ieee.org/reading/ieee/downloads/LOM/lomv1.0/xsd/common/elementTypes.xsd}
 * @see {@link https://www.imsglobal.org/metadata/index.html}
 * @see {@link http://www.imsglobal.org/metadata/imsmdv1p2p1/imsmd_infov1p2p1.html}
 * @property {General} general - Groups information describing learning object as a whole.
 * @property {LifeCycle} lifecycle - History and current state of resource.
 * @property {MetaMetadata} metametadata - Features of the description rather than the resource.
 * @property {Technical} technical - Technical features of the learning object.
 * @property {Educational[]} educational - Educational or pedagogic features of the learning object.
 * @property {Rights} rights - Conditions of use of the resource.
 * @property {Relation[]} relation - Features of the resource in relationship to other learning objects.
 * @property {Annotation[]} annotation - Comments on the educational use of the learning object.
 * @property {Classification[]} classification - Description of a characteristic of the resource by entries in classifications.
 */
export interface iMetadataModel {
    lom: {
        general?: General
        lifecycle?: LifeCycle
        metametadata?: MetaMetadata
        technical?: Technical
        educational?: Educational[]
        rights?: Rights
        relation?: Relation[]
        annotation?: Annotation[]
        classification?: Classification[]
    }
}

/**
 * Metadata datamodel
 * @public
 */
export default class MetadataModel implements iMetadataModel {
    lom: {
        general?: General
        lifecycle?: LifeCycle
        metametadata?: MetaMetadata
        technical?: Technical
        educational?: Educational[]
        rights?: Rights
        relation?: Relation[]
        annotation?: Annotation[]
        classification?: Classification[]
    }

    constructor(payload: iMetadataModel) {
        if (payload.lom.general) {
            this.lom.general = payload.lom.general
        }
        if (payload.lom.lifecycle) {
            this.lom.lifecycle = payload.lom.lifecycle
        }
        if (payload.lom.metametadata) {
            this.lom.metametadata = payload.lom.metametadata
        }
        if (payload.lom.technical) {
            this.lom.technical = payload.lom.technical
        }
        if (payload.lom.educational) {
            this.lom.educational = payload.lom.educational
        }
        if (payload.lom.rights) {
            this.lom.rights = payload.lom.rights
        }
        if (payload.lom.relation) {
            this.lom.relation = payload.lom.relation
        }
        if (payload.lom.annotation) {
            this.lom.annotation = payload.lom.annotation
        }
        if (payload.lom.classification) {
            this.lom.classification = payload.lom.classification
        }
    }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     Metadata:
 *       type: object
 *       required:
 *         - lom
 *       properties:
 *         lom:
 *           type: object
 *           properties:
 *             general:
 *               $ref: '#/components/schemas/General'
 *             lifecycle:
 *               $ref: '#/components/schemas/LifeCycle'
 *             metametadata:
 *               $ref: '#/components/schemas/MetaMetadata'
 *             technical:
 *               $ref: '#/components/schemas/Technical'
 *             educational:
 *               $ref: '#/components/schemas/Educational'
 *             rights:
 *               $ref: '#/components/schemas/Rights'
 *             relation:
 *               $ref: '#/components/schemas/Relation'
 *             annotation:
 *               $ref: '#/components/schemas/Annotation'
 *             classification:
 *               $ref: '#/components/schemas/Classification'
 *       xml:
 *         name: Metadata
 *       additionalProperties: false
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     LangString:
 *       type: object
 *       required:
 *         - '@_xml:lang'
 *         - value
 *       properties:
 *         '@_xml:lang':
 *           type: string
 *           maxLength: 100
 *         value:
 *           type: string
 *           maxLength: 2000
 *       xml:
 *         name: LangString
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     LangStringArray:
 *       type: array
 *       items:
 *         type: object
 *         required:
 *           - '@_xml:lang'
 *           - value
 *         properties:
 *           '@_xml:lang':
 *             type: string
 *             maxLength: 100
 *           value:
 *             type: string
 *             maxLength: 2000
 *       xml:
 *         name: LangStringArray
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     DateType:
 *       type: object
 *       required:
 *         - datetime
 *         - description
 *       properties:
 *         datetime:
 *           type: string
 *           maxLength: 200
 *         description:
 *           type: string
 *           maxLength: 2000
 *       xml:
 *         name: DateType
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CatalogEntry:
 *       type: object
 *       required:
 *         - catalog
 *         - entry
 *       properties:
 *         catalog:
 *           type: string
 *         entry:
 *           type: string
 *       xml:
 *         name: CatalogEntry
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CatalogEntryArray:
 *       type: array
 *       items:
 *         type: object
 *         required:
 *           - catalog
 *           - entry
 *         properties:
 *           catalog:
 *             type: string
 *           entry:
 *             type: string
 *       xml:
 *         name: CatalogEntryArray
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     StateVocabulary:
 *       type: object
 *       required:
 *         - source
 *         - value
 *       properties:
 *         source:
 *           $ref: '#/components/schemas/LangString'
 *         value:
 *           $ref: '#/components/schemas/LangString'
 *       xml:
 *         name: StateVocabulary
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     StateVocabularyArray:
 *       type: array
 *       items:
 *         type: object
 *         required:
 *           - source
 *           - value
 *         properties:
 *           source:
 *             $ref: '#/components/schemas/LangString'
 *           value:
 *             $ref: '#/components/schemas/LangString'
 *       xml:
 *         name: StateVocabularyArray
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     EnumeratedVocabulary:
 *       type: object
 *       required:
 *         - source
 *         - value
 *       properties:
 *         source:
 *           $ref: '#/components/schemas/LangString'
 *         value:
 *           $ref: '#/components/schemas/LangString'
 *       xml:
 *         name: EnumeratedVocabulary
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Contribute:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           role:
 *             $ref: '#/components/schemas/StateVocabulary'
 *           entity:
 *             type: array
 *             items:
 *               type: string
 *           date:
 *             $ref: '#/components/schemas/DateType'
 *       xml:
 *         name: Contribute
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Composite:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           type:
 *             $ref: '#/components/schemas/StateVocabulary'
 *           name:
 *             $ref: '#/components/schemas/StateVocabulary'
 *           minimumversion:
 *             type: string
 *           maximumversion:
 *             type: string
 *       xml:
 *         name: Composite
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Requirement:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           orcomposite:
 *             $ref: '#/components/schemas/Composite'
 *       xml:
 *         name: Requirement
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       properties:
 *         identifier:
 *           type: string
 *         description:
 *           $ref: '#/components/schemas/LangStringArray'
 *         catalogentry:
 *           $ref: '#/components/schemas/CatalogEntryArray'
 *       xml:
 *         name: Resource
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Taxon:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             maxLength: 100
 *           entry:
 *             $ref: '#/components/schemas/LangString'
 *       xml:
 *         name: Taxon
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Taxonpath:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           source:
 *             $ref: '#/components/schemas/LangString'
 *           taxon:
 *             $ref: '#/components/schemas/Taxon'
 *       xml:
 *         name: Taxonpath
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     General:
 *       type: object
 *       required:
 *         - Structure
 *         - AggregationLevel
 *       properties:
 *         identifier:
 *           type: string
 *         title:
 *           $ref: '#/components/schemas/LangString'
 *         catalogentry:
 *           $ref: '#/components/schemas/CatalogEntryArray'
 *         language:
 *           type: array
 *           items:
 *             type: string
 *         description:
 *           $ref: '#/components/schemas/LangStringArray'
 *         keyword:
 *           $ref: '#/components/schemas/LangStringArray'
 *         coverage:
 *           $ref: '#/components/schemas/LangStringArray'
 *         structure:
 *           $ref: '#/components/schemas/StateVocabulary'
 *         aggregationLevel:
 *           $ref: '#/components/schemas/EnumeratedVocabulary'
 *       xml:
 *         name: General
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     LifeCycle:
 *       type: object
 *       properties:
 *         version:
 *           $ref: '#/components/schemas/LangString'
 *         status:
 *           $ref: '#/components/schemas/StateVocabulary'
 *         contribute:
 *           $ref: '#/components/schemas/Contribute'
 *       xml:
 *         name: LifeCycle
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     MetaMetadata:
 *       type: object
 *       properties:
 *         identifier:
 *           type: string
 *         catalogentry:
 *           $ref: '#/components/schemas/CatalogEntryArray'
 *         contribute:
 *           $ref: '#/components/schemas/Contribute'
 *         metadataschema:
 *           type: array
 *           items:
 *             type: string
 *         language:
 *           type: string
 *       xml:
 *         name: MetaMetadata
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Technical:
 *       type: object
 *       properties:
 *         format:
 *           type: array
 *           items:
 *             type: string
 *         size:
 *           type: string
 *         location:
 *           type: array
 *           items:
 *             type: string
 *         requirement:
 *           $ref: '#/components/schemas/Requirement'
 *         installationremarks:
 *           $ref: '#/components/schemas/LangString'
 *         otherplatformrequirements:
 *           $ref: '#/components/schemas/LangString'
 *         duration:
 *           $ref: '#/components/schemas/DateType'
 *       xml:
 *         name: Technical
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Educational:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           interactivitytype:
 *             $ref: '#/components/schemas/StateVocabulary'
 *           learningresourcetype:
 *             $ref: '#/components/schemas/StateVocabularyArray'
 *           interactivitylevel:
 *             $ref: '#/components/schemas/EnumeratedVocabulary'
 *           semanticdensity:
 *             $ref: '#/components/schemas/EnumeratedVocabulary'
 *           intendedenduserrole:
 *             $ref: '#/components/schemas/StateVocabularyArray'
 *           context:
 *             $ref: '#/components/schemas/StateVocabularyArray'
 *           typicalagerange:
 *             $ref: '#/components/schemas/LangStringArray'
 *           difficulty:
 *             $ref: '#/components/schemas/EnumeratedVocabulary'
 *           typicallearningtime:
 *             $ref: '#/components/schemas/DateType'
 *           description:
 *             $ref: '#/components/schemas/LangString'
 *           language:
 *             type: array
 *             items:
 *               type: string
 *       xml:
 *         name: Educational
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Rights:
 *       type: object
 *       properties:
 *         cost:
 *           $ref: '#/components/schemas/StateVocabulary'
 *         copyrightandotherrestrictions:
 *           $ref: '#/components/schemas/StateVocabulary'
 *         description:
 *           $ref: '#/components/schemas/LangString'
 *       xml:
 *         name: Rights
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Relation:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           kind:
 *             $ref: '#/components/schemas/StateVocabulary'
 *           resourc:
 *             $ref: '#/components/schemas/Resource'
 *       xml:
 *         name: Relation
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Annotation:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           person:
 *             type: string
 *           date:
 *             $ref: '#/components/schemas/DateType'
 *           description:
 *             $ref: '#/components/schemas/LangString'
 *       xml:
 *         name: Annotation
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Classification:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           purpose:
 *             $ref: '#/components/schemas/StateVocabulary'
 *           taxonpath:
 *             $ref: '#/components/schemas/Taxonpath'
 *           description:
 *             $ref: '#/components/schemas/LangString'
 *           keyword:
 *             $ref: '#/components/schemas/LangStringArray'
 *       xml:
 *         name: Classification
 */