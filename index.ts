import { handleHomeRoute } from "./routes/home";
import { handleLogRoute } from "./routes/log";
import { handleUserRoute } from "./routes/user";
import { matchRoute } from "./utils";

const routeHandlers = [
  { pattern: "/", method: "GET", handler: handleHomeRoute },
  { pattern: "/log", method: "POST", handler: handleLogRoute },
  { pattern: "/user/:id", method: "GET", handler: handleUserRoute },
];

const server = Bun.serve({
  port: process.env.PORT,
  async fetch(request) {
    const url = new URL(request.url);

    const matchedRoute = matchRoute(request, url, routeHandlers);

    if (matchedRoute?.handler) {
      const { handler, params, query } = matchedRoute;
      return handler(request, params, query);
    }

    return new Response("Not Found", { status: matchedRoute.status });
  },
});

console.log(`Listening on ${server.url}`);
