import Link from "next/link";
import { getMainNovel } from "@/data/stories";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const mainNovel = await getMainNovel();
  return mainNovel.chapters.map((chapter) => ({
    id: chapter.id,
  }));
}

export default async function ChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mainNovel = await getMainNovel();
  const chapterIndex = mainNovel.chapters.findIndex((c) => c.id === id);

  if (chapterIndex === -1) {
    notFound();
  }

  const chapter = mainNovel.chapters[chapterIndex];
  const prevChapter = chapterIndex > 0 ? mainNovel.chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < mainNovel.chapters.length - 1 ? mainNovel.chapters[chapterIndex + 1] : null;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/novel"
          className="inline-flex items-center text-light-primary hover:underline mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回目录
        </Link>

        {/* Chapter */}
        <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <header className="mb-8 pb-8 border-b border-neutral-border text-center">
            <div className="text-sm text-light-primary font-medium mb-2">
              {mainNovel.title}
            </div>
            <h1 className="text-4xl font-bold text-light-text mb-4">
              {chapter.title}
            </h1>
            {chapter.publishDate && (
              <p className="text-sm text-light-text/50">
                发布于 {chapter.publishDate}
              </p>
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="text-light-text/80 leading-relaxed whitespace-pre-wrap text-justify">
              {chapter.content}
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center gap-4">
          {prevChapter ? (
            <Link
              href={`/novel/${prevChapter.id}`}
              className="flex-1 flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all group"
            >
              <svg className="w-6 h-6 text-light-primary mr-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div>
                <div className="text-xs text-light-text/60">上一章</div>
                <div className="font-medium text-light-text group-hover:text-light-primary transition-colors">
                  {prevChapter.title}
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex-1"></div>
          )}

          <Link
            href="/novel"
            className="px-6 py-3 bg-light-accent hover:bg-light-primary/20 rounded-lg transition-colors text-light-text font-medium"
          >
            目录
          </Link>

          {nextChapter ? (
            <Link
              href={`/novel/${nextChapter.id}`}
              className="flex-1 flex items-center justify-end p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all group"
            >
              <div className="text-right">
                <div className="text-xs text-light-text/60">下一章</div>
                <div className="font-medium text-light-text group-hover:text-light-primary transition-colors">
                  {nextChapter.title}
                </div>
              </div>
              <svg className="w-6 h-6 text-light-primary ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div className="flex-1"></div>
          )}
        </div>
      </div>
    </div>
  );
}
