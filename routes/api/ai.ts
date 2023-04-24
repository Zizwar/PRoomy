import { Handlers } from "$fresh/server.ts";
import { OpenAI } from "openai";

export const handler: Handlers = {
  async GET(_req, _ctx) {
  //  const prompt = await req.text();
    const openAI = new OpenAI("KEY_OPEN_AI");

    const completion = await openAI.createCompletion({
      model: "davinci",
      prompt: "The meaning of life is",
    }) ;
    
    console.log(completion.choices);
    return new Response(JSON.stringify( completion), {
      status: 200,
    });
  },
};



