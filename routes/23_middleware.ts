import { getCookies } from "$std/http/cookie.ts";
import * as supabase from "supabase";
import { MiddlewareHandlerContext } from "$fresh/server.ts";

export const authenticateUser = async (req: Request, ctx: MiddlewareHandlerContext) => {
  const authData = await getAuthData(req);
  if (!authData.access_token) {
    // The user is not authenticated.
    return ctx.next();
  }

  const { data } = await supabase.auth.getUser(authData.access_token);
  if (!data.user) {
    // The user does not exist.
    return ctx.next();
  }

  ctx.state.user = {
    id: data.user.id,
    email: data.user.email,
    name: data.user.user_metadata?.full_name,
    avatar_url: data.user.user_metadata?.avatar_url,
    providers: data.user.app_metadata?.providers,
    access_token,
  };

  return ctx.next();
};

async function getAuthData(req: Request) {
  const cookies = getCookies(req.headers);
  const access_token = cookies["supabase-access-token"];
  return { access_token };
}
