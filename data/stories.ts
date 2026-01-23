// 这个文件包含服务器端功能，只能在服务器组件中使用
import { readSceneContent, readSceneContentSync, readExtraContent, readExtraContentSync, listChapters, readChapterContent, extractChaptersFromNovel } from '@/lib/content';
import { scenesMetadata, extrasMetadata, mainNovelMetadata, type StoryMetadata } from './stories.metadata';

export type { StoryMetadata };

export interface Story extends StoryMetadata {
  content: string;
}

// 获取小剧场列表（带内容） - 异步版本
export async function getStories(): Promise<Story[]> {
  const stories = await Promise.all(
    scenesMetadata.map(async (meta) => ({
      ...meta,
      content: meta.contentFile ? await readSceneContent(meta.contentFile) : '内容待添加',
    }))
  );
  return stories;
}

// 获取单个小剧场 - 异步版本
export async function getStoryById(id: string): Promise<Story | undefined> {
  const meta = scenesMetadata.find(s => s.id === id);
  if (!meta) return undefined;

  return {
    ...meta,
    content: meta.contentFile ? await readSceneContent(meta.contentFile) : '内容待添加',
  };
}

// 同步版本（用于服务端渲染时的元数据）
export function getStoriesSync(): Story[] {
  return scenesMetadata.map(meta => ({
    ...meta,
    content: meta.contentFile ? readSceneContentSync(meta.contentFile) : '内容待添加',
  }));
}

// 导出元数据（可以在客户端使用）
export { scenesMetadata as stories, extrasMetadata };

// 获取番外列表（带内容） - 异步版本
export async function getExtras(): Promise<Story[]> {
  const extras = await Promise.all(
    extrasMetadata.map(async (meta) => ({
      ...meta,
      content: meta.contentFile ? await readExtraContent(meta.contentFile) : '内容待添加',
    }))
  );
  return extras;
}

// 获取单个番外 - 异步版本
export async function getExtraById(id: string): Promise<Story | undefined> {
  const meta = extrasMetadata.find(s => s.id === id);
  if (!meta) return undefined;

  return {
    ...meta,
    content: meta.contentFile ? await readExtraContent(meta.contentFile) : '内容待添加',
  };
}

// 同步版本（用于服务端渲染时的元数据）
export function getExtrasSync(): Story[] {
  return extrasMetadata.map(meta => ({
    ...meta,
    content: meta.contentFile ? readExtraContentSync(meta.contentFile) : '内容待添加',
  }));
}

// 正剧章节将单独处理
export interface MainNovel {
  title: string;
  description: string;
  chapters: {
    id: string;
    title: string;
    content: string;
    publishDate?: string;
  }[];
}

// 导出正剧元数据
export { mainNovelMetadata };

// 获取正剧章节 - 异步版本（自动从文件提取章节）
export async function getMainNovel(): Promise<MainNovel> {
  try {
    const chapters = await extractChaptersFromNovel(mainNovelMetadata.sourceFile);
    return {
      ...mainNovelMetadata,
      chapters,
    };
  } catch (error) {
    console.error('Error loading main novel:', error);
    return {
      ...mainNovelMetadata,
      chapters: [],
    };
  }
}
