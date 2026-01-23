'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Masonry from 'react-masonry-css';

interface Artwork {
  id: string;
  title: string;
  description: string;
  image: string;
  createdDate: string;
  relatedCharacters?: string[];
  tags?: string[];
}

export default function ArtworksPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/artworks')
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].sort((a, b) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
        setArtworks(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load artworks:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-light-text mb-2">画廊</h1>
          <p className="text-light-text/70">探索OC世界的精彩画作</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-light-text">加载中...</div>
          </div>
        ) : (
          <>
            {/* 统计信息 */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-8">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-light-primary">
                    {artworks.length}
                  </div>
                  <div className="text-sm text-light-text/60">画作总数</div>
                </div>
              </div>
            </div>

            {/* 画作瀑布流布局 */}
            <Masonry
              breakpointCols={{
                default: 3,
                1024: 2,
                640: 1
              }}
              className="flex -ml-6 w-auto"
              columnClassName="pl-6 bg-clip-padding"
            >
              {artworks.map((artwork) => (
                <Link
                  key={artwork.id}
                  href={`/artworks/${artwork.id}`}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow block mb-6"
                >
                  <div className="overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-auto block group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-light-text mb-2 group-hover:text-light-primary transition-colors">
                    {artwork.title}
                  </h3>
                  <p className="text-sm text-light-text/70 mb-2">
                    {artwork.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-light-text/50">
                    <span>{artwork.createdDate}</span>
                    {artwork.relatedCharacters && artwork.relatedCharacters.length > 0 && (
                      <span>{artwork.relatedCharacters.length} 个角色</span>
                    )}
                  </div>
                  {artwork.tags && artwork.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {artwork.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-light-accent text-light-primary px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </Masonry>
      </>
    )}
      </div>
    </div>
  );
}
