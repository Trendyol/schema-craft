"use client";

import { useState } from "react";

import { Layout, Steps, message, Typography, Card, Form, theme } from "antd";

import copy from "copy-to-clipboard";

import { JSONObject, JSONSchemaFieldProperty, JSONSchemaObject } from "@/types/json-schema";
import { convertJSONtoFieldProperties, generateJSONSchema } from "@/lib/converter";
import JsonCodeEditor from "@/components/json-code-editor";
import EnhancerTable from "@/components/enhancer-table";
import JsonCodeViewer from "@/components/json-schema-viewer";
import ProgressionButtons from "@/components/progression-buttons";

export default function HomePage() {
  const { token } = theme.useToken();

  const [enhancerTableForm] = Form.useForm<Record<number, JSONSchemaFieldProperty>>();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [rawJson, setRawJson] = useState<string | null>(null);
  const [jsonSchema, setJsonSchema] = useState<JSONSchemaObject | null>(null);
  const [isRawJsonValid, setIsRawJsonValid] = useState(false);

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const nextStep = () => {
    if (!isRawJsonValid) {
      message.error("JSON is not valid");
      return;
    }
    if (!rawJson) {
      message.error("Please enter JSON");
      return;
    }

    if (currentStep === 0) {
      enhancerTableForm.setFieldsValue(convertJSONtoFieldProperties(JSON.parse(rawJson) as JSONObject));
      setCurrentStep(1);
    } else if (currentStep === 1) {
      const enhancedJsonFields = Object.values<JSONSchemaFieldProperty>(enhancerTableForm.getFieldsValue(true));

      enhancerTableForm
        .validateFields()
        .then(() => {
          setJsonSchema(generateJSONSchema(enhancedJsonFields));
          setCurrentStep(currentStep + 1);
        })
        .catch((err) => {
          if (enhancedJsonFields.filter((jf) => jf.type === "null").length > 0) {
            message.error("Can not proceed with `null` type field(s).");
          }
        });
    }
  };

  return (
    <Layout>
      <Layout.Content
        style={{
          minHeight: "100vh",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card style={{ width: token.screenXLMax }}>
          <img src="/json.svg" alt="" style={{ display: "flex", margin: "0 auto" }} />
          <Typography.Title style={{ marginBlock: "1rem", textAlign: "center" }}>SchemaCraft</Typography.Title>
          <Typography.Text style={{ textAlign: "center", display: "block" }}>
            A simple JSON schema enhancer tool
          </Typography.Text>
          <Steps current={currentStep} items={STEPS} style={{ marginBlock: "2rem" }} />
          {currentStep == 0 && (
            <JsonCodeEditor
              rawJson={rawJson}
              onChange={(value) => {
                try {
                  JSON.parse(value);
                  setRawJson(value);
                  setIsRawJsonValid(true);
                  enhancerTableForm.resetFields();
                } catch (e) {
                  setIsRawJsonValid(false);
                }
              }}
            />
          )}
          {currentStep == 1 && <EnhancerTable form={enhancerTableForm} />}
          {currentStep == 2 && <JsonCodeViewer jsonSchema={jsonSchema} />}
          <ProgressionButtons
            currentStep={currentStep}
            maxStep={STEPS.length - 1}
            onPrev={prevStep}
            onNext={nextStep}
            onCopy={() => {
              copy(JSON.stringify(jsonSchema, null, 2));
              message.success("Copied!");
            }}
          />
        </Card>
      </Layout.Content>
    </Layout>
  );
}

const STEPS = [
  {
    title: "Step 1",
    description: "Enter your JSON",
  },
  {
    title: "Step 2",
    description: "Enhance it!",
  },
  {
    title: "Step 3",
    description: "Get your schema!",
  },
];
