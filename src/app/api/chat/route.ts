import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getCharacterPersonalityPrompt } from '@/utils/characterWelcomeMessages';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { messages, character } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // キャラクターのコンテキストを含むシステムメッセージを作成
    const systemMessage = {
      role: 'system' as const,
      content: character ? 
        getCharacterPersonalityPrompt(character) :
        'あなたは親切なAIアシスタントです。フレンドリーで魅力的な日本語で応答してください。'
    };

    // OpenAI APIにリクエストを送信
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // GPT-4.1 miniを使用
      messages: [systemMessage, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error('No response from OpenAI');
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}