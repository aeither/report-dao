import { env } from "@/env.mjs";
import { GPT4VCompletionRequest } from "@/types/ai";
import errorHandler from "@/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import { APIError } from "openai/error";
import { ChatCompletion } from "openai/resources";

const systemPrompt = `You are a website summarizer. You are going to be provided a scraped raw data from a website from the user. use simple basic words, informal, just little bit conversational, very concise tone. don't be promotional`;

export interface TextRequestBody {
  text?: string;
}

export const config = {
  runtime: "edge",
};

async function handler(req: NextRequest) {
  const { text } = (await req.json()) as TextRequestBody;
  if (!text) throw new Error("Missing text");

  const body: GPT4VCompletionRequest = {
    model: "gpt-4-turbo-preview",
    max_tokens: 4096,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: text,
      },
    ],
  };
  console.log("🚀 ~ file: vision.ts:53 ~ handler ~ body:", body);

  let result = null;
  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    if (resp.ok) {
      const json: ChatCompletion = await resp.json();
      result = { ...json, ok: true };
    } else {
      const json: APIError = await resp.json();
      result = { ...json, ok: false };
    }
  } catch (e) {
    console.log(e);
  }

  console.log("🚀 ~ file: vision.ts:81 ~ handler ~ result:", result);
  return NextResponse.json(result);
}

export default errorHandler(handler);
