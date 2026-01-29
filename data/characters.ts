export interface Character {
  id: string;
  name: string;
  nickname?: string;
  faction: 'light' | 'dark' | 'neutral';
  image: string;
  description: string;
  details: {
    age?: string;
    occupation?: string;
    personality?: string;
    background?: string;
    [key: string]: string | undefined;
  };
  relatedCharacters?: string[];
  tags?: string[];
  createdDate: string;
}

// Helper function: Get all characters from API
export async function getCharacters(): Promise<Character[]> {
  const response = await fetch('/api/characters');
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
}
