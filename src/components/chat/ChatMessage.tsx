'use client';

import { ChatMessage as ChatMessageType } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: ChatMessageType;
  characterName?: string;
  characterAvatar?: string;
}

export function ChatMessage({ message, characterName, characterAvatar }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <Avatar className="w-8 h-8">
          <AvatarImage src={characterAvatar} alt={characterName} />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
            {characterName?.charAt(0) || 'C'}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "max-w-[70%] rounded-lg px-4 py-2",
        isUser 
          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
          : "bg-muted text-foreground"
      )}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <div className={cn(
          "text-xs mt-1 opacity-70",
          isUser ? "text-purple-100" : "text-muted-foreground"
        )}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
      
      {isUser && (
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white text-xs">
            U
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}