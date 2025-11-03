import { useState } from "react";
import FileModal from "./FileModal";

export default function AdditionalImages({ handleChange }: { handleChange: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white  p-4 rounded-lg shadow-sm border border-slate-200  space-y-3">
      <h3 className="text-base font-semibold  ">Additional Images</h3>
      <p className="text-sm text-slate-500">
        More main images (slider will be active)
      </p>
      <button onClick={() => setOpen(true)} className="w-full text-sm px-3 py-2 bg-[#605CA8] text-white rounded hover:bg-indigo-700 cursor-pointer">
        Select Image
      </button>
      {open && <FileModal onClose={() => setOpen(false)} header="additional images" handleChange={handleChange} />}
    </div>
  );
}