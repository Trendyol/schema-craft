import {
  convertJSONtoFieldProperties,
  generateJSONSchema,
  getDefaultValueOfProperties,
  getPropertyType,
} from "@/lib/converter";

import {
  baseSchemaObj,
  complexNestedObj,
  complexNestedObjFieldProperties,
  simpleNestedObj,
  simpleNestesObjFieldProperties,
  simpleObj,
  simpleObjFieldProperties,
  simpleNestesObjFieldPropertiesWithRequiredFields,
} from "../../../../mocks/test-data";

describe("convertJSONtoFieldProperties function tests", () => {
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

describe("getDefaultValueOfProperties function tests", () => {
  it("should return default values for different types", () => {
    expect(getDefaultValueOfProperties("integer")).toEqual(0);
    expect(getDefaultValueOfProperties("number")).toEqual(0);
    expect(getDefaultValueOfProperties("string")).toEqual("");
    expect(getDefaultValueOfProperties("object")).toEqual({});
    expect(getDefaultValueOfProperties("boolean")).toEqual(false);
    expect(getDefaultValueOfProperties("array")).toEqual([]);
  });
});

describe("getPropertyType function tests", () => {
  test("should return 'null' for null or undefined values", () => {
    expect(getPropertyType(null)).toBe("null");
    expect(getPropertyType(undefined)).toBe("null");
  });

  test("should return 'boolean' for boolean values", () => {
    expect(getPropertyType(true)).toBe("boolean");
    expect(getPropertyType(false)).toBe("boolean");
  });

  test("should return 'integer' for integer numbers", () => {
    expect(getPropertyType(5)).toBe("integer");
    expect(getPropertyType(-1)).toBe("integer");
    expect(getPropertyType(0)).toBe("integer");
  });

  test("should return 'number' for non-integer numbers", () => {
    expect(getPropertyType(5.5)).toBe("number");
    expect(getPropertyType(-3.14)).toBe("number");
  });

  test("should return 'string' for string values", () => {
    expect(getPropertyType("hello")).toBe("string");
    expect(getPropertyType("")).toBe("string");
  });

  test("should return 'array' for array values", () => {
    expect(getPropertyType([])).toBe("array");
    expect(getPropertyType([1, 2, 3])).toBe("array");
  });

  test("should return 'object' for non-null object values", () => {
    expect(getPropertyType({})).toBe("object");
    expect(getPropertyType({ key: "value" })).toBe("object");
  });
});

describe("generateJSONSchema function tests", () => {
  test("should convert empty field properties array and return base json schema object", () => {
    const result = generateJSONSchema([]);

    expect(result).toEqual(baseSchemaObj);
  });

  test("should convert field properties that has required fields and return json schema", () => {
    const result = generateJSONSchema(simpleNestesObjFieldPropertiesWithRequiredFields);

    expect(result.required).toEqual(["a"]);
    expect(result.properties["a"].required).toEqual(["b"]);
    expect(result.properties["a"].properties!["b"].required).toEqual([]);
    expect(result.properties["a"].properties!["b"].properties!["c"].required).toEqual(["id"]);
    expect(result.properties["a"].properties!["b"].properties!["c"]).not.toContain("key");
  });
});
