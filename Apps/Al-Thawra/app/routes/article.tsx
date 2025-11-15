import { useParams } from "react-router";
import type { Route } from "./+types/article";
import {
  PostDetails,
  PostHeader,
  PostImage,
  PostContent,
  CommentsSection,
  RelatedPosts,
} from "../components/Post";

// Mock data - replace with actual API calls
const mockArticles: Record<
  string,
  {
    category: string;
    categoryHref: string;
    title: string;
    date: string;
    commentsCount: number;
    imageSrc: string;
    imageAlt: string;
    content: string;
  }
> = {
  "1": {
    category: "محليات",
    categoryHref: "/category/local",
    title: "مساعد وزير الخارجية لشؤون أوروبا: تطوير علاقاتنا مع السويد",
    date: "13 نوفمبر 2025",
    commentsCount: 0,
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDiLt-4_ERB89RMxttTNfhimylfqIc2GzNQlJHIGpe3O3zYfXT7wU8at0z7zIN3jK3eJ3a9AYf0S9vuPpfaH6HVeGoFNdFXKL5PW9EUWpzyzGh_wkuq0eY0-1H1h6hC5jcNNLyuAAK5jQuq1Asn0i4nuD_YpxZpjEu9fT3n-TE1OQ0yT1dQ-oYIxPvSdln9gUfbBpXtZeSBOtTQe2-w0q4yHlcWI-fsuED8I9nKzlmSZbZSmPJWUoUkwuxJcoHyG637uZ63PDiHtXBF",
    imageAlt: "Two diplomats shaking hands in a formal setting",
    content: `مساعد وزير الخارجية لشؤون أوروبا يؤكد على أهمية تطوير العلاقات الثنائية مع السويد في مختلف المجالات.

وأشار المسؤول إلى أن العلاقات بين البلدين تشهد تطورا ملحوظا على الصعيد الاقتصادي والثقافي والسياسي.

وأضاف أن هناك فرصا كبيرة للتعاون المشترك في مجالات التكنولوجيا والطاقة والتعليم.`,
  },
};

export function meta({ params }: Route.MetaArgs) {
  const article = mockArticles[params.id];

  return [
    { title: article?.title || "مقالة - القبس" },
    {
      name: "description",
      content: article?.content.substring(0, 160) || "اقرأ المزيد على القبس",
    },
  ];
}

export default function ArticlePage({ params }: Route.ComponentProps) {
  const article = mockArticles[params.id];
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <PostDetails
          category={article.category}
          categoryHref={article.categoryHref}
          title={article.title}
          date={article.date}
          commentsCount={article.commentsCount}
          imageSrc={article.imageSrc}
          imageAlt={article.imageAlt}
          content={article.content}
          registerHref="/register"
          loginHref="/login"
          relatedPostsTitle="مقالات ذات صلة"
        />
      </div>
    </div>
  );
}
