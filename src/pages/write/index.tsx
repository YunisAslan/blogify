import { Input } from "@/components/ui/Input";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownEditor from "@uiw/react-markdown-editor";

const mdStr = `# This is a H1  \n## This is a H2  \n###### This is a H6`;

function Write() {
  const [value, setValue] = useState("");
  return (
    <div>
      <h1 className="py-2 mb-14 text-4xl md:text-[4rem] font-oswald uppercase text-center leading-[0.9] tracking-wider">
        Write
      </h1>

      <div className="w-1/2 mx-auto">
        <MarkdownEditor
          value={mdStr}
          onChange={(value, viewUpdate) => {
            console.log("Value: ", value);
            setValue(value);
            // console.log("viewupdate: ", viewUpdate);
          }}
        />
      </div>

      <div className="prose">
        <MarkdownEditor.Markdown
          source={value}
          style={{ background: "white" }}
        />
      </div>
    </div>
  );
}

export default Write;
