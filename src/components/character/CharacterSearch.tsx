'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, X, Star } from 'lucide-react';
import { SearchFilters } from '@/types';
import { characterCategories } from '@/data/characters';

interface CharacterSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

export function CharacterSearch({ onSearch }: CharacterSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'newest' | 'alphabetical'>('popularity');
  const [minRating, setMinRating] = useState<number | undefined>();

  const popularTags = ['親切', '友好的', '創造的', '教育的', 'ゲーム', '哲学的', '面白い', 'ロマンチック', '冒険', 'ミステリー'];

  const handleSearch = () => {
    onSearch({
      query: query.trim() || undefined,
      category: selectedCategory,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      sortBy,
      minRating,
    });
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory(undefined);
    setSelectedTags([]);
    setSortBy('popularity');
    setMinRating(undefined);
    onSearch({ sortBy: 'popularity' });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="キャラクターを検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-muted-foreground">カテゴリ:</span>
        {characterCategories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(
              selectedCategory === category.id ? undefined : category.id
            )}
          >
            {category.icon} {category.name}
          </Badge>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-muted-foreground">タグ:</span>
        {popularTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => handleTagToggle(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="並び順" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">人気順</SelectItem>
            <SelectItem value="rating">評価順</SelectItem>
            <SelectItem value="newest">新着順</SelectItem>
            <SelectItem value="alphabetical">あいうえお順</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={minRating?.toString() || 'any'} onValueChange={(value) => setMinRating(value === 'any' ? undefined : parseInt(value))}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="最低評価" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">すべて</SelectItem>
            <SelectItem value="1">1つ星以上</SelectItem>
            <SelectItem value="2">2つ星以上</SelectItem>
            <SelectItem value="3">3つ星以上</SelectItem>
            <SelectItem value="4">4つ星以上</SelectItem>
            <SelectItem value="5">5つ星</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleSearch} className="flex-1">
          <Filter className="w-4 h-4 mr-2" />
          検索
        </Button>
        <Button onClick={clearFilters} variant="outline">
          <X className="w-4 h-4 mr-2" />
          クリア
        </Button>
      </div>
    </div>
  );
}