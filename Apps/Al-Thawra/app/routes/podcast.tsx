import { useSearchParams } from "react-router";
import type { Route } from "./+types/podcast";
import { PostsGrid } from "../components/PostsGrid";
import { Slider } from "../components/Slider";
import type { Post } from "../components/PostCard";
import axiosInstance from "../lib/axios";

interface PodcastResponse {
    pageSize: number;
    pageNumber: number;
    totalCount: number;
    totalPages: number;
    itemsFrom: number;
    itemsTo: number;
    items: Array<{
        id: string;
        title: string;
        slug: string;
        imageUrl: string;
        categoryName: string;
        categorySlug: string;
        publishedAt: string;
        createdAt: string;
    }>;
}

// Transform API response to Post format
const transformPodcastToPost = (podcast: PodcastResponse["items"][0]): Post => ({
    id: podcast.id,
    title: podcast.title,
    slug: podcast.slug,
    image: podcast.imageUrl,
    categoryName: podcast.categoryName,
    categorySlug: podcast.categorySlug,
    publishedAt: podcast.publishedAt,
    createdAt: podcast.createdAt,
});

// Loader function for SSR
export const loader = async ({ request }: Route.LoaderArgs) => {
    const url = new URL(request.url);
    const pageNumber = parseInt(url.searchParams.get("page") || "1", 10);
    try {
        const response = await axiosInstance.get<PodcastResponse>(
            "/posts/categories/audios",
            {
                params: {
                    PageNumber: pageNumber,
                    PageSize: 15,
                },
            }
        );
        return {
            data: response.data,
            pageNumber,
        };
    } catch (error) {
        throw new Response("Failed to load podcasts", { status: 500 });
    }
};

export default function PodcastPage({
    loaderData,
}: Route.ComponentProps) {
    const { data, pageNumber: initialPageNumber } = loaderData;
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") || String(initialPageNumber), 10);

    const podcasts = data?.items.map(transformPodcastToPost) || [];
    const sliderPodcasts = podcasts.slice(0, 3);

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: String(newPage) });
    };

    return (
        <div className="space-y-6">
            {/* Podcast Slider */}
            {sliderPodcasts.length > 0 && <Slider posts={sliderPodcasts} />}

            {/* Podcast Header */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h1 className="text-2xl font-bold text-[var(--color-primary)]">
                    البودكاست
                </h1>
                <p className="text-[var(--color-text-secondary)] mt-2">
                    استمع إلى أحدث الحوارات والنقاشات الشيقة
                </p>
            </div>

            {/* Podcasts Grid */}
            <div>
                <PostsGrid posts={podcasts} showCategoryHeader={false} />

                {/* Pagination */}
                {data && data.totalPages > 1 && (
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            السابق
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="text-[var(--color-text-secondary)]">
                                الصفحة {currentPage} من {data.totalPages}
                            </span>
                        </div>

                        <button
                            onClick={() =>
                                handlePageChange(Math.min(data.totalPages, currentPage + 1))
                            }
                            disabled={currentPage === data.totalPages}
                            className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-md hover:shadow-lg"
                        >
                            التالي
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
