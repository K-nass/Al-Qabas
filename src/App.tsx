import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthRefresh } from "./hooks/useAuthRefresh";
import { LanguageProvider } from "./contexts/LanguageContext";

const query = new QueryClient();

function AppContent() {
  const { isLoading } = useAuthRefresh();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={query}>
      <RouterProvider router={routes}></RouterProvider>
    </QueryClientProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
