import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type {
  ArticleInitialStateInterface,
  GalleryInitialStateInterface,
  SortedListInitialStateInterface,
} from "./usePostReducer/postData";
import { useState, type ChangeEvent } from "react";
import FileModal from "./FileModal";
import { isValidUrl } from "./types";

interface ImageUploadProps {
  state:
    | ArticleInitialStateInterface
    | GalleryInitialStateInterface
    | SortedListInitialStateInterface;
  handleChange: (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | {
          target: {
            name: string;
            value: string | string[];
            type: string;
          };
        }
  ) => void;
  type: string | null;
  fieldErrors?: Record<string, string[]>;
}

export default function ImageUpload({
  state,  
  handleChange,
  type,
  fieldErrors = {}
}: ImageUploadProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-slate-200 space-y-3 sm:space-y-4">
      <h3 className="text-base font-semibold  ">{type === "video"? "Video Thumbnail" : "Image"}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 -mt-2">
       {type === "video"? "Image for video" : "Main post image"}
      </p>
      <div className="border-2 border-dashed border-slate-300  rounded-lg p-6 flex flex-col items-center justify-center text-center">
        <span className="material-icons-sharp text-5xl text-slate-400 dark:text-slate-500">
          <FontAwesomeIcon icon={faImage} />
        </span>
        <button
          type="button"
          className="mt-2 text-sm px-3 py-1.5 border border-slate-300  rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100"
          onClick={() => setOpen(true)}
        >
          Select Image
        </button>
      </div>
      {open && (
        <FileModal
          onClose={() => setOpen(false)}
          header="images"
          handleChange={handleChange}
        />
      )}
      <p className="text-center text-sm text-slate-500">or Add Image Url</p>
      <div data-error-field={fieldErrors.imageUrl ? true : undefined}>
        <input
          className={`w-full text-sm bg-slate-50 border rounded focus:ring-primary focus:border-primary p-2 ${
            fieldErrors.imageUrl ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="https://example.com/image.jpg"
          type="text"
          name="imageUrl"
          value={state.imageUrl}
          onChange={handleChange}
        />
        <p className="text-xs text-slate-500 mt-1">Use full URL (https://...) or select from media library</p>
        {state.imageUrl && !isValidUrl(state.imageUrl) && (
          <p className="text-xs text-orange-600 mt-1">⚠️ Invalid URL format. Must start with http:// or https://</p>
        )}
        {fieldErrors.imageUrl && (
          <ul className="mt-1 space-y-1">
            {fieldErrors.imageUrl.map((error, idx) => (
              <li key={idx} className="text-red-600 text-xs">• {error}</li>
            ))}
          </ul>
        )}
      </div>
      <div data-error-field={fieldErrors.imageDescription ? true : undefined}>
        <input
          className={`w-full text-sm bg-slate-50 border rounded focus:ring-primary focus:border-primary p-2 ${
            fieldErrors.imageDescription ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="Image Description"
          type="text"
          name="imageDescription"
          value={
            Array.isArray(state.imageDescription)
              ? ""
              : state.imageDescription ?? ""
          }
          onChange={handleChange}
        />
        {fieldErrors.imageDescription && (
          <ul className="mt-1 space-y-1">
            {fieldErrors.imageDescription.map((error, idx) => (
              <li key={idx} className="text-red-600 text-xs">• {error}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
