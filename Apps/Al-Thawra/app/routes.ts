import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("article/:id", "routes/article.tsx"),
] satisfies RouteConfig;
