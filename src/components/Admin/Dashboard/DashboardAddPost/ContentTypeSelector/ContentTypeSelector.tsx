import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ContentType } from "../DashboardAddPost";
import { Link } from "react-router-dom";

export default function ContentTypeSelector({ type }: { type: ContentType }) {
  return (
    <Link
      to={`/admin/add-post?type=${type.name.toLowerCase().replace(/\s+/g, "-") }`}
      className="bg-[var(--bg-secondary)] p-6 rounded-lg border border-[var(--border)] flex flex-col items-center text-center hover:shadow-lg hover:border-primary transition-all duration-300 cursor-pointer"
    >
      <div className="text-primary text-5xl mb-4">
        <span className="material-icons-outlined text-5xl">
          <FontAwesomeIcon icon={type.icon} className="text-[#1ABC9C]" />
        </span>
      </div>
      <h3 className="font-semibold text-[var(--text-primary)] mb-1">{type.name}</h3>
      <p className="text-sm text-[var(--text-secondary)]">
        {type.description}
      </p>
    </Link>
  );
}
