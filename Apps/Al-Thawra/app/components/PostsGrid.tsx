import { PostCard, type Post } from "./PostCard";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

interface PostsGridProps {
  posts: Post[];
  categoryName?: string;
  categorySlug?: string;
  showCategoryHeader?: boolean;
}

export function PostsGrid({
  posts,
  categoryName,
  categorySlug,
  showCategoryHeader = true,
}: PostsGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">لا توجد مقالات</p>
      </div>
    );
  }

  return (
    <section className="w-full" dir="rtl" lang="ar">
      {/* Category Header */}
      {showCategoryHeader && categoryName && (
        <div className="flex items-center mb-6">
          {categorySlug && (
            <Link
              to={`/category/${categorySlug}`}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
              aria-label="عرض المزيد"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-[var(--color-primary)] transition-colors" />
            </Link>
          )}
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mr-3">
            {categoryName}
          </h2>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
