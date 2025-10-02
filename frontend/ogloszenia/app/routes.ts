import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("/login","routes/login.tsx"),
     route("/register", "routes/register.tsx"),
     route("/add", "routes/createPost.tsx"),
     route("/p/:id", "routes/post.tsx")
    ] satisfies RouteConfig;