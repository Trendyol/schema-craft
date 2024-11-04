import { convertJSONtoFieldProperties } from "@/lib/converter";

import {
  complexNestedObj,
  complexNestedObjFieldProperties,
  simpleNestedObj,
  simpleNestesObjFieldProperties,
  simpleObj,
  simpleObjFieldProperties,
} from "../../../../mocks/test-data";

describe("json-schema module tests", () => {
  test("should convert json object and return field properties for a simple object", () => {
    const result = convertJSONtoFieldProperties(simpleObj);

    expect(result).toEqual(simpleObjFieldProperties);
  });

  test("should convert json object and return field properties for a simple nested object", () => {
    const result = convertJSONtoFieldProperties(simpleNestedObj);

    expect(result).toEqual(simpleNestesObjFieldProperties);
  });

  test("should convert json object and return field properties for a complex nested object", () => {
    const result = convertJSONtoFieldProperties(complexNestedObj);

    expect(result).toEqual(complexNestedObjFieldProperties);
  });

  test("should convert empty json object and return empty field properties", () => {
    const result = convertJSONtoFieldProperties({});

    expect(result).toEqual([]);
  });
});
