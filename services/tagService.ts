/**
 * 这个文件包含了一些与标签相关的函数。
 * 
 * 导出的函数:
 * - getAllTags: 获取所有标签
 * - getTagById: 根据ID获取单个标签
 * - getCoversByTagId: 获取指定标签的所有封面
 */
import { getDb } from '@/models/db';
import { Cover } from '@/types/cover';
import { getTagBySlug as getTagBySlugModel, getCoversByTagSlug as getCoversByTagSlugModel } from '@/models/tag';
import { addCoverTag as addCoverTagModel } from '@/models/cover';

// 在文件顶部定义 Tag 接口
interface Tag {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  count?: number;  // 添加可选的 count 属性
}

export class TagService {
  async getAllTags(): Promise<Tag[]> {
    const db = getDb();
    try {
      // 修改查询以正确计算每个标签的封面数量
      const { rows } = await db.query(`
        SELECT 
          t.id, 
          t.name, 
          t.created_at, 
          t.updated_at,
          COALESCE(COUNT(ct.cover_id), 0)::integer as count
        FROM tags t
        LEFT JOIN cover_tags ct ON t.id = ct.tag_id
        GROUP BY t.id, t.name, t.created_at, t.updated_at
        ORDER BY t.name
      `);

      // 调试输出
      console.log('Tags with counts:', rows);

      return rows;
    } catch (error) {
      console.error('Error fetching tags with counts:', error);
      throw error;
    }
  }

  async getTagById(id: number): Promise<Tag | null> {
    const db = getDb();
    const { rows } = await db.query('SELECT * FROM tags WHERE id = $1', [id]);
    return rows[0] || null;
  }

  async getCoversByTagId(tagId: number): Promise<Cover[]> {
    const db = getDb();
    const { rows } = await db.query(`
      SELECT c.id, c.img_description, c.img_url, c.slug
      FROM covers c
      JOIN cover_tags ct ON c.id = ct.cover_id
      WHERE ct.tag_id = $1 AND c.status = 1
      ORDER BY c.created_at DESC
    `, [tagId]);
    
    return rows;
  }

  async getTagBySlug(slug: string) {
    return await getTagBySlugModel(slug);
  }

  async getCoversByTagSlug(slug: string) {
    return await getCoversByTagSlugModel(slug);
  }

  async addCoverTag(coverId: number, tagId: number): Promise<boolean> {
    try {
      const result = await addCoverTagModel(coverId, tagId);
      return result;
    } catch (error) {
      console.error('Error in TagService.addCoverTag:', error);
      return false;
    }
  }
}
