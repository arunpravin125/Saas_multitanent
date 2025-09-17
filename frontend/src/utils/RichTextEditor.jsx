import React, { useRef, useCallback, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Palette,
} from "lucide-react";

export const RichTextEditor = ({
  value,
  onChange,
  placeholder,
  className,
  error,
}) => {
  const editorRef = useRef(null);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      if (onChange) {
        onChange(content); // Directly call onChange with the new content
      }
    }
  }, [onChange]);

  // Use useEffect to update the editor's content when the value prop changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const execCommand = useCallback(
    (command, commandValue = null) => {
      document.execCommand(command, false, commandValue);
      // After executing the command, trigger a manual update
      if (editorRef.current) {
        handleInput();
      }
    },
    [handleInput]
  );

  const buttonClass =
    "p-1.5 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors";

  return (
    <div
      className={`border rounded-md bg-white ${
        error ? "border-red-500" : "border-gray-300"
      } ${className} w-full`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .rich-editor-content:empty:before {
            content: attr(data-placeholder);
            color: #9ca3af;
            pointer-events: none;
          }
          .rich-editor-content:focus:before {
            display: none;
          }
        `,
        }}
      />
      <div className="flex items-center gap-1 px-3 py-2 bg-gray-50 border-b border-gray-200 rounded-t-md flex-wrap">
        <select
          onChange={(e) => execCommand("fontName", e.target.value)}
          className="text-xs border border-gray-300 rounded px-2 py-1 bg-white min-w-[60px]"
          defaultValue=""
        >
          <option value="">Font</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times</option>
          <option value="Courier New">Courier</option>
          <option value="Verdana">Verdana</option>
        </select>
        <select
          onChange={(e) => execCommand("fontSize", e.target.value)}
          className="text-xs border border-gray-300 rounded px-2 py-1 bg-white ml-1 min-w-[50px]"
          defaultValue=""
        >
          <option value="">Size</option>
          <option value="1">8</option>
          <option value="2">10</option>
          <option value="3">12</option>
          <option value="4">14</option>
          <option value="5">18</option>
          <option value="6">24</option>
          <option value="7">36</option>
        </select>
        <div className="w-px h-5 bg-gray-300 mx-2 hidden sm:block" />
        <button
          type="button"
          onClick={() => execCommand("bold")}
          className={buttonClass}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("italic")}
          className={buttonClass}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("underline")}
          className={buttonClass}
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-gray-300 mx-2 hidden sm:block" />
        <button
          type="button"
          onClick={() => execCommand("justifyLeft")}
          className={buttonClass}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("justifyCenter")}
          className={buttonClass}
          title="Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("justifyRight")}
          className={buttonClass}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-gray-300 mx-2 hidden sm:block" />
        <button
          type="button"
          onClick={() => execCommand("insertUnorderedList")}
          className={buttonClass}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("insertOrderedList")}
          className={buttonClass}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-gray-300 mx-2 hidden sm:block" />
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) execCommand("createLink", url);
          }}
          className={buttonClass}
          title="Insert Link"
        >
          <Link className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            const color = prompt("Enter color (e.g., #ff0000 or red):");
            if (color) execCommand("foreColor", color);
          }}
          className={buttonClass}
          title="Text Color"
        >
          <Palette className="w-4 h-4" />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="rich-editor-content w-full px-3 py-2 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        style={{ minHeight: "120px", maxHeight: "300px", overflowY: "auto" }}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
      />
    </div>
  );
};
