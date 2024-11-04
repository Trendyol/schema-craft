import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

type JsonSchemaViewerProps = { jsonSchema: Record<string, unknown> | null };

function JsonSchemaViewer({ jsonSchema }: JsonSchemaViewerProps) {
  return (
    <CodeMirror
      theme="dark"
      width="100%"
      height="55vh"
      value={jsonSchema ? JSON.stringify(jsonSchema, null, 4) : undefined}
      extensions={[json()]}
      editable={false}
      basicSetup={{ lineNumbers: false }}
    />
  );
}

export default JsonSchemaViewer;
