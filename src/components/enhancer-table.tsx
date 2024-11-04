import { useState } from "react";

import { Table, TableColumnsType, Typography, Checkbox, Space, Tooltip, Input, Select, Form, FormInstance } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import { JSONSchemaFieldProperty } from "@/types/json-schema";

type CheckboxState = { indeterminate: boolean; checked: boolean };

type EnhancerTableProps = { form: FormInstance<Record<number, JSONSchemaFieldProperty>> };

export default function EnhancerTable({ form }: EnhancerTableProps) {
  const [checkboxColumnsState, setCheckboxColumnsState] = useState<Record<string, CheckboxState>>({
    required: {
      indeterminate: false,
      checked: Object.values<JSONSchemaFieldProperty>(form.getFieldsValue(true)).reduce(
        (acc, curr) => acc && curr.required,
        true
      ),
    },
    nullable: { indeterminate: false, checked: true },
  });

  const dataSource = Object.values<JSONSchemaFieldProperty>(form.getFieldsValue(true));

  const maxNameLength = Math.max(...dataSource.map((d) => d.name.length));

  const handleCheckAllCheckboxChange = (
    e: Parameters<Required<React.ComponentProps<typeof Checkbox>>["onChange"]>[0],
    key: "required" | "nullable"
  ) => {
    dataSource.forEach((val, i) => {
      form.setFieldValue([i, key], e.target.checked);
    });
    setCheckboxColumnsState({ ...checkboxColumnsState, [key]: { indeterminate: false, checked: e.target.checked } });
  };

  const columns: TableColumnsType<JSONSchemaFieldProperty> = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
      width: `${maxNameLength + 5}ch`,
      render(value, record, index) {
        return (
          <>
            {[
              ...Array.from({ length: value.split(".").length - 1 }, (_, index) => index).map(() => (
                <>&ensp;&ensp;&ensp;&ensp;</>
              )),
            ]}
            <Typography.Text style={{ display: "inline-block" }}>{value}</Typography.Text>
            <Form.Item name={[index, "name"]} noStyle hidden>
              <Input value={value} />
            </Form.Item>
          </>
        );
      },
    },
    {
      key: "type",
      dataIndex: "type",
      title: "Type",
      width: "200px",
      render(value, record, index) {
        return (
          <Form.Item
            name={[index, "type"]}
            initialValue={value}
            noStyle
            rules={[
              {
                validator(_, value) {
                  if (value === "null") {
                    return Promise.reject();
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Select
              status={value === "null" ? "error" : undefined}
              style={{ width: "100%" }}
              options={["string", "number", "integer", "boolean", "array", "object", "null"].map((v) => ({
                value: v,
                label: v,
              }))}
            />
          </Form.Item>
        );
      },
    },
    {
      key: "required",
      dataIndex: "required",
      width: "150px",
      title: (
        <Space align="center">
          <Checkbox {...checkboxColumnsState.required} onChange={(e) => handleCheckAllCheckboxChange(e, "required")} />
          <Typography.Text>Required</Typography.Text>
          <Tooltip
            placement="top"
            title="This field is required for each message. If this field is not found in the message, the message is automatically rejected."
          >
            <InfoCircleOutlined style={{ fontSize: "12px" }} />
          </Tooltip>
        </Space>
      ),
      align: "center",
      render(value, record, index) {
        return (
          <Form.Item name={[index, "required"]} noStyle valuePropName="checked" shouldUpdate>
            <Checkbox checked={value} />
          </Form.Item>
        );
      },
    },
    {
      key: "nullable",
      dataIndex: "nullable",
      width: "150px",
      title: (
        <Space align="center">
          <Checkbox {...checkboxColumnsState.nullable} onChange={(e) => handleCheckAllCheckboxChange(e, "nullable")} />
          <Typography.Text>Nullable</Typography.Text>
          <Tooltip placement="top" title="This field may not contain the value of the default type in every message.">
            <InfoCircleOutlined style={{ fontSize: "12px" }} />
          </Tooltip>
        </Space>
      ),
      align: "center",
      render(value, record, index) {
        return (
          <Form.Item name={[index, "nullable"]} noStyle valuePropName="checked" shouldUpdate>
            <Checkbox checked={value} />
          </Form.Item>
        );
      },
    },
    {
      key: "description",
      dataIndex: "description",
      title: "Description",
      width: "500px",
      render(value, record, index) {
        return (
          <Form.Item name={[index, "description"]} initialValue={value} noStyle>
            <Input />
          </Form.Item>
        );
      },
    },
  ];

  return (
    <Form form={form} autoComplete="off">
      <Table
        bordered
        size="small"
        rowKey={(record) => record.name}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ y: "50.75vh", x: "100rem" }}
      />
    </Form>
  );
}
