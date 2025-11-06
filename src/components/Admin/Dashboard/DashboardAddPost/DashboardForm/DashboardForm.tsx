import { useLocation, useNavigate } from "react-router-dom";
import FormHeader from "./FormHeader";
import PostDetailsForm, { type TagInterface } from "./PostDetailsForm";
import ContentEditor from "./ContentEditor";
import GalleryItems from "./GalleryItems";
import SortedListItems from "./SortedListItems";

import AdditionalImages from "./AdditionalImages";
import FileUpload from "./FileUpload";
import CategorySelect from "./CategorySelect";
import PublishSection from "./PublishSection";
import ImageUpload from "./ImageUpload";
import { useEffect, type ChangeEvent, useState } from "react";
import axios from "axios";
import { apiClient, getAuthToken } from "@/api/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import ApiNotification from "../../../../Common/ApiNotification";
import { usePostReducer } from "./usePostReducer/usePostReducer";
import type {
  ArticleInitialStateInterface,
  GalleryInitialStateInterface,
  SortedListInitialStateInterface,
} from "./usePostReducer/postData";
import { postConfig } from "./usePostReducer/postConfig";
import { useCategories } from "@/hooks/useCategories";

interface TagResponse {
  data: {
    items: TagInterface[];
  };
}

export default function DashboardForm() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const type = query.get("type");
  const navigate = useNavigate();
  const [state, dispatch] = usePostReducer(type);
  const token = getAuthToken();

  useEffect(() => {
    if (!type) {
      navigate("/admin/post-format");
    }
  }, [type, navigate]);

  // Check authorization
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]); 

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  type CustomChangeEvent =
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    | {
        target: {
          name: string;
          value: string | string[] | any;
          type: string;
          checked?: boolean;
        };
      };

  function handleChange(e: CustomChangeEvent, newTags?: string[]) {
    const { type, value, name } = e.target;
    let payload: string | boolean | string[] | object[] | undefined = value;

    if ("checked" in e.target && type === "checkbox") {
      payload = e.target.checked;
    } else if (type === "radio" && (value === "true" || value === "false")) {
      payload = value === "true";
    } else if (name === "tagIds" && newTags) {
      payload = newTags;
    }
    // Handle items array (for gallery)
    else if (name === "items" && Array.isArray(value)) {
      payload = value;
    }

    dispatch({ type: "set-field", field: name, payload });
  }

  async function fetchTags() {
    return await apiClient.get(`/tags`);
  }

  const { data: tags, isLoading: isLoadingTags } = useQuery<TagResponse>({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = state as
        | ArticleInitialStateInterface
        | GalleryInitialStateInterface
        | SortedListInitialStateInterface;
      const categoryId = payload.categoryId;
      if (!categoryId) throw new Error("categoryId missing");
      if (!type) throw new Error("Post type is required");

      const config = postConfig[type as keyof typeof postConfig];
      if (!config) throw new Error(`Unknown post type: ${type}`);

      const endpoint = config.endpoint;
      
      const response = await apiClient.post(
        `/posts/categories/${categoryId}/${endpoint}`,
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      const msg =
        (data && (data.message || data.title)) ?? "Post created successfully";
      setFieldErrors({});
      setNotification({ type: "success", message: String(msg) });
    },
    onError: (error: unknown) => {
      let message = "Failed to create post";
      const errors: Record<string, string[]> = {};
      
      if (axios.isAxiosError(error)) {
        const d = error.response?.data;
        const status = error.response?.status;
        
        // Handle 401 Unauthorized - redirect to login
        if (status === 401) {
          navigate('/login');
          return;
        }
        
        // Check for title first (general error message)
        if (d?.title) message = String(d.title);
        else if (d?.message) message = String(d.message);
        else if (d?.errors) {
          // Extract field-level errors from API response
          if (typeof d.errors === 'object') {
            Object.entries(d.errors).forEach(([field, messages]) => {
              // Normalize field name to lowercase for matching form fields
              const normalizedField = field.toLowerCase();
              if (Array.isArray(messages)) {
                errors[normalizedField] = messages;
              } else if (typeof messages === 'string') {
                errors[normalizedField] = [messages];
              }
            });
          }
          message = d.message || 'Validation failed';
        }
        else message = error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      
      setFieldErrors(errors);
      setNotification({ type: "error", message });
    },
  });

  // #505458 new color i will use for form

  return (
    <>
      {notification && (
        <ApiNotification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <form
        className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
      >
        <FormHeader type={type} />
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          <div className="grow space-y-4 md:space-y-6">
            {/* left column */}
            <PostDetailsForm
              type={type}
              state={state}
              handleChange={handleChange}
              tags={tags?.data.items ?? []}
              isLoading={isLoadingTags}
              fieldErrors={fieldErrors}
            />
            {type === "gallery" ? (
              <GalleryItems
                state={state as GalleryInitialStateInterface}
                handleChange={handleChange}
                errors={fieldErrors}
              />
            ) : type === "sorted-list" ? (
              <SortedListItems
                state={state as SortedListInitialStateInterface}
                handleChange={handleChange}
                errors={fieldErrors}
              />
            ) : (
              <ContentEditor
                state={state as ArticleInitialStateInterface}
                handleChange={handleChange}
                errors={fieldErrors}
              />
            )}
          </div>
          <div className="w-full lg:w-80 lg:shrink-0 space-y-4 md:space-y-6">
            {/* right column */}
            <ImageUpload
              state={state}
              handleChange={handleChange}
              type={type}
              fieldErrors={fieldErrors}
            />
            {!["gallery", "sorted-list", "audio", "video"].includes(
              type || ""
            ) && (
              <>
                <AdditionalImages handleChange={handleChange} fieldErrors={fieldErrors} />
                <FileUpload handleChange={handleChange} fieldErrors={fieldErrors} />
              </>
            )}
            {type === "video" && <MediaUpload />}
            <CategorySelect
              handleChange={handleChange}
              categories={categories?.data ?? []}
              isLoading={isLoadingCategories}
              value={state.categoryId}
              errors={fieldErrors}
            />
            <PublishSection mutation={mutation} />
          </div>
        </div>
      </form>
    </>
  );
}

function MediaUpload() {
  return (
    <div className="bg-white p-4 sm:p-6  border border-slate-200 space-y-6">
      <div className="bg-white overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-slate-200">
          <nav aria-label="Tabs" className="flex">
            <a
              aria-current="page"
              className="border-b-2 border-primary text-primary whitespace-nowrap font-medium text-base py-3"
              href="#"
            >
              Get Video from URL
            </a>
            <a
              className="border-b-2 border-transparent text-slate-500 whitespace-nowrap font-medium text-base px-6 py-3 hover:text-primary hover:border-primary/40"
              href="#"
            >
              Upload Video
            </a>
          </nav>
        </div>

        {/* Content */}
        <div className=" space-y-6">
          {/* Video URL Field */}
          <div className="space-y-2">
            <label
              htmlFor="video-url"
              className="block font-semibold text-slate-800"
            >
              Video URL
              <span className="text-sm font-normal text-slate-500 ml-1">
                (YouTube, Vimeo, Dailymotion, Facebook)
              </span>
            </label>

            <div className="">
              <input
                id="video-url"
                name="video-url"
                type="url"
                placeholder="Enter video URL"
                className="block w-full border border-slate-300 bg-white text-slate-700 placeholder-slate-400 focus:border-primary "
              />
              {/* <button
                type="button"
                className="inline-flex items-center justify-center rounded-md px-5 py-2.5 font-medium  hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition"
              >
                Get Video
              </button> */}
            </div>
          </div>

          {/* Video Embed Field */}
          <div className="space-y-2">
            <label
              htmlFor="video-embed"
              className="block text-base font-semibold text-slate-800"
            >
              Video Embed Code
            </label>
            <textarea
              id="video-embed"
              name="video-embed"
              placeholder="Paste video embed code here..."
              rows={4}
              className="block w-full rounded-md border border-slate-300 bg-white  text-slate-700 placeholder-slate-400 focus:border-primary focus:ring focus:ring-primary/20 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

