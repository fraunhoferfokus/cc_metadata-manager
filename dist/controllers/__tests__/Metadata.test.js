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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require('supertest');
const baseUrl = 'http://localhost:3042';
describe('', () => {
    it('get metadata by productId', () => __awaiter(this, void 0, void 0, function* () {
        const product_id = "urn:bilo:medium:A002#11-1122-11-XY";
        const prepared_product_id = encodeURIComponent(product_id); // replace special chars
        const route = `/getMetadataById/?product_id=${prepared_product_id}`;
        const response = yield request(baseUrl)
            .get(route)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body[0].query).toBeDefined();
    }));
    it('get metadata by productIds', () => __awaiter(this, void 0, void 0, function* () {
        const mockQuery = {
            product_id: [
                "urn:bilo:medium:A002#11-1122-11-XY",
                "urn:bilo:medium:A002#11-3322-22-YZ"
            ]
        };
        const mockQueryString = createSearchParams(mockQuery).toString();
        const route = `/getMetadataById/?${mockQueryString}`;
        const response = yield request(baseUrl)
            .get(route)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body[0].query).toBeDefined();
        expect(response.body[1].query).toBeDefined();
    }));
});
// Source: https://stackoverflow.com/questions/72571132/urlsearchparams-with-multiple-values
const createSearchParams = params => {
    return new URLSearchParams(Object.entries(params).flatMap(([key, values]) => Array.isArray(values) ? values.map((value) => [key, value]) : [[key, values]]));
};
