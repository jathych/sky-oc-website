'use client';

import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';

interface Photo {
  id: string;
  title?: string;
  description: string;
  image: string;
  capturedDate: string;
  location: string;
  tags?: string[];
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/photos')
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].sort((a, b) =>
          new Date(b.capturedDate).getTime() - new Date(a.capturedDate).getTime()
        );
        setPhotos(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load photos:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-light-text mb-2">光遇照片</h1>
          <p className="text-light-text/70">记录在光遇世界中的美好瞬间</p>
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
                    {photos.length}
                  </div>
                  <div className="text-sm text-light-text/60">照片总数</div>
                </div>
              </div>
            </div>

            {/* 照片瀑布流布局 */}
            <Masonry
              breakpointCols={{
                default: 3,
                1024: 2,
                640: 1
              }}
              className="flex -ml-6 w-auto"
              columnClassName="pl-6 bg-clip-padding"
            >
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow mb-6"
                >
                  <div className="overflow-hidden">
                    <img
                      src={photo.image}
                      alt={photo.title || photo.description}
                      className="w-full h-auto block group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    {photo.title && (
                      <h3 className="text-lg font-bold text-light-text mb-2">
                        {photo.title}
                      </h3>
                    )}
                    <p className="text-sm text-light-text/70 mb-2">
                      {photo.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-light-text/50 mb-2">
                      <span>{photo.capturedDate}</span>
                      <span className="bg-light-accent text-light-primary px-2 py-1 rounded">
                        {photo.location}
                      </span>
                    </div>
                    {photo.tags && photo.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {photo.tags.map((tag) => (
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
                </div>
              ))}
            </Masonry>
          </>
        )}
      </div>
    </div>
  );
}
