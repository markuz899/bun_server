export function handleUserRoute(request, params, query) {
  return new Response(`User ID: ${params.id}, Query: ${JSON.stringify(query)}`);
}
