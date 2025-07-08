'use client';

import { Character } from '@/types';
import { CharacterCard } from './CharacterCard';

interface CharacterGridProps {
  characters: Character[];
  onCharacterSelect: (character: Character) => void;
}

export function CharacterGrid({ characters, onCharacterSelect }: CharacterGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onSelect={onCharacterSelect}
        />
      ))}
    </div>
  );
}