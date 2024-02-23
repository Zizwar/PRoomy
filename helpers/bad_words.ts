import { badWordsLsit } from "@/helpers/bad_words_list.ts";

export const cleanBadWors = (text: string) => {
  // very basic for now
  return text;  
  let lowercaseText = text.toLowerCase();
  for (const word of badWordsLsit) {
    const index = lowercaseText.indexOf(word);
    if (index >= 0) {
      text =
        text.substring(0, index) +
        "*".repeat(word.length) +
        text.substring(index + word.length);
      lowercaseText = text.toLowerCase();
    }
  }

};
