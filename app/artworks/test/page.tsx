'use client';

import Link from 'next/link';
import Masonry from 'react-masonry-css';

// 测试数据：不同宽高比的图片
const testArtworks = [
  {
    id: 'test-1',
    title: '竖向图片 (600x900)',
    description: '这是一张竖向图片，宽高比 2:3',
    image: 'https://picsum.photos/600/900',
    createdDate: '2024-01-01',
    tags: ['竖向', '测试']
  },
  {
    id: 'test-2',
    title: '正方形图片 (800x800)',
    description: '这是一张正方形图片，宽高比 1:1',
    image: 'https://picsum.photos/800/800',
    createdDate: '2024-01-02',
    tags: ['正方形', '测试']
  },
  {
    id: 'test-3',
    title: '横向图片 (1000x600)',
    description: '这是一张横向图片，宽高比 5:3',
    image: 'https://picsum.photos/1000/600',
    createdDate: '2024-01-03',
    tags: ['横向', '测试']
  },
  {
    id: 'test-4',
    title: '超高竖向图片 (500x1200)',
    description: '这是一张超高的竖向图片，宽高比 5:12',
    image: 'https://picsum.photos/500/1200',
    createdDate: '2024-01-04',
    tags: ['超高', '测试']
  },
  {
    id: 'test-5',
    title: '超宽横向图片 (1200x500)',
    description: '这是一张超宽的横向图片，宽高比 12:5',
    image: 'https://picsum.photos/1200/500',
    createdDate: '2024-01-05',
    tags: ['超宽', '测试']
  },
  {
    id: 'test-6',
    title: '中等竖向图片 (700x1000)',
    description: '这是一张中等竖向图片，宽高比 7:10',
    image: 'https://picsum.photos/700/1000',
    createdDate: '2024-01-06',
    tags: ['竖向', '测试']
  },
  {
    id: 'test-7',
    title: '小正方形图片 (600x600)',
    description: '这是一张小正方形图片，宽高比 1:1',
    image: 'https://picsum.photos/600/600',
    createdDate: '2024-01-07',
    tags: ['正方形', '测试']
  },
  {
    id: 'test-8',
    title: '中等横向图片 (900x700)',
    description: '这是一张中等横向图片，宽高比 9:7',
    image: 'https://picsum.photos/900/700',
    createdDate: '2024-01-08',
    tags: ['横向', '测试']
  },
  {
    id: 'test-9',
    title: '高竖向图片 (600x1100)',
    description: '这是一张高竖向图片，宽高比 6:11',
    image: 'https://picsum.photos/600/1100',
    createdDate: '2024-01-09',
    tags: ['竖向', '测试']
  }
];

export default function ArtworksTestPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-light-text mb-2">画廊瀑布流测试</h1>
          <p className="text-light-text/70">使用不同宽高比的图片测试瀑布流效果</p>
          <Link
            href="/artworks"
            className="inline-block mt-4 text-light-primary hover:underline"
          >
            ← 返回正式画廊
          </Link>
        </div>

        {/* 说明 */}
        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-lg font-bold text-blue-900 mb-2">测试说明</h2>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 这个页面使用了9张不同宽高比的测试图片</li>
            <li>• 包含竖向、横向、正方形等多种比例</li>
            <li>• 如果瀑布流正常工作，你应该看到卡片高度各不相同，错落有致</li>
            <li>• 图片来自 picsum.photos（随机占位图片服务）</li>
          </ul>
        </div>

        {/* 统计信息 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-light-primary">
                {testArtworks.length}
              </div>
              <div className="text-sm text-light-text/60">测试图片总数</div>
            </div>
          </div>
        </div>

        {/* 瀑布流布局 */}
        <Masonry
          breakpointCols={{
            default: 3,
            1024: 2,
            640: 1
          }}
          className="flex -ml-6 w-auto"
          columnClassName="pl-6 bg-clip-padding"
        >
          {testArtworks.map((artwork) => (
            <div
              key={artwork.id}
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
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}
