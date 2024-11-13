import {
  convertJSONtoFieldProperties,
  generateJSONSchema,
  getDefaultValueOfProperties,
  getPropertyType,
} from "@/lib/converter";

import {
  basicSchemaObj,
  complexNestedObj,
  complexNestedObjFieldProperties,
  requiredFieldProperties,
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
  test("should return a schema with correct base structure", () => {
    const result = generateJSONSchema([]);

    expect(result).toMatchObject(basicSchemaObj);
  });

  test("should add required properties to schema based on fieldProperties", () => {
    const result = generateJSONSchema(requiredFieldProperties);

    expect(result.required).toContain("name");
    expect(result.required).not.toContain("age");
    expect(result.required).not.toContain("address.city");
  });
});
