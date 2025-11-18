import type { Route } from "./+types/profile";
import { Profile } from "../components/Profile";
import { requireAuth, getCurrentUserFromRequest } from "~/lib/protectedRoute";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "الملف الشخصي - الثورة" },
    { name: "description", content: "عرض الملف الشخصي والدورات المشتراة" },
  ];
}

// Loader to protect the route
export async function loader({ request }: Route.LoaderArgs) {
  // Check authentication - will redirect to /login if not authenticated
  requireAuth(request);
  
  // Get current user from request cookies
  const user = getCurrentUserFromRequest(request);
  
  return { user };
}

export default function ProfilePage() {
  return <Profile />;
}
