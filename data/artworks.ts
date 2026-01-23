export interface Artwork {
  id: string;
  title: string;
  description: string;
  image: string;                    // /images/artworks/xxx.jpg
  createdDate: string;               // YYYY-MM-DD 格式
  relatedCharacters?: string[];      // 角色ID数组，对应 characters.ts
  tags?: string[];                   // 可选标签
}

// 注意：画作数据现在存储在 config/artworks.config.json
// 使用 /api/artworks API 路由来获取和管理画作数据

