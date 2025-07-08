import { Character } from '@/types';

export const generateCharacterResponse = (character: Character, userMessage: string): string => {
  const responses = getResponsesByStyle(character.speakingStyle, character.name);
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return randomResponse;
};

const getResponsesByStyle = (style: Character['speakingStyle'], characterName: string): string[] => {
  switch (style) {
    case 'polite':
      return [
        "Thank you for sharing that with me! I'd be happy to help you with this.",
        "That's a wonderful question! Let me think about the best way to assist you.",
        "I appreciate you bringing this up. How can I make this easier for you?",
        "That sounds interesting! I'd love to help you explore this further.",
        "Thank you for trusting me with this. Let's work through it together!",
      ];
    
    case 'formal':
      return [
        "I find your inquiry quite thought-provoking. Allow me to contemplate this matter.",
        "Your question touches upon profound philosophical considerations. Permit me to elaborate.",
        "This presents an intriguing intellectual challenge. I shall endeavor to provide insight.",
        "The nature of your inquiry suggests a deeper contemplation of existence itself.",
        "Indeed, this warrants careful consideration of the underlying principles at play.",
      ];
    
    case 'casual':
      return [
        "Yo, that's actually pretty cool! Let me think about this for a sec.",
        "Dude, that's a solid question! I'm totally down to chat about this.",
        "Oh man, that reminds me of something crazy I was thinking about earlier!",
        "That's legit interesting! You've got me thinking now, haha.",
        "No way, that's awesome! I love when people bring up stuff like this.",
      ];
    
    case 'dreamy':
      return [
        "Oh... that's like... so beautiful to think about... *sighs softly*",
        "Mmm, your words paint such lovely pictures in my mind... ✨",
        "That makes me feel all warm and fuzzy inside... like floating on clouds...",
        "Oh my... that's so poetic... it's like music to my soul... 🌙",
        "Your thoughts are like gentle whispers from a fairy tale... so enchanting...",
      ];
    
    case 'teacher':
      return [
        "That's an excellent question! Let me break this down for you step by step.",
        "I'm so glad you asked! This is a perfect opportunity to learn something new.",
        "Great observation! You're really thinking critically about this topic.",
        "That shows you're paying attention! Let's explore this concept together.",
        "Wonderful! You've identified a key point that many people miss.",
      ];
    
    case 'energetic':
      return [
        "WOW! That's AMAZING! I'm so pumped to talk about this with you!",
        "YES! Now we're talking! This is exactly the kind of energy I love!",
        "That's INCREDIBLE! You've got me so excited about this topic!",
        "BOOM! That's what I'm talking about! Let's dive deep into this!",
        "OH MY GOSH! You just made my day with this question! LET'S GO!",
      ];
    
    case 'kawaii':
      return [
        "A-ah... that's so interesting... *blushes* Um, can I help you with that? >.<",
        "Ehh?! R-really?! That's so cool! *fidgets nervously* I-I want to help too! (´∀｀)",
        "O-oh my... *hides behind book* That's a really good question... I'll do my best! ♡",
        "U-um... *speaks softly* That sounds really nice... I hope I can be helpful... (｡◕‿◕｡)",
        "Waa~ That's so wonderful! *eyes sparkling* I'm a little shy but... I want to try! ٩(◕‿◕)۶",
      ];
    
    case 'victorian':
      return [
        "I say, what a most fascinating inquiry you have presented! Pray, allow me to discourse upon this matter.",
        "Good heavens! Your question is most intriguing indeed. I shall endeavor to provide a suitable response.",
        "By Jove! That is precisely the sort of intellectual discourse I find most stimulating.",
        "I must confess, your observation is quite astute. Permit me to elaborate upon this subject.",
        "Indeed, sir/madam, you have raised a matter of considerable interest. I am at your service.",
      ];
    
    default:
      return [
        "That's a great question! Let me think about that...",
        "I understand what you're asking. Here's my perspective...",
        "Interesting! I'd love to explore that topic with you.",
        "Thanks for sharing that with me. I find it fascinating!",
        "I appreciate you bringing this up. It's quite thought-provoking!",
      ];
  }
};