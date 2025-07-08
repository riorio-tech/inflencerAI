'use client';

import { useState } from 'react';
import { Character } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { characterCategories } from '@/data/characters';
import { Plus, X, Save } from 'lucide-react';

interface CharacterCreateFormProps {
  onSave: (character: Omit<Character, 'id' | 'popularity' | 'rating' | 'createdAt' | 'updatedAt' | 'isActive'>) => void;
  onCancel: () => void;
}

export function CharacterCreateForm({ onSave, onCancel }: CharacterCreateFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    personality: '',
    category: '',
    tags: [] as string[],
    speakingStyle: 'polite' as Character['speakingStyle'],
    avatar: '/avatars/default.png',
  });
  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const speakingStyles = [
    { value: 'polite', label: '丁寧' },
    { value: 'formal', label: 'フォーマル' },
    { value: 'casual', label: 'カジュアル' },
    { value: 'dreamy', label: '夢見がち' },
    { value: 'teacher', label: '先生風' },
    { value: 'energetic', label: 'エネルギッシュ' },
    { value: 'kawaii', label: 'かわいい' },
    { value: 'victorian', label: 'ヴィクトリア朝' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'キャラクター名は必須です';
    }
    if (!formData.description.trim()) {
      newErrors.description = '説明は必須です';
    }
    if (!formData.personality.trim()) {
      newErrors.personality = '性格は必須です';
    }
    if (!formData.category) {
      newErrors.category = 'カテゴリは必須です';
    }
    if (formData.tags.length === 0) {
      newErrors.tags = '最低1つのタグを追加してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white">新しいキャラクターを作成</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* キャラクター名 */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              キャラクター名 <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="例: あかり"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* 説明 */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              説明 <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="例: 明るくて親しみやすいAIアシスタント。日常のお手伝いが大好きです。"
              rows={3}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* 性格 */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              性格・特徴 <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={formData.personality}
              onChange={(e) => setFormData(prev => ({ ...prev, personality: e.target.value }))}
              placeholder="例: 楽観的で親切、いつでも手を貸したがる性格。温かい人柄で、会話を楽しく軽やかにするのが得意です。"
              rows={4}
              className={errors.personality ? 'border-red-500' : ''}
            />
            {errors.personality && <p className="text-red-500 text-sm mt-1">{errors.personality}</p>}
          </div>

          {/* カテゴリ */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              カテゴリ <span className="text-red-500">*</span>
            </label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                <SelectValue placeholder="カテゴリを選択" />
              </SelectTrigger>
              <SelectContent>
                {characterCategories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          {/* 話し方スタイル */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              話し方スタイル
            </label>
            <Select value={formData.speakingStyle} onValueChange={(value: Character['speakingStyle']) => setFormData(prev => ({ ...prev, speakingStyle: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="話し方を選択" />
              </SelectTrigger>
              <SelectContent>
                {speakingStyles.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* タグ */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              タグ <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="タグを入力"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:bg-gray-600 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
          </div>

          {/* ボタン */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              キャラクターを作成
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              キャンセル
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}