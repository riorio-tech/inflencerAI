'use client';

import { Character } from '@/types';
import { CharacterCard } from './CharacterCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface CharacterSectionProps {
  title: string;
  characters: Character[];
  onCharacterSelect: (character: Character) => void;
}

export function CharacterSection({ title, characters, onCharacterSelect }: CharacterSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollLeft}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollRight}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {characters.map((character) => (
            <div key={character.id} className="flex-shrink-0 w-80">
              <CharacterCard
                character={character}
                onSelect={onCharacterSelect}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}