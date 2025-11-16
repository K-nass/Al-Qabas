import { useState } from "react";
import { Play, Share2, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/tv";
import { videoService, type Video } from "../services/videoService";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "التلفزيون - الثورة" },
    { name: "description", content: "شاهد أحدث البرامج والحلقات التلفزيونية" },
  ];
}

// Loader function for server-side data fetching
export async function loader() {
  try {
    // Load all videos in parallel
    const [featured, recommended, political, cultural, sports, health] = await Promise.all([
      videoService.getFeaturedVideo(),
      videoService.getRecommendedVideos(15),
      videoService.getVideosByCategory('political', { pageSize: 15 }),
      videoService.getVideosByCategory('cultural', { pageSize: 15 }),
      videoService.getVideosByCategory('sports', { pageSize: 15 }),
      videoService.getVideosByCategory('health', { pageSize: 15 }),
    ]);

    return {
      featuredVideo: featured,
      relatedVideos: recommended,
      politicalPrograms: political.items,
      culturalPrograms: cultural.items,
      sportsPrograms: sports.items,
      healthPrograms: health.items,
    };
  } catch (error: any) {
    console.error('Error loading videos:', error.response?.data || error.message);
    // Return empty data on error
    return {
      featuredVideo: null,
      relatedVideos: [],
      politicalPrograms: [],
      culturalPrograms: [],
      sportsPrograms: [],
      healthPrograms: [],
    };
  }
}

export default function TVPage() {
  // Get data from loader
  const { featuredVideo: initialFeatured, relatedVideos, politicalPrograms, culturalPrograms, sportsPrograms, healthPrograms } = useLoaderData<typeof loader>();
  
  // Create array of all videos (featured + related)
  const allVideos = initialFeatured ? [initialFeatured, ...relatedVideos] : relatedVideos;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentRelatedIndex, setCurrentRelatedIndex] = useState(0);

  // Current featured video
  const featuredVideo = allVideos[currentVideoIndex];

  const nextVideo = () => {
    if (currentVideoIndex < allVideos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const prevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  const nextRelated = () => {
    if (currentRelatedIndex < relatedVideos.length - 4) {
      setCurrentRelatedIndex(currentRelatedIndex + 1);
    }
  };

  const prevRelated = () => {
    if (currentRelatedIndex > 0) {
      setCurrentRelatedIndex(currentRelatedIndex - 1);
    }
  };

  if (!featuredVideo) {
    return (
      <div className="container mx-auto px-0.5 py-8 max-w-7xl">
        <div className="text-center py-12">
          <p className="text-gray-500">لا توجد فيديوهات متاحة</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-0.5 py-8 max-w-7xl">
      <div className="space-y-8">
      {/* Featured Episode - Video on Right, Details on Left */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Details - Left Side (1/3 width) */}
        <div className="lg:col-span-1 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white flex flex-col justify-between">
          <div>
            {/* Category Badge */}
            <span className="inline-block px-3 py-1 bg-[var(--color-primary)] text-white text-xs font-medium rounded-full mb-4">
              {featuredVideo.categoryName || 'برامج'}
            </span>

            {/* Title */}
            <h1 className="text-2xl font-bold mb-3 leading-tight">
              {featuredVideo.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-200 mb-4 leading-relaxed">
              {featuredVideo.summary || featuredVideo.content?.substring(0, 100)}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-3 text-gray-300 text-sm mb-6 pb-6 border-b border-gray-700">
              <span>{new Date(featuredVideo.publishedAt || featuredVideo.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>{featuredVideo.duration || '00:00'}</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-xl transition-all duration-300 font-bold shadow-lg">
                <Play className="w-5 h-5 fill-current" />
                <span>مشاهدة الآن</span>
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 backdrop-blur-sm">
                <Share2 className="w-5 h-5" />
                <span>مشاركة</span>
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 pt-6 border-t border-gray-700">
            <button 
              onClick={prevVideo}
              disabled={currentVideoIndex === 0}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <span className="text-sm text-gray-400">
              {currentVideoIndex + 1} / {allVideos.length}
            </span>
            <button 
              onClick={nextVideo}
              disabled={currentVideoIndex === allVideos.length - 1}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Video Player - Right Side (2/3 width) */}
        <div className="lg:col-span-2">
          <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
            <img
              src={featuredVideo.videoThumbnailUrl || 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1200&h=600&fit=crop'}
              alt={featuredVideo.title}
              className="w-full h-full object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer group">
              <div className="w-20 h-20 rounded-full bg-[var(--color-primary)] flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                <Play className="w-10 h-10 text-white fill-current ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Videos Section */}
      <CategorySection
        title="حلقات ذات صلة"
        subtitle="المزيد من حلقات البرنامج"
        videos={relatedVideos}
        categorySlug="related"
      />

      {/* Political Programs Section */}
      <CategorySection
        title="برامج سياسية"
        videos={politicalPrograms}
        categorySlug="political"
      />

      {/* Cultural Programs Section */}
      <CategorySection
        title="برامج ثقافية"
        videos={culturalPrograms}
        categorySlug="cultural"
      />

      {/* Sports Programs Section */}
      <CategorySection
        title="برامج رياضية"
        videos={sportsPrograms}
        categorySlug="sports"
      />

      {/* Health Programs Section */}
      <CategorySection
        title="برامج صحية"
        videos={healthPrograms}
        categorySlug="health"
      />

      {/* Load More Button */}
      <div className="flex justify-center pt-8">
        <button className="px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-xl transition-all duration-300 hover:scale-105 font-bold shadow-lg">
          تحميل المزيد من البرامج
        </button>
      </div>
      </div>
    </div>
  );
}

function CategorySection({ 
  title, 
  subtitle, 
  videos,
  categorySlug
}: { 
  title: string; 
  subtitle?: string; 
  videos: Video[];
  categorySlug?: string;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center">
        {categorySlug && (
          <Link 
            to={`/tv/category/${categorySlug}`}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-[var(--color-primary)] transition-colors" />
          </Link>
        )}
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mr-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[var(--color-text-secondary)] mr-2">
            {subtitle}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

function VideoCard({ video }: { video: Video }) {
  return (
    <div className="group cursor-pointer">
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-gray-200">
        <img
          src={video.videoThumbnailUrl || 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=250&fit=crop'}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
            <Play className="w-6 h-6 text-white fill-current ml-1" />
          </div>
        </div>
        {/* Duration Badge */}
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
          {video.duration || '00:00'}
        </div>
      </div>

      {/* Info */}
      <div>
        <h3 className="font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
          {video.title}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-2 line-clamp-2">
          {video.summary || video.content?.substring(0, 100)}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{new Date(video.publishedAt || video.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
}
