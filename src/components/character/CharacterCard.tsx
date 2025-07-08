'use client';

import { Character } from '@/types';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
}

export function CharacterCard({ character, onSelect }: CharacterCardProps) {
  const handleStartChat = () => {
    onSelect(character);
  };

  return (
    <Card 
      className={cn(
        "w-full bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 cursor-pointer group",
        "hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
      )}
      onClick={handleStartChat}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="relative">
            <Avatar className="w-16 h-16 border-2 border-gray-600 group-hover:border-purple-500 transition-colors">
              <AvatarImage src={character.avatar} alt={character.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-lg font-bold">
                {character.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-gray-800"></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-white truncate">{character.name}</h3>
              <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                {character.category}
              </Badge>
            </div>
            
            <CardDescription className="text-sm text-gray-400 mb-3 line-clamp-2">
              {character.description}
            </CardDescription>
            
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                <span>{character.popularity}k</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>Active now</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-3">
              {character.tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="text-xs border-gray-600 text-gray-400 hover:border-purple-500 hover:text-purple-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}