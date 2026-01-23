'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { characters } from '@/data/characters';
import { scenesMetadata as stories } from '@/data/stories.metadata';
import { Suspense } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // Search logic
  const searchCharacters = characters.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.nickname?.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase())
  );

  const searchStories = stories.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.description.toLowerCase().includes(query.toLowerCase())
  );

  // 注意：章节搜索移除了，因为需要异步加载
  // 如果需要搜索章节内容，需要将此页面改为服务器组件

  const totalResults = searchCharacters.length + searchStories.length;

  if (!query) {
    return (
      <div className="text-center py-12">
        <p className="text-light-text/60">请输入搜索关键词</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-xl text-light-text/70">
          搜索 "<span className="text-light-primary font-medium">{query}</span>" 的结果
        </h2>
        <p className="text-sm text-light-text/50 mt-2">
          找到 {totalResults} 个结果
        </p>
      </div>

      {totalResults === 0 && (
        <div className="text-center py-12 bg-light-accent/30 rounded-xl">
          <p className="text-light-text/60">没有找到相关内容</p>
          <p className="text-sm text-light-text/50 mt-2">
            试试其他关键词吧
          </p>
        </div>
      )}

      {/* Characters Results */}
      {searchCharacters.length > 0 && (
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-light-text mb-4">角色</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchCharacters.map((character) => (
              <Link
                key={character.id}
                href={`/characters/${character.id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="relative h-48 w-full bg-light-accent">
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-bold text-light-text mb-2">
                    {character.name}
                    {character.nickname && (
                      <span className="text-sm text-light-text/60 ml-2">
                        ({character.nickname})
                      </span>
                    )}
                  </h4>
                  <p className="text-light-text/70 line-clamp-2 text-sm">
                    {character.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Stories Results */}
      {searchStories.length > 0 && (
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-light-text mb-4">故事</h3>
          <div className="space-y-4">
            {searchStories.map((story) => (
              <Link
                key={story.id}
                href={`/${story.type === 'scene' ? 'scenes' : 'extras'}/${story.id}`}
                className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 bg-light-accent text-light-primary text-xs rounded mb-2">
                      {story.type === 'scene' ? '小剧场' : '番外'}
                    </span>
                    <h4 className="text-xl font-bold text-light-text group-hover:text-light-primary transition-colors mb-2">
                      {story.title}
                    </h4>
                    <p className="text-light-text/70">
                      {story.description}
                    </p>
                  </div>
                  <svg className="w-6 h-6 text-light-primary flex-shrink-0 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 章节搜索功能已移除 - 如需搜索章节内容，请使用正剧目录 */}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-light-text mb-8">搜索结果</h1>
        <Suspense fallback={
          <div className="text-center py-12">
            <p className="text-light-text/60">加载中...</p>
          </div>
        }>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}
