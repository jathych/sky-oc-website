import Link from "next/link";
import Image from "next/image";
import { characters } from "@/data/characters";

export default function CharactersPage() {
  const lightCharacters = characters.filter(c => c.faction === 'light');
  const darkCharacters = characters.filter(c => c.faction === 'dark');
  const neutralCharacters = characters.filter(c => c.faction === 'neutral');

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-light-text text-center mb-4">
          角色介绍
        </h1>
        <p className="text-center text-light-text/70 mb-12 max-w-2xl mx-auto">
          探索光遇世界中的每一位角色，了解他们的故事、背景和在这个世界中的角色。
        </p>

        {/* Light Characters */}
        {lightCharacters.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-light-text mb-6 flex items-center">
              <span className="w-2 h-8 bg-gradient-light mr-3 rounded"></span>
              光之子
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lightCharacters.map((character) => (
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
                    <p className="text-light-text/70 line-clamp-3">
                      {character.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Dark Characters */}
        {darkCharacters.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-light-text mb-6 flex items-center">
              <span className="w-2 h-8 bg-gradient-dark mr-3 rounded"></span>
              暗之子
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {darkCharacters.map((character) => (
                <Link
                  key={character.id}
                  href={`/characters/${character.id}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="relative h-64 w-full bg-dark-accent/20">
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
                    <p className="text-light-text/70 line-clamp-3">
                      {character.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Neutral Characters */}
        {neutralCharacters.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-light-text mb-6 flex items-center">
              <span className="w-2 h-8 bg-neutral-border mr-3 rounded"></span>
              其他角色
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {neutralCharacters.map((character) => (
                <Link
                  key={character.id}
                  href={`/characters/${character.id}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="relative h-64 w-full bg-neutral-bg">
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
                    <p className="text-light-text/70 line-clamp-3">
                      {character.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
