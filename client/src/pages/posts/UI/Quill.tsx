import React, { Fragment } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const quillClass = {
  backgroundColor: "#232323",
};

interface Props {
  textAreaValue: string | undefined;
  setTextAreaValue: React.Dispatch<React.SetStateAction<string>>;
}

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    [{ bold: !formats.includes("bold") }, "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }],
    [{ link: "image" }],
    ["clean"],
  ],
};

const Quill: React.FC<Props> = ({ textAreaValue, setTextAreaValue }) => {
  return (
    <Fragment>
      <ReactQuill
        defaultValue={textAreaValue}
        onChange={setTextAreaValue}
        modules={modules}
        formats={formats}
        style={quillClass}
        theme="snow"
      />
    </Fragment>
  );
};

export default Quill;
