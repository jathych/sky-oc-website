'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { characters } from '@/data/characters';

interface Scene {
  id: string;
  content: string;
  createdDate: string;
  relatedCharacters?: string[];
  tags?: string[];
}

export default function SceneAdminPage() {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Scene>({
    id: '',
    content: '',
    createdDate: new Date().toISOString().split('T')[0],
    relatedCharacters: [],
    tags: []
  });
  const router = useRouter();

  useEffect(() => {
    loadScenes();
  }, []);

  const loadScenes = async () => {
    try {
      const response = await fetch('/api/scenes');
      const data = await response.json();
      setScenes(data);
    } catch (error) {
      console.error('Error loading scenes:', error);
      setMessage('加载小剧场失败');
    } finally {
      setLoading(false);
    }
  };

  const generateId = () => {
    const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const existingIds = scenes.filter(s => s.id.startsWith(`scene-${date}`));
    const nextNum = existingIds.length + 1;
    return `scene-${date}-${String(nextNum).padStart(3, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const dataToSubmit = editingId ? formData : { ...formData, id: generateId() };
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch('/api/scenes', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        setMessage(editingId ? '更新成功！' : '添加成功！');
        loadScenes();
        resetForm();
      } else {
        setMessage('操作失败');
      }
    } catch (error) {
      console.error('Error saving scene:', error);
      setMessage('保存失败');
    }
  };

  const handleEdit = (scene: Scene) => {
    setFormData(scene);
    setEditingId(scene.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个小剧场吗？')) return;

    try {
      const response = await fetch(`/api/scenes?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('删除成功！');
        loadScenes();
      } else {
        setMessage('删除失败');
      }
    } catch (error) {
      console.error('Error deleting scene:', error);
      setMessage('删除失败');
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      content: '',
      createdDate: new Date().toISOString().split('T')[0],
      relatedCharacters: [],
      tags: []
    });
    setEditingId(null);
  };

  const handleTagsChange = (value: string) => {
    setFormData({
      ...formData,
      tags: value.split(',').map(t => t.trim()).filter(t => t)
    });
  };

  const handleCharactersChange = (characterId: string) => {
    const current = formData.relatedCharacters || [];
    const updated = current.includes(characterId)
      ? current.filter(id => id !== characterId)
      : [...current, characterId];
    setFormData({ ...formData, relatedCharacters: updated });
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-light-text">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <Link href="/admin" className="inline-flex items-center text-light-primary hover:underline mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回管理中心
            </Link>
            <h1 className="text-4xl font-bold text-light-text mb-2">小剧场管理</h1>
            <p className="text-light-text/70">添加、编辑和删除小剧场片段</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-light-text rounded-lg transition-colors"
          >
            登出
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.includes('成功') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-light-text mb-4">
            {editingId ? '编辑小剧场' : '添加新小剧场'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-light-text mb-2">
                内容 *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={8}
                className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary font-mono"
                placeholder="输入小剧场内容，支持多行文本..."
              />
              <p className="text-xs text-gray-500 mt-1">提示：直接按回车换行即可</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-light-text mb-2">
                创建日期 *
              </label>
              <input
                type="date"
                value={formData.createdDate}
                onChange={(e) => setFormData({ ...formData, createdDate: e.target.value })}
                required
                className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-light-text mb-2">
                关联角色
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {characters.map((char) => (
                  <label key={char.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.relatedCharacters?.includes(char.id)}
                      onChange={() => handleCharactersChange(char.id)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{char.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-light-text mb-2">
                标签（用逗号分隔）
              </label>
              <input
                type="text"
                value={formData.tags?.join(', ') || ''}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary"
                placeholder="例如: 现代AU, 校园, 日常"
              />
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg text-lg"
              >
                {editingId ? '✓ 更新小剧场' : '✓ 添加小剧场'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-light-text font-medium rounded-lg transition-colors"
                >
                  取消编辑
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-light-text mb-4">
            现有小剧场 ({scenes.length})
          </h2>
          <div className="space-y-4">
            {scenes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                暂无小剧场，点击上方添加第一个吧！
              </div>
            ) : (
              scenes.map((scene) => (
                <div key={scene.id} className="border border-neutral-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">ID: {scene.id}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{scene.createdDate}</span>
                      </div>
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans bg-gray-50 p-3 rounded border border-gray-200 mb-2">
                        {scene.content.length > 200 ? scene.content.substring(0, 200) + '...' : scene.content}
                      </pre>
                      <div className="flex flex-wrap gap-2">
                        {scene.relatedCharacters?.map((charId) => {
                          const char = characters.find(c => c.id === charId);
                          return char ? (
                            <span key={charId} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                              👤 {char.name}
                            </span>
                          ) : null;
                        })}
                        {scene.tags?.map((tag) => (
                          <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            🏷️ {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(scene)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors whitespace-nowrap"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(scene.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors whitespace-nowrap"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">使用说明</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• 小剧场ID会自动生成，格式为 scene-YYYYMMDD-序号</li>
            <li>• 内容支持多行文本，直接按回车换行即可</li>
            <li>• 小剧场没有标题，只有内容</li>
            <li>• 可以关联多个角色，也可以不关联</li>
            <li>• 标签用逗号分隔，例如: 现代AU, 校园, 日常</li>
            <li>• 编辑后会立即生效，无需重启服务器</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
