'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ThemeConfig {
  colors: {
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
  };
  gradients: {
    light: string;
    dark: string;
  };
  metadata: {
    siteName: string;
    description: string;
  };
}

export default function ThemeAdminPage() {
  const [config, setConfig] = useState<ThemeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const response = await fetch('/api/theme');
      const data = await response.json();
      setConfig(data);
    } catch (error) {
      console.error('Error loading config:', error);
      setMessage('加载配置失败');
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async () => {
    if (!config) return;

    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('保存成功！刷新页面查看效果。');
      } else {
        setMessage('保存失败：' + (result.error || '未知错误'));
      }
    } catch (error) {
      console.error('Error saving config:', error);
      setMessage('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const updateColor = (category: 'light' | 'dark' | 'neutral', key: string, value: string) => {
    if (!config) return;
    setConfig({
      ...config,
      colors: {
        ...config.colors,
        [category]: {
          ...config.colors[category],
          [key]: value,
        },
      },
    });
  };

  const updateGradient = (key: 'light' | 'dark', value: string) => {
    if (!config) return;
    setConfig({
      ...config,
      gradients: {
        ...config.gradients,
        [key]: value,
      },
    });
  };

  const updateMetadata = (key: 'siteName' | 'description', value: string) => {
    if (!config) return;
    setConfig({
      ...config,
      metadata: {
        ...config.metadata,
        [key]: value,
      },
    });
  };

  const resetToDefault = () => {
    if (confirm('确定要重置为默认主题吗？')) {
      loadConfig();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-light-text">加载中...</div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-red-500">无法加载主题配置</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-light-primary hover:underline mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回管理中心
          </Link>
          <h1 className="text-4xl font-bold text-light-text mb-2">主题管理</h1>
          <p className="text-light-text/70">自定义网站的颜色和样式</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.includes('成功') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}

        {/* Actions */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={saveConfig}
            disabled={saving}
            className="px-6 py-3 bg-light-primary hover:bg-light-primary/80 disabled:bg-gray-300 text-light-text font-medium rounded-lg transition-colors"
          >
            {saving ? '保存中...' : '保存配置'}
          </button>
          <button
            onClick={resetToDefault}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-light-text font-medium rounded-lg transition-colors"
          >
            重置为默认
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 光之子配色 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-light-text mb-4">光之子配色</h2>
            <div className="space-y-4">
              <ColorInput
                label="主色调 (Primary)"
                value={config.colors.light.primary}
                onChange={(v) => updateColor('light', 'primary', v)}
              />
              <ColorInput
                label="次色调 (Secondary)"
                value={config.colors.light.secondary}
                onChange={(v) => updateColor('light', 'secondary', v)}
              />
              <ColorInput
                label="强调色 (Accent)"
                value={config.colors.light.accent}
                onChange={(v) => updateColor('light', 'accent', v)}
              />
              <ColorInput
                label="文字颜色 (Text)"
                value={config.colors.light.text}
                onChange={(v) => updateColor('light', 'text', v)}
              />
            </div>
          </div>

          {/* 暗之子配色 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-light-text mb-4">暗之子配色</h2>
            <div className="space-y-4">
              <ColorInput
                label="主色调 (Primary)"
                value={config.colors.dark.primary}
                onChange={(v) => updateColor('dark', 'primary', v)}
              />
              <ColorInput
                label="次色调 (Secondary)"
                value={config.colors.dark.secondary}
                onChange={(v) => updateColor('dark', 'secondary', v)}
              />
              <ColorInput
                label="强调色 (Accent)"
                value={config.colors.dark.accent}
                onChange={(v) => updateColor('dark', 'accent', v)}
              />
              <ColorInput
                label="文字颜色 (Text)"
                value={config.colors.dark.text}
                onChange={(v) => updateColor('dark', 'text', v)}
              />
            </div>
          </div>

          {/* 中性配色 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-light-text mb-4">中性配色</h2>
            <div className="space-y-4">
              <ColorInput
                label="背景颜色 (Background)"
                value={config.colors.neutral.bg}
                onChange={(v) => updateColor('neutral', 'bg', v)}
              />
              <ColorInput
                label="卡片颜色 (Card)"
                value={config.colors.neutral.card}
                onChange={(v) => updateColor('neutral', 'card', v)}
              />
              <ColorInput
                label="边框颜色 (Border)"
                value={config.colors.neutral.border}
                onChange={(v) => updateColor('neutral', 'border', v)}
              />
            </div>
          </div>

          {/* 渐变配置 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-light-text mb-4">渐变效果</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light-text mb-2">
                  光之子渐变
                </label>
                <input
                  type="text"
                  value={config.gradients.light}
                  onChange={(e) => updateGradient('light', e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary"
                />
                <div
                  className="mt-2 h-12 rounded-lg"
                  style={{ background: config.gradients.light }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text mb-2">
                  暗之子渐变
                </label>
                <input
                  type="text"
                  value={config.gradients.dark}
                  onChange={(e) => updateGradient('dark', e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary"
                />
                <div
                  className="mt-2 h-12 rounded-lg"
                  style={{ background: config.gradients.dark }}
                />
              </div>
            </div>
          </div>

          {/* 网站元信息 */}
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold text-light-text mb-4">网站信息</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light-text mb-2">
                  网站名称
                </label>
                <input
                  type="text"
                  value={config.metadata.siteName}
                  onChange={(e) => updateMetadata('siteName', e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text mb-2">
                  网站描述
                </label>
                <textarea
                  value={config.metadata.description}
                  onChange={(e) => updateMetadata('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 说明 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">使用说明</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• 修改颜色后点击"保存配置"按钮保存更改</li>
            <li>• 保存后需要刷新页面才能看到效果</li>
            <li>• 颜色格式支持十六进制（#RRGGBB）</li>
            <li>• 渐变格式需要使用CSS的linear-gradient语法</li>
            <li>• 点击"重置为默认"可以恢复原始主题</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-light-text mb-2">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-16 h-10 border border-neutral-border rounded-lg cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary"
        />
      </div>
    </div>
  );
}
