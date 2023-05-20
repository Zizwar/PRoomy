import { getCookies } from "$std/http/cookie.ts";
import { databaseLoader } from "@/communication/database.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";

export const handler = async (req: Request, ctx: MiddlewareHandlerContext) => {


  const accessToken = getCookies(req.headers)["roomy_prompt_token"];
  if (!accessToken)  return ctx.next();

  const database = await databaseLoader.getInstance();
  const user = await database.getUserByAccessToken(accessToken);
 if (!user) return ctx.next();

  ctx.state.user = user;
  return ctx.next();
};
