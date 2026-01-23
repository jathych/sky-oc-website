import fs from 'fs';
import path from 'path';

export interface ThemeColors {
  light: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  dark: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  neutral: {
    bg: string;
    card: string;
    border: string;
  };
}

export interface ThemeConfig {
  colors: ThemeColors;
  gradients: {
    light: string;
    dark: string;
  };
  metadata: {
    siteName: string;
    description: string;
  };
}

const configPath = path.join(process.cwd(), 'config', 'theme.config.json');

export function getThemeConfig(): ThemeConfig {
  try {
    if (!fs.existsSync(configPath)) {
      return getDefaultTheme();
    }
    const content = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading theme config:', error);
    return getDefaultTheme();
  }
}

export function saveThemeConfig(config: ThemeConfig): boolean {
  try {
    const configDir = path.dirname(configPath);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving theme config:', error);
    return false;
  }
}

function getDefaultTheme(): ThemeConfig {
  return {
    colors: {
      light: {
        primary: "#FFD89B",
        secondary: "#87CEEB",
        accent: "#FFF4E0",
        text: "#2C3E50"
      },
      dark: {
        primary: "#8B4C6B",
        secondary: "#2D2D44",
        accent: "#B85C7A",
        text: "#E8E8F0"
      },
      neutral: {
        bg: "#FAFAF9",
        card: "#FFFFFF",
        border: "#E5E5E5"
      }
    },
    gradients: {
      light: "linear-gradient(135deg, #FFD89B 0%, #87CEEB 100%)",
      dark: "linear-gradient(135deg, #8B4C6B 0%, #2D2D44 100%)"
    },
    metadata: {
      siteName: "光遇世界 - 原创角色展示",
      description: "基于光遇世界观的原创角色与故事展示网站"
    }
  };
}

// 生成CSS变量字符串
export function generateCSSVariables(config: ThemeConfig): string {
  return `
    :root {
      /* 光之子配色 */
      --color-light-primary: ${config.colors.light.primary};
      --color-light-secondary: ${config.colors.light.secondary};
      --color-light-accent: ${config.colors.light.accent};
      --color-light-text: ${config.colors.light.text};

      /* 暗之子配色 */
      --color-dark-primary: ${config.colors.dark.primary};
      --color-dark-secondary: ${config.colors.dark.secondary};
      --color-dark-accent: ${config.colors.dark.accent};
      --color-dark-text: ${config.colors.dark.text};

      /* 中性配色 */
      --color-neutral-bg: ${config.colors.neutral.bg};
      --color-neutral-card: ${config.colors.neutral.card};
      --color-neutral-border: ${config.colors.neutral.border};

      /* 渐变 */
      --gradient-light: ${config.gradients.light};
      --gradient-dark: ${config.gradients.dark};
    }
  `.trim();
}
