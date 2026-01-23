import Link from 'next/link';
import { encyclopediaData, EncyclopediaEntry } from '@/data/encyclopedia';

export function generateStaticParams() {
  return encyclopediaData.map((entry) => ({
    id: entry.id,
  }));
}

export default function EncyclopediaPage({ params }: { params: { id: string } }) {
  const entry = encyclopediaData.find((e) => e.id === params.id);

  if (!entry) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-light-text mb-4">未找到条目</h1>
          <Link href="/" className="text-light-primary hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const isLight = entry.id === 'light';
  const themeClass = isLight ? 'bg-gradient-light' : 'bg-gradient-dark';
  const accentClass = isLight ? 'bg-light-accent text-light-primary' : 'bg-dark-accent text-dark-primary';
  const borderClass = isLight ? 'border-light-primary/20' : 'border-dark-primary/20';

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-light-primary hover:underline mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回首页
          </Link>
          <div className={`${themeClass} rounded-xl p-8 text-white`}>
            <h1 className="text-5xl font-bold mb-4">{entry.name}</h1>
            <p className="text-xl opacity-90">
              {isLight ? '光明与希望的守护者' : '暗影与宁静的守护者'}
            </p>
          </div>
        </div>

        {/* 种族介绍 */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <h2 className="text-3xl font-bold text-light-text mb-6 flex items-center">
            <span className={`w-2 h-8 ${isLight ? 'bg-light-primary' : 'bg-dark-primary'} rounded mr-3`}></span>
            种族介绍
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-light-text mb-3">历史</h3>
              <p className="text-light-text/80 leading-relaxed">{entry.introduction.history}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-light-text mb-3">文化</h3>
              <p className="text-light-text/80 leading-relaxed">{entry.introduction.culture}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-light-text mb-3">特征</h3>
              <ul className="space-y-2">
                {entry.introduction.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className={`${accentClass} rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0`}>
                      {index + 1}
                    </span>
                    <span className="text-light-text/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 地理位置 */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <h2 className="text-3xl font-bold text-light-text mb-6 flex items-center">
            <span className={`w-2 h-8 ${isLight ? 'bg-light-primary' : 'bg-dark-primary'} rounded mr-3`}></span>
            地理位置
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-light-text mb-3">居住地</h3>
              <p className="text-light-text/80 leading-relaxed">{entry.geography.homeland}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-light-text mb-3">气候</h3>
              <p className="text-light-text/80 leading-relaxed">{entry.geography.climate}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-light-text mb-3">重要地标</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {entry.geography.landmarks.map((landmark, index) => (
                  <div key={index} className={`${accentClass} rounded-lg p-4`}>
                    <p className="font-medium">{landmark}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 能力与特性 */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <h2 className="text-3xl font-bold text-light-text mb-6 flex items-center">
            <span className={`w-2 h-8 ${isLight ? 'bg-light-primary' : 'bg-dark-primary'} rounded mr-3`}></span>
            能力与特性
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entry.abilities.map((ability, index) => (
              <div key={index} className={`border-2 ${borderClass} rounded-lg p-5`}>
                <h3 className={`text-lg font-bold mb-2 ${isLight ? 'text-light-primary' : 'text-dark-primary'}`}>
                  {ability.name}
                </h3>
                <p className="text-light-text/80 text-sm">{ability.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 重要事件时间线 */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-light-text mb-6 flex items-center">
            <span className={`w-2 h-8 ${isLight ? 'bg-light-primary' : 'bg-dark-primary'} rounded mr-3`}></span>
            重要事件时间线
          </h2>

          <div className="relative">
            {/* 时间线竖线 */}
            <div className={`absolute left-4 top-0 bottom-0 w-0.5 ${isLight ? 'bg-light-primary/30' : 'bg-dark-primary/30'}`}></div>

            <div className="space-y-6">
              {entry.timeline.map((event, index) => (
                <div key={index} className="relative pl-12">
                  {/* 时间点 */}
                  <div className={`absolute left-0 w-8 h-8 ${isLight ? 'bg-light-primary' : 'bg-dark-primary'} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {index + 1}
                  </div>

                  <div className={`${accentClass} rounded-lg p-4`}>
                    <h3 className="font-bold text-lg mb-2">{event.date}</h3>
                    <p className="text-sm opacity-90">{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 返回按钮 */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className={`inline-flex items-center px-6 py-3 ${isLight ? 'bg-light-primary hover:bg-light-primary/90' : 'bg-dark-primary hover:bg-dark-primary/90'} text-white rounded-lg transition-colors font-medium`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
