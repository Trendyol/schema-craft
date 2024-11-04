export type TargetType = "JsonSchema" | "BigQuery";

export type JSONObject = { [K in string]: JSONValue };
export type JSONArray = JSONValue[] | readonly JSONValue[];
export type JSONPrimitive = string | number | boolean | null | undefined;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

export type JSONSchemaFieldType = "string" | "number" | "integer" | "boolean" | "array" | "object" | "null";
export type JSONSchemaFieldFormat = "date-time" | "timestamp" | "date";
export type JSONSchemaObject = {
  $id: string;
  $schema: string;
  title: string;
  type: "object";
  default: {};
  properties: Record<
    string,
    {
      default: "" | 0 | false | {} | [];
      description: string;
      title: string;
      type: JSONSchemaFieldType | JSONSchemaFieldType[];
      format?: JSONSchemaFieldFormat;
      properties?: JSONSchemaObject["properties"];
      items?: Pick<JSONSchemaObject["properties"][string], "default" | "properties" | "required" | "type" | "format">;
      required?: string[];
    }
  >;
  required?: string[];
};
export type JSONSchemaFieldProperty = {
  name: string;
  type: JSONSchemaFieldType;
  arrayItemType?: JSONSchemaFieldType;
  format?: JSONSchemaFieldFormat;
  required: boolean;
  nullable: boolean;
  description: string;
};
