'use client';

import { useState, useEffect } from 'react';
import { characters } from '@/data/characters';

interface Scene {
  id: string;
  content: string;
  createdDate: string;
  relatedCharacters?: string[];
  tags?: string[];
}

export default function ScenesPage() {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScenes();
  }, []);

  const loadScenes = async () => {
    try {
      const response = await fetch('/api/scenes');
      const data = await response.json();
      // Sort by date descending (newest first)
      const sorted = data.sort((a: Scene, b: Scene) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
      setScenes(sorted);
    } catch (error) {
      console.error('Error loading scenes:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-light-text">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-light-text text-center mb-4">
          小剧场
        </h1>
        <p className="text-center text-light-text/70 mb-12 max-w-2xl mx-auto">
          现代平行世界中的日常小互动，记录角色们的趣味瞬间。
        </p>

        {scenes.length === 0 ? (
          <div className="text-center py-12 bg-light-accent/30 rounded-xl">
            <p className="text-light-text/60 mb-2">暂无小剧场内容</p>
            <p className="text-sm text-light-text/50">敬请期待更多精彩片段</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[60px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-light-primary/50 via-light-primary/30 to-transparent hidden md:block" />

            <div className="space-y-8">
              {scenes.map((scene, index) => (
                <div key={scene.id} className="relative flex gap-6">
                  {/* Date marker */}
                  <div className="flex-shrink-0 w-[120px] text-right">
                    <div className="inline-block bg-light-primary/10 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-light-primary">
                        {formatDate(scene.createdDate)}
                      </span>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-[60px] top-[10px] w-3 h-3 bg-light-primary rounded-full border-4 border-white shadow-md z-10" />

                  {/* Content card */}
                  <div className="flex-1 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                    <pre className="text-light-text whitespace-pre-wrap font-sans leading-relaxed mb-4">
                      {scene.content}
                    </pre>

                    {/* Characters and tags */}
                    {(scene.relatedCharacters?.length || scene.tags?.length) && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                        {scene.relatedCharacters?.map((charId) => {
                          const char = characters.find(c => c.id === charId);
                          return char ? (
                            <span
                              key={charId}
                              className="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full"
                            >
                              <span>👤</span>
                              <span>{char.name}</span>
                            </span>
                          ) : null;
                        })}
                        {scene.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                          >
                            <span>🏷️</span>
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
