export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  credits: number;
  membershipType: 'free' | 'premium';
  createdAt: Date;
  updatedAt: Date;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  avatar: string;
  personality: string;
  category: string;
  tags: string[];
  popularity: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  speakingStyle: 'polite' | 'formal' | 'casual' | 'dreamy' | 'teacher' | 'energetic' | 'kawaii' | 'victorian';
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'character';
  timestamp: Date;
  characterId?: string;
  userId?: string;
}

export interface ChatSession {
  id: string;
  userId: string;
  characterId: string;
  messages: ChatMessage[];
  creditsUsed: number;
  startedAt: Date;
  lastMessageAt: Date;
  isActive: boolean;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'purchase' | 'usage' | 'refund';
  description: string;
  timestamp: Date;
}

export interface CharacterCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  characterCount: number;
}

export interface SearchFilters {
  category?: string;
  tags?: string[];
  minRating?: number;
  sortBy?: 'popularity' | 'rating' | 'newest' | 'alphabetical';
  query?: string;
}

export interface UserPreferences {
  userId: string;
  favoriteCharacters: string[];
  recentCharacters: string[];
  preferredCategories: string[];
  notificationSettings: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}