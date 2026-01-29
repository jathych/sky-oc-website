export interface Artwork {
  id: string;
  title: string;
  description: string;
  image: string;                    // /images/artworks/xxx.jpg
  createdDate: string;               // YYYY-MM-DD 格式
  relatedCharacters?: string[];      // 角色ID数组，对应 characters.ts
  tags?: string[];                   // 可选标签
}

export const artworks: Artwork[] = [
  {
    id: 'mermaid-legend',
    title: '人鱼传说',
    description: '一幅描绘人鱼在深海中的神秘场景，展现了人鱼优雅的身姿和神秘的海底世界',
    image: '/images/artworks/人鱼传说.jpg',
    createdDate: '2024-01-15',
    relatedCharacters: ['liehewei', 'princess'],
    tags: ['奇幻', '海洋', '传说']
  },
  {
    id: 'mermaid-legend',
    title: '人鱼传说',
    description: '一幅描绘人鱼在深海中的神秘场景，展现了人鱼优雅的身姿和神秘的海底世界',
    image: '/images/artworks/人鱼传说.jpg',
    createdDate: '2024-01-15',
    relatedCharacters: ['liehewei', 'princess'],
    tags: ['奇幻', '海洋', '传说']
  },
  // 用户可以在这里添加更多画作
  // 示例：
  // {
  //   id: 'artwork-2',
  //   title: '画作标题',
  //   description: '画作描述',
  //   image: '/images/artworks/文件名.jpg',
  //   createdDate: '2024-02-01',
  //   relatedCharacters: ['character-id'],
  //   tags: ['标签1', '标签2']
  // },
];

// 根据ID获取画作
export function getArtworkById(id: string): Artwork | undefined {
  return artworks.find(artwork => artwork.id === id);
}

// 获取所有画作（按日期排序）
export function getAllArtworks(): Artwork[] {
  return [...artworks].sort((a, b) =>
    new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );
}

// 根据角色ID获取相关画作
export function getArtworksByCharacter(characterId: string): Artwork[] {
  return artworks.filter(artwork =>
    artwork.relatedCharacters?.includes(characterId)
  );
}
