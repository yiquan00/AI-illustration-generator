// import OpenAI from "openai";

// export function getOpenAIClient() {
//   const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });

//   return openai;
// }


import Replicate from "replicate";

export function getReplicateClient() {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  return replicate;
}