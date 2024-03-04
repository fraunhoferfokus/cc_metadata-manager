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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MetadataSchema_1 = __importDefault(require("../models/Metadata/MetadataSchema"));
const MetadataQuerySchema_1 = __importDefault(require("../models/Metadata/MetadataQuerySchema"));
const BiLoMetadataSchema_1 = __importDefault(require("../models/BiLoMetadata/BiLoMetadataSchema"));
const BiLoMetadataQuerySchema_1 = __importDefault(require("../models/BiLoMetadata/BiLoMetadataQuerySchema"));
const BASE_PATH = (process.env.BASE_PATH)
    ? (process.env.BASE_PATH.indexOf('/') == 0)
        ? process.env.BASE_PATH
        : '/' + process.env.BASE_PATH
    : '';
const API_DOC_DEFINITION = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: (_a = process.env.npm_package_name) !== null && _a !== void 0 ? _a : '',
            description: (_b = process.env.npm_package_description) !== null && _b !== void 0 ? _b : '',
            version: (_c = process.env.npm_package_version) !== null && _c !== void 0 ? _c : '',
        },
        basePath: BASE_PATH,
        components: {
            schemas: {
                Metadata: MetadataSchema_1.default,
                MetadataQuery: MetadataQuerySchema_1.default,
                BiLoMetadataQuery: BiLoMetadataQuerySchema_1.default,
                BiLoMetadata: BiLoMetadataSchema_1.default,
            }
        }
    },
    apis: [
        './dist/controllers/*Ctrl.js'
    ],
};
exports.default = API_DOC_DEFINITION;
