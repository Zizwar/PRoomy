import { Handlers } from "$fresh/server.ts";
import { databaseLoader } from "@/communication/database.ts";
//import { badWordsCleanerLoader } from "@/helpers/bad_words.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {  
     // const badWordsCleaner = await badWordsCleanerLoader.getInstance();
     // const name = badWordsCleaner.clean(await req.text());
     const data = (await req.json())
     const database = await databaseLoader.getInstance();
    // console.log({data})
    const roomId = await database.ensureRoom(data);

    return new Response(roomId, {
      status: 201,
    });
  },
};
