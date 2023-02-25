import React, { Fragment } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const quillClass = {
  backgroundColor: "#232323",
};

interface Props {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
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

const Quill: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Fragment>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        style={quillClass}
        theme="snow"
      />
    </Fragment>
  );
};

export default Quill;
