import { Handlers } from "$fresh/server.ts";
import { databaseLoader } from "@/communication/database.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    console.log("state:", ctx.state.user);
    if (!ctx.state.user) return new Response("Not signed in", { status: 401 });

    const data = await req.json();
   console.log({data});  
   const database = await databaseLoader.getInstance();

    const userId = ctx.state.user.userId;

    const res:any = await database.updateRoom({ ...data, userId }) ;

    return new Response(res, {
      status: 201,
    });
  },
};
