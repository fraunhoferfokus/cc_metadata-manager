"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Metadata datamodel
 * @public
 */
class MetadataModel {
    constructor(payload) {
        if (payload.lom.general) {
            this.lom.general = payload.lom.general;
        }
        if (payload.lom.lifecycle) {
            this.lom.lifecycle = payload.lom.lifecycle;
        }
        if (payload.lom.metametadata) {
            this.lom.metametadata = payload.lom.metametadata;
        }
        if (payload.lom.technical) {
            this.lom.technical = payload.lom.technical;
        }
        if (payload.lom.educational) {
            this.lom.educational = payload.lom.educational;
        }
        if (payload.lom.rights) {
            this.lom.rights = payload.lom.rights;
        }
        if (payload.lom.relation) {
            this.lom.relation = payload.lom.relation;
        }
        if (payload.lom.annotation) {
            this.lom.annotation = payload.lom.annotation;
        }
        if (payload.lom.classification) {
            this.lom.classification = payload.lom.classification;
        }
    }
}
exports.default = MetadataModel;
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
