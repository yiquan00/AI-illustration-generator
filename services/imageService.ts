/**
 * 这个文件包含了一些与图像相关的函数。
 * 
 * 导出的函数:
 * - getImagesByCategoryId: 根据分类ID获取图像
 * - getCoverTags: 获取封面标签
 */
import { getDb } from '@/models/db';

interface Image {
  id: number;
  title: string;
  url: string;
  categoryId: number;
}

export async function getImagesByCategoryId(categoryId: number): Promise<Image[]> {
  const db = getDb();
  try {
    const res = await db.query('SELECT id, title, url, category_id FROM images WHERE category_id = $1', [categoryId]);
    return res.rows.map(row => ({
      id: row.id,
      title: row.title,
      url: row.url,
      categoryId: row.category_id
    }));
  } catch (error) {
    console.error('Failed to retrieve images:', error);
    throw new Error(`Failed to retrieve images: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
// Get cover tags
import { getCoverTags as getCoverTagsModel } from '@/models/cover';

export async function getCoverTags(coverId: number) {
  return await getCoverTagsModel(coverId);
}