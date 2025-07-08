'use client';

import { useState, useEffect } from 'react';
import { Character, SearchFilters } from '@/types';
import { mockCharacters } from '@/data/characters';
import { CharacterSearch } from '@/components/character/CharacterSearch';
import { CharacterSection } from '@/components/character/CharacterSection';
import { CharacterCreateForm } from '@/components/character/CharacterCreateForm';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubscriptionButton } from '@/components/payment/SubscriptionButton';
import { Coins, MessageCircle, Home as HomeIcon, Plus, Search } from 'lucide-react';

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [userCredits, setUserCredits] = useState(50);
  const [currentView, setCurrentView] = useState<'browse' | 'chat' | 'search' | 'create'>('browse');
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [userCreatedCharacters, setUserCreatedCharacters] = useState<Character[]>([]);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setCurrentView('chat');
  };

  const handleBack = () => {
    setCurrentView('browse');
    setSelectedCharacter(null);
  };

  const handleSearch = (filters: SearchFilters) => {
    let filtered = allCharacters;

    if (filters.query) {
      filtered = filtered.filter(char =>
        char.name.toLowerCase().includes(filters.query!.toLowerCase()) ||
        char.description.toLowerCase().includes(filters.query!.toLowerCase()) ||
        char.tags.some(tag => tag.toLowerCase().includes(filters.query!.toLowerCase()))
      );
    }

    if (filters.category) {
      filtered = filtered.filter(char => 
        char.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(char =>
        filters.tags!.some(tag => char.tags.includes(tag))
      );
    }

    if (filters.minRating) {
      filtered = filtered.filter(char => char.rating >= filters.minRating!);
    }

    if (filters.sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (filters.sortBy) {
          case 'popularity':
            return b.popularity - a.popularity;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return b.createdAt.getTime() - a.createdAt.getTime();
          case 'alphabetical':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
    }

    setSearchResults(filtered);
    setCurrentView('search');
  };

  const handleBackToHome = () => {
    setCurrentView('browse');
    setSearchResults([]);
  };

  const handleCreateCharacter = (characterData: Omit<Character, 'id' | 'popularity' | 'rating' | 'createdAt' | 'updatedAt' | 'isActive'>) => {
    const newCharacter: Character = {
      ...characterData,
      id: Date.now().toString(),
      popularity: 0,
      rating: 5.0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };
    
    setUserCreatedCharacters(prev => {
      const updated = [...prev, newCharacter];
      // ローカルストレージに保存
      localStorage.setItem('userCreatedCharacters', JSON.stringify(updated));
      return updated;
    });
    setCurrentView('browse');
  };

  // ページ読み込み時にローカルストレージからキャラクターを復元
  useEffect(() => {
    const saved = localStorage.getItem('userCreatedCharacters');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserCreatedCharacters(parsed.map((char: Character) => ({
          ...char,
          createdAt: new Date(char.createdAt),
          updatedAt: new Date(char.updatedAt),
        })));
      } catch (error) {
        console.error('Failed to load saved characters:', error);
      }
    }
  }, []);

  const handleCreditUpdate = (credits: number) => {
    setUserCredits(credits);
  };

  if (currentView === 'chat' && selectedCharacter) {
    return (
      <div className="h-screen bg-gray-900">
        <div className="h-full max-w-4xl mx-auto p-4">
          <Card className="h-full bg-gray-800 border-gray-700">
            <ChatInterface
              character={selectedCharacter}
              onBack={handleBack}
              userCredits={userCredits}
              onCreditUpdate={handleCreditUpdate}
            />
          </Card>
        </div>
      </div>
    );
  }

  const allCharacters = [...mockCharacters, ...userCreatedCharacters];
  const recentCharacters = allCharacters.filter(char => ['1', '2', '3', '4', '5', '6'].includes(char.id) || userCreatedCharacters.includes(char));
  const recommendedCharacters = allCharacters.filter(char => ['7', '8', '1', '2'].includes(char.id));

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 z-10">
        <div className="mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <button 
            onClick={handleBackToHome}
            className={`p-3 rounded-lg transition-colors ${
              currentView === 'browse' 
                ? 'text-white bg-gray-700' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <HomeIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentView('create')}
            className={`p-3 rounded-lg transition-colors ${
              currentView === 'create' 
                ? 'text-white bg-gray-700' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Plus className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentView('search')}
            className={`p-3 rounded-lg transition-colors ${
              currentView === 'search' 
                ? 'text-white bg-gray-700' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Search className="w-5 h-5" />
          </button>
          <button className="p-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-16">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 px-6 py-4 z-20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">character.ai</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                  ✨ 新しくて高速なCharacter.AIが登場！
                </span>
                <SubscriptionButton size="sm" className="bg-blue-600 hover:bg-blue-700">
                  今すぐ試す
                </SubscriptionButton>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                <Coins className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold text-white">{userCredits}</span>
                <span className="text-sm text-gray-400">クレジット</span>
              </div>
              <SubscriptionButton className="bg-blue-600 hover:bg-blue-700">
                c.ai+を取得
              </SubscriptionButton>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {currentView === 'create' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">キャラクター作成</h2>
                <Button 
                  onClick={handleBackToHome}
                  variant="outline" 
                  size="sm"
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  ホームに戻る
                </Button>
              </div>
              
              <CharacterCreateForm 
                onSave={handleCreateCharacter}
                onCancel={handleBackToHome}
              />
            </div>
          ) : currentView === 'search' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">キャラクター検索</h2>
                <Button 
                  onClick={handleBackToHome}
                  variant="outline" 
                  size="sm"
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  ホームに戻る
                </Button>
              </div>
              
              <CharacterSearch onSearch={handleSearch} />
              
              {searchResults.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      検索結果 ({searchResults.length}件)
                    </h3>
                  </div>
                  <CharacterSection
                    title=""
                    characters={searchResults}
                    onCharacterSelect={handleCharacterSelect}
                  />
                </div>
              )}
              
              {searchResults.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-white mb-2">キャラクターが見つかりません</h3>
                  <p className="text-gray-400">検索フィルターを調整してみてください</p>
                </div>
              )}
            </div>
          ) : (
            <>
              {userCreatedCharacters.length > 0 && (
                <CharacterSection
                  title="あなたが作成したキャラクター"
                  characters={userCreatedCharacters.slice(0, 6)}
                  onCharacterSelect={handleCharacterSelect}
                />
              )}
              
              <CharacterSection
                title="会話を続ける"
                characters={recentCharacters.slice(0, 6)}
                onCharacterSelect={handleCharacterSelect}
              />

              <CharacterSection
                title="おすすめ"
                characters={recommendedCharacters.slice(0, 6)}
                onCharacterSelect={handleCharacterSelect}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
