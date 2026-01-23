// 这个文件只包含元数据，不依赖任何服务器端模块
// 可以安全地在客户端组件中使用

export interface StoryMetadata {
  id: string;
  title: string;
  type: 'scene' | 'extra' | 'main';
  order?: number;
  description: string;
  contentFile?: string;
  publishDate?: string;
}

// 小剧场元数据（短小的日常互动片段）
export const scenesMetadata: StoryMetadata[] = [];

// 番外元数据（完整的长篇故事）
export const extrasMetadata: StoryMetadata[] = [
  {
    id: 'extra-mermaid',
    title: '人鱼传说',
    type: 'extra',
    description: '一个关于人鱼的奇幻故事',
    contentFile: '人鱼传说.txt',
  },
  {
    id: 'extra-goddess',
    title: '神女与她虔诚的信徒',
    type: 'extra',
    description: '神女与信徒的故事',
    contentFile: '神女与她虔诚的信徒.txt',
  },
  {
    id: 'extra-redwolf',
    title: '小红狼与大灰帽',
    type: 'extra',
    description: '颠倒的童话故事',
    contentFile: '小红狼与大灰帽.txt',
  },
];

// 正剧配置
export const mainNovelMetadata = {
  title: '光与影的旅程',
  description: '箬笠与公主在光之子与暗之子对立的世界中，寻找真相与自我的冒险故事。',
  sourceFile: '正剧.txt',
};
