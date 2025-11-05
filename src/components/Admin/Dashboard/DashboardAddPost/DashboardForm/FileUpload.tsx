import { useState } from "react";
import FileModal from "./FileModal";
import type { HandleChangeType } from "./types";

interface FileUploadProps {
  handleChange: HandleChangeType;
}
export default function FileUpload({  handleChange }: FileUploadProps) {
  const [fileName] = useState<string | null>()
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg shadow-sm border border-[var(--border)] space-y-3 text-[var(--text-primary)]">
      <h3 className="text-base font-semibold">Files</h3>
      <p className="text-sm text-[var(--text-secondary)] -mt-2">
        Downloadable additional files (.pdf,.docx,.zip etc..)
      </p>
      <label className="block text-center w-full text-sm px-3 py-2 bg-[#605CA8] text-white rounded hover:bg-indigo-700 cursor-pointer">

        <button 
          type="button"
          onClick={() => setOpen(true)}
        >
          Select File
        </button>
      </label>
      {open && <FileModal onClose={() => setOpen(false)} header="files" handleChange={handleChange} />}
      {fileName && (
        <p className="text-xs text-gray-700 mt-2">
          Selected file: <span className="font-medium">{fileName}</span>
        </p>
      )}
    </div>
  );
}
