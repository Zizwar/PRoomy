import { OpenAI } from "openai";

export default class Gpt {
  #openAI: OpenAI;

  constructor() {
    this.#openAI = new OpenAI(Deno.env.get("KEY_OPEN_AI") ?? "");
  }
  async searchVector(term: string) {
    const promptSys = `I'm using postgressql databases in supabase, and I'm searching them like this: full text search What I want is when I give you any search term or word, you convert it into keywords to put in full text search Just give me the words, don't explain to me, correct the words if there are misspellings - 'I am looking for an old model Airbuxon phone. I want to buy it for my grandmother, c90 model, Can you help me?' - The result is similar to the following '"#tel | #Ericsson | #Model | #Old | #c90"', other exemple in arabic:-"اعطني من فضلك موضوع عن الدار البيضاء"- the result is similar to the following:-#الدار_البيضاء |#موضوع- my words are:`;
    const messages = [
      { role: "system", content: promptSys },
      { role: "user", content: term //+'.رد علي بثل هذه الصيغة: #جافا_سكريبت | #الدار_البيضاء | #هاتف_سامسونج'
    },
    ];
    return await this.gpt(messages);
  }

  async gpt(messages: any) {
    const chatCompletion = await this.#openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });
    console.log({chatCompletion});
    const choices = chatCompletion?.choices;
    const text = choices[0]?.message.content;
    return text;
  }
}
