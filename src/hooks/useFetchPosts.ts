import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
export function useFetchPosts() {
  async function fetchPosts() {
    return await axios.get(
      `${apiUrl}/posts/categories/articles`
    );
  }
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  return query;
}

// 'https://new-cms.runasp.net/api/v1/posts/categories/articles?CategorySlug=&AuthorId=&Status=&IsFeatured=true&IsBreaking=true&IsSlider=true&Language=&From=&To=&PageNumber=1&PageSize=1&SearchPhrase='