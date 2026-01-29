import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from 'fs';
import path from 'path';

interface Character {
  id: string;
  name: string;
  nickname?: string;
  faction: 'light' | 'dark' | 'neutral';
  image: string;
  description: string;
  details: {
    age?: string;
    occupation?: string;
    personality?: string;
    background?: string;
    [key: string]: string | undefined;
  };
  relatedCharacters?: string[];
  tags?: string[];
  createdDate: string;
}

function getCharacters(): Character[] {
  const configPath = path.join(process.cwd(), 'config', 'characters.config.json');
  const data = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(data);
}

function getCharacter(id: string): Character | null {
  const characters = getCharacters();
  return characters.find((c) => c.id === id) || null;
}

export function generateStaticParams() {
  const characters = getCharacters();
  return characters.map((character) => ({
    id: character.id,
  }));
}

export default async function CharacterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const character = getCharacter(id);

  if (!character) {
    notFound();
  }

  const allCharacters = getCharacters();
  const relatedCharacters = character.relatedCharacters
    ? allCharacters.filter(c => character.relatedCharacters?.includes(c.id))
    : [];
  const otherCharacters = allCharacters
    .filter((c) => c.id !== character.id && !character.relatedCharacters?.includes(c.id))
    .slice(0, 4 - relatedCharacters.length);

  const getFactionColor = (faction: string) => {
    switch (faction) {
      case 'light':
        return 'bg-gradient-light';
      case 'dark':
        return 'bg-gradient-dark';
      default:
        return 'bg-neutral-border';
    }
  };

  const getFactionName = (faction: string) => {
    switch (faction) {
      case 'light':
        return '光之子';
      case 'dark':
        return '暗之子';
      default:
        return '其他';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/characters"
          className="inline-flex items-center text-light-primary hover:underline mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回角色列表
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className={`${getFactionColor(character.faction)} px-8 py-12 text-center`}>
            <h1 className="text-4xl font-bold text-white mb-2">
              {character.name}
            </h1>
            {character.nickname && (
              <p className="text-xl text-white/90">{character.nickname}</p>
            )}
            <span className="inline-block mt-4 px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
              {getFactionName(character.faction)}
            </span>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Image */}
              <div className="relative h-96 rounded-xl overflow-hidden bg-light-accent">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div>
                <h2 className="text-2xl font-bold text-light-text mb-4">角色详情</h2>
                <div className="space-y-4">
                  {character.details.age && (
                    <div>
                      <dt className="text-sm font-medium text-light-text/60">年龄</dt>
                      <dd className="text-light-text mt-1">{character.details.age}</dd>
                    </div>
                  )}
                  {character.details.occupation && (
                    <div>
                      <dt className="text-sm font-medium text-light-text/60">职业</dt>
                      <dd className="text-light-text mt-1">{character.details.occupation}</dd>
                    </div>
                  )}
                  {character.details.personality && (
                    <div>
                      <dt className="text-sm font-medium text-light-text/60">性格</dt>
                      <dd className="text-light-text mt-1">{character.details.personality}</dd>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-light-text mb-4">角色介绍</h2>
              <p className="text-light-text/80 leading-relaxed">
                {character.description}
              </p>
            </div>

            {/* Background */}
            {character.details.background && (
              <div>
                <h2 className="text-2xl font-bold text-light-text mb-4">背景故事</h2>
                <p className="text-light-text/80 leading-relaxed">
                  {character.details.background}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Characters */}
        {relatedCharacters.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-light-text mb-6">关联角色</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedCharacters.map((c) => (
                <Link
                  key={c.id}
                  href={`/characters/${c.id}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="relative h-32 w-full bg-light-accent">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-bold text-light-text text-sm">{c.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Other Characters */}
        {otherCharacters.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-light-text mb-6">其他角色</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {otherCharacters.map((c) => (
                <Link
                  key={c.id}
                  href={`/characters/${c.id}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="relative h-32 w-full bg-light-accent">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-bold text-light-text text-sm">{c.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
