import Link from "next/link";
import Image from "next/image";
import { extrasMetadata } from "@/data/stories";

export default function ExtrasPage() {
  const extras = extrasMetadata;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-light-text text-center mb-4">
          番外故事
        </h1>
        <p className="text-center text-light-text/70 mb-12 max-w-2xl mx-auto">
          探索光遇世界中的完整番外故事，每一个番外都是独立的冒险。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {extras.map((extra) => (
            <Link
              key={extra.id}
              href={`/extras/${extra.id}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              {extra.id === 'extra-mermaid' && (
                <div className="relative h-48 w-full bg-gradient-light">
                  <Image
                    src="/images/artworks/人鱼传说.jpg"
                    alt={extra.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              {extra.id !== 'extra-mermaid' && (
                <div className="relative h-48 w-full bg-gradient-to-br from-light-secondary to-light-primary flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white/80">
                    {extra.title}
                  </h3>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-light-text group-hover:text-light-primary transition-colors mb-2">
                  {extra.title}
                </h2>
                <p className="text-light-text/70">
                  {extra.description}
                </p>
                {extra.publishDate && (
                  <p className="text-sm text-light-text/50 mt-3">
                    发布于 {extra.publishDate}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {extras.length === 0 && (
          <div className="text-center py-12 bg-light-accent/30 rounded-xl">
            <p className="text-light-text/60">暂无番外内容</p>
          </div>
        )}
      </div>
    </div>
  );
}
