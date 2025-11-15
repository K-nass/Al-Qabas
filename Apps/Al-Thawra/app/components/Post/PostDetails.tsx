import type { ReactNode } from "react";
import { PostHeader } from "./PostHeader";
import { PostImage } from "./PostImage";
import { PostContent } from "./PostContent";
import { CommentsSection } from "./CommentsSection";
import { CommentsDisplay } from "./CommentsDisplay";
import { RelatedPosts } from "./RelatedPosts";

interface PostDetailsProps {
  // Header props
  category: string;
  categoryHref?: string;
  title: string;
  date: string;
  commentsCount: number;

  // Image props
  imageSrc: string;
  imageAlt: string;

  // Content props
  content: string;

  // Comments section props
  onRegister?: () => void;
  onLogin?: () => void;
  registerHref?: string;
  loginHref?: string;

  // Related posts
  relatedPosts?: ReactNode;
  relatedPostsTitle?: string;
}

export function PostDetails({
  category,
  categoryHref,
  title,
  date,
  commentsCount,
  imageSrc,
  imageAlt,
  content,
  onRegister,
  onLogin,
  registerHref,
  loginHref,
  relatedPosts,
  relatedPostsTitle,
}: PostDetailsProps) {
  return (
    <section className="lg:col-span-2">
      <article className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: "var(--color-background-light)", color: "var(--color-text-primary)" }}>
        {/* Article Header */}
        <PostHeader
          category={category}
          categoryHref={categoryHref}
          title={title}
          date={date}
          commentsCount={commentsCount}
        />

        {/* Article Image */}
        <PostImage src={imageSrc} alt={imageAlt} />

        {/* Article Content */}
        <PostContent content={content} />

        {/* Comments Display */}
        <CommentsDisplay commentsCount={commentsCount} />

        {/* Related Posts */}
        {relatedPosts && (
          <RelatedPosts title={relatedPostsTitle}>
            {relatedPosts}
          </RelatedPosts>
        )}

        {/* Comments Section - Login/Register Prompt */}
        <CommentsSection
          onRegister={onRegister}
          onLogin={onLogin}
          registerHref={registerHref}
          loginHref={loginHref}
        />
      </article>
    </section>
  );
}
