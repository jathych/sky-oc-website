import { NextRequest, NextResponse } from 'next/server';
import { getThemeConfig, saveThemeConfig, ThemeConfig } from '@/lib/theme';

export async function GET() {
  try {
    const config = getThemeConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error getting theme config:', error);
    return NextResponse.json({ error: '无法获取主题配置' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const config: ThemeConfig = await request.json();
    const success = saveThemeConfig(config);

    if (success) {
      return NextResponse.json({ success: true, message: '主题配置已保存' });
    } else {
      return NextResponse.json({ error: '保存失败' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error saving theme config:', error);
    return NextResponse.json({ error: '保存失败' }, { status: 500 });
  }
}
