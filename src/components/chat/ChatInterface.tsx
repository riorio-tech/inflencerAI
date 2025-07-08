'use client';

import { useState, useEffect, useRef } from 'react';
import { Character, ChatMessage as ChatMessageType } from '@/types';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { getCharacterWelcomeMessage } from '@/utils/characterWelcomeMessages';
import { ArrowLeft, Coins } from 'lucide-react';

interface ChatInterfaceProps {
  character: Character;
  onBack: () => void;
  userCredits: number;
  onCreditUpdate: (credits: number) => void;
}

export function ChatInterface({ character, onBack, userCredits, onCreditUpdate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcomeMessage: ChatMessageType = {
      id: '1',
      content: getCharacterWelcomeMessage(character),
      sender: 'character',
      timestamp: new Date(),
      characterId: character.id,
    };
    setMessages([welcomeMessage]);
  }, [character]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (userCredits <= 0) {
      alert('クレジットが不足しています！チャットを続けるにはクレジットを購入してください。');
      return;
    }

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      userId: 'user-1',
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    onCreditUpdate(userCredits - 1);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content,
          })),
          character,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const characterMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'character',
        timestamp: new Date(),
        characterId: character.id,
      };

      setMessages(prev => [...prev, characterMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        content: '申し訳ございません。エラーが発生しました。もう一度お試しください。',
        sender: 'character',
        timestamp: new Date(),
        characterId: character.id,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Avatar className="w-10 h-10">
            <AvatarImage src={character.avatar} alt={character.name} />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              {character.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <CardTitle className="text-lg">{character.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {character.category}
              </Badge>
              <div className="flex items-center gap-1">
                <Coins className="w-3 h-3 text-yellow-500" />
                <span className="text-sm font-medium">{userCredits}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              characterName={character.name}
              characterAvatar={character.avatar}
            />
          ))}
          {isLoading && (
            <div className="flex gap-3 mb-4">
              <Avatar className="w-8 h-8">
                <AvatarImage src={character.avatar} alt={character.name} />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                  {character.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
        
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={userCredits <= 0}
          isLoading={isLoading}
        />
      </CardContent>
    </div>
  );
}