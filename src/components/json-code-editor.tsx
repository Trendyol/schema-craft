import { ComponentProps } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

type JsonCodeEditorProps = { rawJson: string | null; onChange: ComponentProps<typeof CodeMirror>["onChange"] };

function JsonCodeEditor({ rawJson, onChange }: JsonCodeEditorProps) {
  return (
    <CodeMirror
      theme="dark"
      height="55vh"
      value={rawJson ?? ""}
      extensions={[json()]}
      onChange={onChange}
      basicSetup={{ lineNumbers: false }}
    />
  );
}

export default JsonCodeEditor;
