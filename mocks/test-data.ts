import { JSONSchemaFieldProperty, JSONSchemaObject } from "@/types/json-schema";
import { generateFakeData } from "./generators/generate-fake-data";

export const simpleObj = {
  name: generateFakeData("string"),
};
export const simpleObjFieldProperties = [
  {
    name: "name",
    type: "string",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
] satisfies JSONSchemaFieldProperty[];

export const simpleNestedObj = {
  a: {
    b: {
      c: {
        id: generateFakeData("integer"),
        key: generateFakeData("string"),
      },
    },
  },
};
export const simpleNestesObjFieldProperties = [
  {
    name: "a",
    type: "object",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
  {
    name: "a.b",
    type: "object",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
  {
    name: "a.b.c",
    type: "object",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
  {
    name: "a.b.c.id",
    type: "integer",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
  {
    name: "a.b.c.key",
    type: "string",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
] satisfies JSONSchemaFieldProperty[];
export const simpleNestesObjFieldPropertiesWithRequiredFields = [
  {
    name: "a",
    type: "object",
    arrayItemType: undefined,
    format: undefined,
    required: true,
    nullable: true,
    description: "",
  },
  {
    name: "a.b",
    type: "object",
    arrayItemType: undefined,
    format: undefined,
    required: true,
    nullable: true,
    description: "",
  },
  {
    name: "a.b.c",
    type: "object",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
  {
    name: "a.b.c.id",
    type: "integer",
    arrayItemType: undefined,
    format: undefined,
    required: true,
    nullable: true,
    description: "",
  },
  {
    name: "a.b.c.key",
    type: "string",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
] satisfies JSONSchemaFieldProperty[];

export const complexNestedObj = {
  name: generateFakeData("string"),
  age: generateFakeData("integer"),
  isActive: generateFakeData("boolean"),
  scores: generateFakeData("array", "integer"),
  address: {
    street: generateFakeData("string"),
    city: generateFakeData("string"),
  },
  contacts: [
    {
      type: generateFakeData("string"),
      value: generateFakeData("string"),
    },
    {
      type: generateFakeData("string"),
      value: generateFakeData("string"),
    },
  ],
  tags: null,
};
export const complexNestedObjFieldProperties = [
  {
    name: "name",
    type: "string",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
  {
    name: "age",
    type: "integer",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
  {
    name: "isActive",
    type: "boolean",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
  {
    name: "scores",
    type: "array",
    arrayItemType: "integer",
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
  {
    name: "address",
    type: "object",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
  {
    name: "address.street",
    type: "string",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
  {
    name: "address.city",
    type: "string",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
  {
    name: "contacts",
    type: "array",
    arrayItemType: "object",
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
  {
    name: "contacts.type",
    type: "string",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
  {
    name: "contacts.value",
    type: "string",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
  {
    name: "tags",
    type: "null",
    arrayItemType: undefined,
    format: undefined,
    required: false,
    nullable: true,
    description: "",
  },
] satisfies JSONSchemaFieldProperty[];

export const baseSchemaObj = {
  $id: "http://example.com/example.json",
  $schema: "https://json-schema.org/draft/2019-09/schema",
  default: {},
  title: "Root Schema",
  type: "object",
  required: [],
  properties: {},
} satisfies JSONSchemaObject;
