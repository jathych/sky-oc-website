import Link from "next/link";
import Image from "next/image";
import { characters } from "@/data/characters";

export default function Home() {
  const featuredCharacters = characters.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-light py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-light-text mb-6">
            光遇世界
          </h1>
          <p className="text-xl md:text-2xl text-light-text/80 mb-8 max-w-3xl mx-auto">
            光之子与暗之子，两个国度因资源竞争而产生冲突。<br />
            在这个充满冒险与选择的世界中，每个角色都在寻找属于自己的道路。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/characters"
              className="px-8 py-3 bg-white text-light-text rounded-lg shadow-lg hover:shadow-xl transition-all font-medium"
            >
              探索角色
            </Link>
            <Link
              href="/novel"
              className="px-8 py-3 bg-dark-primary text-dark-text rounded-lg shadow-lg hover:shadow-xl transition-all font-medium"
            >
              阅读正剧
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Characters */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-light-text text-center mb-12">
            主要角色
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCharacters.map((character) => (
              <Link
                key={character.id}
                href={`/characters/${character.id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="relative h-64 w-full bg-light-accent">
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-light-text mb-2">
                    {character.name}
                    {character.nickname && (
                      <span className="text-sm text-light-text/60 ml-2">
                        ({character.nickname})
                      </span>
                    )}
                  </h3>
                  <p className="text-light-text/70 line-clamp-2">
                    {character.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/characters"
              className="text-light-primary hover:underline font-medium"
            >
              查看所有角色 →
            </Link>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-16 px-4 bg-light-accent/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-light-text text-center mb-12">
            故事精选
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link
              href="/scenes"
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 group"
            >
              <h3 className="text-2xl font-bold text-light-text mb-4 group-hover:text-light-primary transition-colors">
                小剧场
              </h3>
              <p className="text-light-text/70">
                现代平行世界中的日常小互动，记录角色们的趣味瞬间...
              </p>
            </Link>
            <Link
              href="/extras"
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 group"
            >
              <h3 className="text-2xl font-bold text-light-text mb-4 group-hover:text-light-primary transition-colors">
                番外故事
              </h3>
              <p className="text-light-text/70">
                探索光遇世界中的奇幻故事：人鱼传说、神女与她虔诚的信徒、小红狼与大灰帽...
              </p>
            </Link>
            <Link
              href="/novel"
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 group"
            >
              <h3 className="text-2xl font-bold text-light-text mb-4 group-hover:text-light-primary transition-colors">
                正剧连载
              </h3>
              <p className="text-light-text/70">
                跟随箬笠与公主的旅程，见证光之子与暗之子对立世界中的冒险与成长...
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* World Setting */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-light-text mb-8">世界观设定</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <Link
              href="/encyclopedia/light"
              className="bg-gradient-light rounded-xl p-6 text-light-text hover:shadow-xl transition-all group"
            >
              <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                光之子
              </h3>
              <p className="text-light-text/80 mb-3">
                居住在温暖明亮的土地上，通过合约与洽谈解决矛盾。但内部也存在激进派与保守派的分歧。
              </p>
              <div className="text-sm text-white font-medium">
                了解更多 →
              </div>
            </Link>
            <Link
              href="/encyclopedia/dark"
              className="bg-gradient-dark rounded-xl p-6 text-dark-text hover:shadow-xl transition-all group"
            >
              <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                暗之子
              </h3>
              <p className="text-dark-text/80 mb-3">
                生活在常年刮大风、红石遍布的伊甸。为了种族延续，可以改变外貌形态，幻化成光之子。
              </p>
              <div className="text-sm text-white font-medium">
                了解更多 →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Admin Quick Access */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Link
            href="/admin/login"
            className="text-sm text-light-text/40 hover:text-light-primary transition-colors"
          >
            管理入口
          </Link>
        </div>
      </section>
    </div>
  );
}
