'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';

interface Character {
  id: string;
  name: string;
}

interface Artwork {
  id: string;
  title: string;
  description: string;
  image: string;
  createdDate: string;
  relatedCharacters?: string[];
  tags?: string[];
}

export default function ArtworkAdminPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Artwork>({
    id: '',
    title: '',
    description: '',
    image: '',
    createdDate: new Date().toISOString().split('T')[0],
    relatedCharacters: [],
    tags: []
  });
  const router = useRouter();

  useEffect(() => {
    loadArtworks();
    loadCharacters();
  }, []);

  const loadArtworks = async () => {
    try {
      const response = await fetch('/api/artworks');
      const data = await response.json();
      setArtworks(data);
    } catch (error) {
      console.error('Error loading artworks:', error);
      setMessage('加载画作失败');
    } finally {
      setLoading(false);
    }
  };

  const loadCharacters = async () => {
    try {
      const response = await fetch('/api/characters');
      const data = await response.json();
      setCharacters(data);
    } catch (error) {
      console.error('Error loading characters:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch('/api/artworks', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(editingId ? '更新成功！' : '添加成功！');
        loadArtworks();
        resetForm();
      } else {
        setMessage('操作失败');
      }
    } catch (error) {
      console.error('Error saving artwork:', error);
      setMessage('保存失败');
    }
  };

  const handleEdit = (artwork: Artwork) => {
    setFormData(artwork);
    setEditingId(artwork.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个画作吗？')) return;

    try {
      const response = await fetch(`/api/artworks?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('删除成功！');
        loadArtworks();
      } else {
        setMessage('删除失败');
      }
    } catch (error) {
      console.error('Error deleting artwork:', error);
      setMessage('删除失败');
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      image: '',
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
            <h1 className="text-4xl font-bold text-light-text mb-2">画作管理</h1>
            <p className="text-light-text/70">添加、编辑和删除画作</p>
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
            {editingId ? '编辑画作' : '添加新画作'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-light-text mb-2">
                画作ID *
              </label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                disabled={!!editingId}
                required
                className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary disabled:bg-gray-100"
                placeholder="例如: artwork-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-light-text mb-2">
                标题 *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-light-text mb-2">
                描述 *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-light-text mb-2">
                图片 *
              </label>
              <ImageUpload
                value={formData.image}
                onChange={(path) => setFormData({ ...formData, image: path })}
              />
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
                placeholder="例如: 奇幻, 海洋, 传说"
              />
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg text-lg"
              >
                {editingId ? '✓ 更新画作' : '✓ 添加画作'}
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
            现有画作 ({artworks.length})
          </h2>
          <div className="space-y-4">
            {artworks.map((artwork) => (
              <div key={artwork.id} className="border border-neutral-border rounded-lg p-4 flex gap-4">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-32 h-32 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128"%3E%3Crect fill="%23ddd" width="128" height="128"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3E无图片%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-light-text">{artwork.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{artwork.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">ID: {artwork.id}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{artwork.createdDate}</span>
                    {artwork.tags?.map((tag) => (
                      <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(artwork)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(artwork.id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">使用说明</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• 画作ID必须唯一，建议使用英文和数字</li>
            <li>• 可以拖拽图片上传或点击选择文件</li>
            <li>• 支持 JPG, PNG, WEBP 格式，最大 5MB</li>
            <li>• 可以关联多个角色，也可以不关联</li>
            <li>• 标签用逗号分隔，例如: 奇幻, 海洋, 传说</li>
            <li>• 编辑后会立即生效，无需重启服务器</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
