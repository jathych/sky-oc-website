import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 光之子配色 - 温暖明亮
        light: {
          primary: "#FFD89B",    // 金色
          secondary: "#87CEEB",  // 天蓝
          accent: "#FFF4E0",     // 浅金
          text: "#2C3E50",       // 深灰蓝
        },
        // 暗之子配色 - 神秘深沉
        dark: {
          primary: "#8B4C6B",    // 深紫红
          secondary: "#2D2D44",  // 深灰紫
          accent: "#B85C7A",     // 玫瑰紫
          text: "#E8E8F0",       // 浅灰
        },
        // 中性配色
        neutral: {
          bg: "#FAFAF9",         // 背景
          card: "#FFFFFF",       // 卡片
          border: "#E5E5E5",     // 边框
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-light': 'linear-gradient(135deg, #FFD89B 0%, #87CEEB 100%)',
        'gradient-dark': 'linear-gradient(135deg, #8B4C6B 0%, #2D2D44 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
