import { get, set } from "lodash-es";

import { JSONSchemaFieldType, JSONSchemaObject, JSONSchemaFieldProperty, JSONObject } from "@/types/json-schema";

import { isPlainObject } from "../utils";

/**
 * Returns the given JSON payload's properties.
 * @param payload JSON payload
 * @returns Properties of the given JSON payload
 */
export function convertJSONToFieldProperties(json: JSONObject): Array<JSONSchemaFieldProperty> {
  const getFieldTypes = (json: JSONObject, currentPath: string) => {
    let fieldTypes: Record<string, [JSONSchemaFieldType, JSONSchemaFieldType | undefined]> = {};

    for (const [key, val] of Object.entries(json)) {
      const path = currentPath ? `${currentPath}.${key}` : key;

      if (val && !Array.isArray(val) && isPlainObject(val)) {
        // Object
        fieldTypes[path] = [getPropertyType(val), undefined];
        fieldTypes = { ...fieldTypes, ...getFieldTypes(val as JSONObject, path) };
      } else if (val && Array.isArray(val)) {
        // Array
        if (isPlainObject(val[0])) {
          // Array of Object
          fieldTypes[path] = [getPropertyType(val), getPropertyType(val[0])];
          for (const v of val) {
            fieldTypes = { ...fieldTypes, ...getFieldTypes(v as JSONObject, path) };
          }
        } else {
          // Primitive Array
          fieldTypes[path] = [getPropertyType(val), getPropertyType(val[0])];
        }
      } else {
        // Primitive
        fieldTypes[path] = [getPropertyType(val), undefined];
      }
    }

    return fieldTypes;
  };

  return Object.entries(getFieldTypes(json, "")).map(
    ([key, val]) =>
      ({
        name: key,
        nullable: true,
        required: false,
        description: "",
        type: val[0],
        arrayItemType: val[1],
        format: undefined,
      }) satisfies JSONSchemaFieldProperty
  );
}

export function generateJSONSchema(fieldProperties: Array<JSONSchemaFieldProperty>): JSONSchemaObject {
  const schema = {
    $id: "http://example.com/example.json",
    $schema: "https://json-schema.org/draft/2019-09/schema",
    default: {},
    title: "Root Schema",
    type: "object",
    required: fieldProperties.filter((p) => p.required && p.name.split(".").length === 1).map((p) => p.name),
    properties: convertSchemaProperties(fieldProperties),
  } satisfies JSONSchemaObject;

  return schema;
}

function convertSchemaProperties(fieldProperties: Array<JSONSchemaFieldProperty>): JSONSchemaObject["properties"] {
  const properties = {} as JSONSchemaObject["properties"];
  let _fieldProperties = [...fieldProperties];

  for (const fieldProp of fieldProperties) {
    if (!_fieldProperties.map((p) => p.name).includes(fieldProp.name)) continue;

    const subFieldProps = fieldProperties.filter((p) => p.name.startsWith(fieldProp.name.concat(".")));

    const commonProps = {
      default: getDefaultValueOfProperties(fieldProp.type),
      title: `The ${fieldProp.name} of Schema`,
      description: fieldProp.description,
      type: fieldProp.nullable ? [fieldProp.type, "null"] : fieldProp.type,
    } satisfies Pick<JSONSchemaObject["properties"][string], "default" | "title" | "description" | "type">;

    if (subFieldProps.length > 0) {
      _fieldProperties = fieldProperties.filter((p) => !subFieldProps.map((sp) => sp.name).includes(p.name));

      if (fieldProp.type === "array") {
        set(properties, fieldProp.name, {
          ...commonProps,
          items: {
            default: getDefaultValueOfProperties(fieldProp.type),
            type: fieldProp.nullable ? [fieldProp.arrayItemType!, "null"] : fieldProp.arrayItemType!,
            required: subFieldProps
              .filter((sp) => sp.required && sp.name.split(fieldProp.name).at(-1)?.split(".").length === 2)
              .map((sp) => sp.name.split(".").at(-1)!),
            properties: get(
              convertSchemaProperties(subFieldProps),
              fieldProp.name
            ) as unknown as JSONSchemaObject["properties"],
          },
        } satisfies JSONSchemaObject["properties"][string]);
      } else {
        set(properties, fieldProp.name, {
          ...commonProps,
          required: subFieldProps
            .filter((sp) => sp.required && sp.name.split(fieldProp.name).at(-1)?.split(".").length === 2)
            .map((sp) => sp.name.split(".").at(-1)!),
          properties: get(
            convertSchemaProperties(subFieldProps),
            fieldProp.name
          ) as unknown as JSONSchemaObject["properties"],
        } satisfies JSONSchemaObject["properties"][string]);
      }
    } else {
      set(properties, fieldProp.name, {
        ...commonProps,
        items:
          fieldProp.type === "array"
            ? {
                default: getDefaultValueOfProperties(fieldProp.type),
                type: fieldProp.nullable ? [fieldProp.arrayItemType!, "null"] : fieldProp.arrayItemType!,
              }
            : undefined,
      } satisfies JSONSchemaObject["properties"][string]);
    }
  }

  return properties;
}

export function getDefaultValueOfProperties(
  type: JSONSchemaFieldType
): JSONSchemaObject["properties"][string]["default"] {
  switch (type) {
    case "integer":
      return 0;
    case "number":
      return 0;
    case "string":
      return "";
    case "object":
      return {};
    case "boolean":
      return false;
    case "array":
      return [];
    default:
      return {};
  }
}

export function getPropertyType(value: unknown): JSONSchemaFieldType {
  if (typeof value !== "boolean" && !value) return "null";

  switch (typeof value) {
    case "boolean":
      return "boolean";
    case "number":
      return Number.isInteger(value) ? "integer" : "number";
    case "string":
      return "string";
    case "object":
      if (Array.isArray(value)) {
        return "array";
      } else {
        return "object";
      }
    default:
      return "null";
  }
}
