interface CommentsDisplayProps {
  commentsCount: number;
}

export function CommentsDisplay({ commentsCount }: CommentsDisplayProps) {
  return (
    <div className="my-12 py-8 rounded- p-3">
      <div className="flex items-center justify-between mb-6 flex-row">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold" style={{ color: "var(--color-text-secondary)" }}>
            التعليقات:
          </span>
          <span className="text-2xl font-black" style={{ color: "var(--color-primary)" }}>
            {commentsCount}
          </span>
        </div>
        <button
          className="px-6 py-2 text-white rounded-md font-bold transition-colors duration-300 hover:opacity-90"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          أرسل
        </button>
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="التعليق..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          style={{ borderColor: "rgba(108, 117, 125, 0.2)" }}
          dir="rtl"
        />
      </div>
    </div>
  );
}
