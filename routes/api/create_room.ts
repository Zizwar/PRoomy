import { Handlers } from "$fresh/server.ts";
import { databaseLoader } from "@/communication/database.ts";
import { getCookies } from "$std/http/cookie.ts";
//import { badWordsCleanerLoader } from "@/helpers/bad_words.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {  
    const accessToken = getCookies(req.headers)["roomy_prompt_token"];
    if (!accessToken) {
      return new Response("Not signed in", { status: 401 });
    }

   

     // const badWordsCleaner = await badWordsCleanerLoader.getInstance();
     // const name = badWordsCleaner.clean(await req.text());
     const data = (await req.json())
     const database = await databaseLoader.getInstance();
     const user = await database.getUserByAccessTokenOrThrow(accessToken);
     const userId = user?.userId;
    // console.log({data})
    
    const roomId = await database.ensureRoom({...data,userId});
 
    return new Response(roomId, {
      status: 201,
    });
  },
};
