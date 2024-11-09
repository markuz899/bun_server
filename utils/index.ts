const matchRoute = (request: any, url: any, routeHandlers: any) => {
  const errors: any = {};
  for (const { pattern, method, handler } of routeHandlers) {
    if (method !== request.method) {
      errors.status = 405;
      continue;
    }

    const regexPattern = new RegExp(
      "^" + pattern.replace(/:([^/]+)/g, "(?<$1>[^/]+)") + "$"
    );

    const match = url.pathname.match(regexPattern);
    if (match) {
      const params = match.groups || {};
      const query = Object.fromEntries(url.searchParams.entries());
      return { handler, params, query };
    }
    errors.status = 404;
  }
  return errors;
};

export { matchRoute };
