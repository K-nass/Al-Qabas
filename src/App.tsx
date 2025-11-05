import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./contexts/ThemeContext";

const query = new QueryClient();


export default function App() {
  return (
    <QueryClientProvider client={query}>
      <ThemeProvider>
        <RouterProvider router={routes}></RouterProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
