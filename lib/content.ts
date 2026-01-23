import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';

export async function readContentFile(filePath: string): Promise<string> {
  try {
    const fullPath = path.join(process.cwd(), 'content', filePath);

    // 检查文件是否存在
    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`);
      return '文件未找到';
    }

    // 根据文件扩展名选择读取方式
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.docx') {
      // 读取 docx 文件
      const result = await mammoth.extractRawText({ path: fullPath });
      return result.value;
    } else if (ext === '.txt') {
      // 读取 txt 文件
      return fs.readFileSync(fullPath, 'utf-8');
    } else {
      console.error(`Unsupported file type: ${ext}`);
      return '不支持的文件格式';
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return '内容加载错误';
  }
}

// 同步版本（用于兼容现有代码）
export function readContentFileSync(filePath: string): string {
  try {
    const fullPath = path.join(process.cwd(), 'content', filePath);

    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`);
      return '文件未找到';
    }

    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.txt') {
      return fs.readFileSync(fullPath, 'utf-8');
    } else if (ext === '.docx') {
      // 对于 docx 文件，返回提示信息
      return '请使用异步方法读取 docx 文件';
    } else {
      return '不支持的文件格式';
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return '内容加载错误';
  }
}

export async function readSceneContent(filename: string): Promise<string> {
  return await readContentFile(`scenes/${filename}`);
}

export async function readExtraContent(filename: string): Promise<string> {
  return await readContentFile(`extras/${filename}`);
}

export async function readChapterContent(filename: string): Promise<string> {
  return await readContentFile(`chapters/${filename}`);
}

export function readSceneContentSync(filename: string): string {
  return readContentFileSync(`scenes/${filename}`);
}

export function readExtraContentSync(filename: string): string {
  return readContentFileSync(`extras/${filename}`);
}

export function readChapterContentSync(filename: string): string {
  return readContentFileSync(`chapters/${filename}`);
}

export function listChapters(): string[] {
  try {
    const chaptersDir = path.join(process.cwd(), 'content', 'chapters');
    if (!fs.existsSync(chaptersDir)) {
      return [];
    }
    const files = fs.readdirSync(chaptersDir);
    return files.filter(f => f.endsWith('.txt') || f.endsWith('.docx')).sort();
  } catch (error) {
    console.error('Error listing chapters:', error);
    return [];
  }
}

// 从正剧文件中提取章节
export async function extractChaptersFromNovel(filename: string): Promise<{
  id: string;
  title: string;
  content: string;
}[]> {
  try {
    const content = await readContentFile(filename);
    const lines = content.split('\n');

    // 步骤1：跳过目录部分
    let contentStartIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      // 目录行特征：包含TAB且格式为 "数字.文字<TAB>数字"
      if (line.includes('\t') && /^\d+\..*\t\d+$/.test(line)) {
        continue;
      }
      // 找到第一个非目录、非空行
      if (line && !line.includes('\t')) {
        contentStartIndex = i;
        break;
      }
    }

    // 步骤2：提取所有章节位置
    const chapterRegex = /^(\d+)\.(.+)$/;
    const chapterPositions: { index: number; num: number; title: string }[] = [];

    for (let i = contentStartIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      const match = line.match(chapterRegex);

      if (match) {
        const chapterNum = parseInt(match[1], 10);
        const chapterTitle = match[2].trim();

        // 过滤特殊情况
        if (!chapterTitle.includes('小剧场') && chapterTitle.length > 0) {
          chapterPositions.push({
            index: i,
            num: chapterNum,
            title: chapterTitle
          });
        }
      }
    }

    // 步骤3：提取每个章节的内容
    const chapters: { id: string; title: string; content: string; }[] = [];

    for (let i = 0; i < chapterPositions.length; i++) {
      const currentChapter = chapterPositions[i];
      const nextChapter = chapterPositions[i + 1];

      const startLine = currentChapter.index + 1;
      const endLine = nextChapter ? nextChapter.index : lines.length;

      const chapterLines = lines.slice(startLine, endLine);
      const chapterContent = chapterLines.join('\n').trim();

      // 只添加非空章节
      if (chapterContent) {
        chapters.push({
          id: `chapter-${currentChapter.num}`,
          title: `${currentChapter.num}.${currentChapter.title}`,
          content: chapterContent
        });
      }
    }

    // 兜底：如果没找到章节，返回全部内容
    if (chapters.length === 0) {
      const fullContent = lines.slice(contentStartIndex).join('\n').trim();
      if (fullContent) {
        chapters.push({
          id: 'chapter-1',
          title: '正剧',
          content: fullContent
        });
      }
    }

    return chapters;
  } catch (error) {
    console.error('Error extracting chapters:', error);
    return [];
  }
}
