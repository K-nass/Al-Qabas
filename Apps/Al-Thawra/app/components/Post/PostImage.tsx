interface PostImageProps {
  src: string;
  alt: string;
}

export function PostImage({ src, alt }: PostImageProps) {
  return (
    <div className="my-6">
      <img
        alt={alt}
        className="w-full h-auto rounded-lg object-cover"
        src={src}
      />
    </div>
  );
}
