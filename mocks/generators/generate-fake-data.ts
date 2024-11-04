import { simpleFaker } from "@faker-js/faker";

import { JSONSchemaFieldType } from "@/types/json-schema";

export function generateFakeData(type: JSONSchemaFieldType, arrayItemType?: JSONSchemaFieldType) {
  switch (type) {
    case "string":
      return simpleFaker.string.alphanumeric({ length: { min: 5, max: 30 } });
    case "number":
    case "integer":
      return simpleFaker.number.int({ min: 1, max: 1000 });
    case "boolean":
      return simpleFaker.datatype.boolean();
    case "array":
      switch (arrayItemType) {
        case "string":
          return simpleFaker.helpers.arrayElements(["Lorem", "ipsum", "dolor", "sit", "amet"]);
        case "number":
        case "integer":
          return simpleFaker.helpers.arrayElements([1, 2, 3, 4, 5]);
        default:
          return [];
      }
    default:
      return null;
  }
}
