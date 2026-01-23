import Link from "next/link";
import { extrasMetadata, getExtraById } from "@/data/stories";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return extrasMetadata.map((story) => ({
    id: story.id,
  }));
}

export default async function ExtraDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const story = await getExtraById(id);

  if (!story) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/extras"
          className="inline-flex items-center text-light-primary hover:underline mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回番外列表
        </Link>

        {/* Article */}
        <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <header className="mb-8 pb-8 border-b border-neutral-border">
            <span className="inline-block px-3 py-1 bg-dark-accent/20 text-dark-primary rounded-full text-sm font-medium mb-4">
              番外故事
            </span>
            <h1 className="text-4xl font-bold text-light-text mb-4">
              {story.title}
            </h1>
            <p className="text-lg text-light-text/70 mb-4">
              {story.description}
            </p>
            {story.publishDate && (
              <p className="text-sm text-light-text/50">
                发布于 {story.publishDate}
              </p>
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="text-light-text/80 leading-relaxed whitespace-pre-wrap">
              {story.content}
            </div>
          </div>
        </article>

        {/* More Extras */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-light-text mb-6">更多番外</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {extrasMetadata
              .filter(s => s.id !== story.id)
              .slice(0, 4)
              .map(extra => (
                <Link
                  key={extra.id}
                  href={`/extras/${extra.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-4 group"
                >
                  <h3 className="font-bold text-light-text group-hover:text-light-primary transition-colors">
                    {extra.title}
                  </h3>
                  <p className="text-sm text-light-text/70 mt-1 line-clamp-2">
                    {extra.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
