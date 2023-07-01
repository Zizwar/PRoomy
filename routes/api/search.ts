import { Handlers } from "$fresh/server.ts";
import { OpenAI } from "openai";
import { databaseLoader } from "@/communication/database.ts";
import Gpt from "@/communication/gpt.ts";
export const handler: Handlers = {
  async GET(req, ctx) {
    //  const prompt = await req.text();

    //////
    const url = new URL(req.url);
    // const q = ctx.params.q
    const term = url.searchParams.get("term");
    if (!term)
      return new Response(JSON.stringify({ message: "Term is empty" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    const gpt = new Gpt();
    const keywords = await gpt.searchVector(term);
    console.log({ keywords });

    const database = await databaseLoader.getInstance();
    const resault = await database.searchVector(keywords);
    console.log({ resault });
    //

    //
    return new Response(JSON.stringify(resault), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    //////
    /*
    const completion = await openAI.createCompletion({
      model: "davinci",
      prompt: "what about in morocco",
    }) ;
    */
    //console.log(completion.choices);
  },
};
