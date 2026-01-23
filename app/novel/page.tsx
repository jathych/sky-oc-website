import Link from "next/link";
import { getMainNovel } from "@/data/stories";

export default async function NovelPage() {
  const mainNovel = await getMainNovel();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-dark rounded-2xl shadow-xl p-8 md:p-12 text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-text mb-4">
            {mainNovel.title}
          </h1>
          <p className="text-lg text-dark-text/90 max-w-2xl mx-auto">
            {mainNovel.description}
          </p>
        </div>

        {/* Chapters */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-light-text mb-6">章节目录</h2>

          {mainNovel.chapters.length > 0 ? (
            <div className="space-y-3">
              {mainNovel.chapters.map((chapter, index) => (
                <Link
                  key={chapter.id}
                  href={`/novel/${chapter.id}`}
                  className="block p-4 rounded-lg border border-neutral-border hover:border-light-primary hover:bg-light-accent/50 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-light-primary/30 group-hover:text-light-primary transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-bold text-light-text group-hover:text-light-primary transition-colors">
                          {chapter.title}
                        </h3>
                        {chapter.publishDate && (
                          <p className="text-sm text-light-text/50 mt-1">
                            发布于 {chapter.publishDate}
                          </p>
                        )}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-light-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-light-accent/30 rounded-xl">
              <p className="text-light-text/60">章节内容待添加...</p>
              <p className="text-sm text-light-text/50 mt-2">
                请从 正剧.docx 中提取章节内容
              </p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-light-primary">
              {mainNovel.chapters.length}
            </div>
            <div className="text-sm text-light-text/60 mt-1">章节</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-light-primary">连载中</div>
            <div className="text-sm text-light-text/60 mt-1">状态</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-light-primary">奇幻</div>
            <div className="text-sm text-light-text/60 mt-1">类型</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-light-primary">冒险</div>
            <div className="text-sm text-light-text/60 mt-1">风格</div>
          </div>
        </div>
      </div>
    </div>
  );
}
