export interface Character {
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
}

export const characters: Character[] = [
  {
    id: 'liehewei',
    name: '列何卫',
    faction: 'neutral',
    image: '/images/characters/列何卫.jpg', 
    description: '主角，孤儿出身，被养父抚养长大，三年来独自行走江湖历练。',
    details: {
      age: '十五六岁',
      personality: '避世、内敛，对养父深信不疑',
      background: '十二三年前被大叔捡到并抚养长大，三年前大叔离开后开始独自旅行。',
    }
  },
  {
    id: 'princess',
    name: '艾米尔',
    nickname: '公主',
    faction: 'light',
    image: '/images/characters/列何卫.jpg',
    description: '光之子的公主，被老臣托付给箬笠，一路与箬笠同行。',
    details: {
      personality: '聪慧、有主见，看不惯箬笠的避世性格',
      background: '被老臣托付给箬笠，在旅途中学会独立完成任务。',
    }
  },
  {
    id: 'baixiao',
    name: '白枭',
    faction: 'light',
    image: '/images/characters/白枭.jpg',
    description: '角色简介待补充',
    details: {}
  },
  {
    id: 'chenpu',
    name: '陈璞',
    faction: 'neutral',
    image: '/images/characters/陈璞.jpg',
    description: '角色简介待补充',
    details: {}
  },
  {
    id: 'fangzheng',
    name: '方峥',
    faction: 'neutral',
    image: '/images/characters/方峥.jpg',
    description: '角色简介待补充',
    details: {}
  },
];
