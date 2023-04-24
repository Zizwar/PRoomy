import { Handler } from "$fresh/server.ts";

export const handler: Handler = (): Response => {
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", Deno.env.get("GOOGLE_CLIENT_ID") || "");
  url.searchParams.set("redirect_uri", Deno.env.get("REDIRECT_URI") || "");
  url.searchParams.set(
    "scope",
    "https://www.googleapis.com/auth/userinfo.email"
  );
  url.searchParams.set("response_type", "code");
  return Response.redirect(url, 302);
};
