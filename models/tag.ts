/**
 * 这个文件包含了一些与标签相关的函数。
 * 
 * 导出的函数:
 * - getAllTags: 获取所有标签
 * - getTagById: 根据ID获取单个标签
 * - addTag: 添加新标签
 * - updateTag: 更新标签
 * - deleteTag: 删除标签
 * - getCoversByTagId: 获取指定标签的所有封面
 */
import { QueryResult } from "pg";
import { getDb } from "./db";

// 定义标签接口
export interface Tag {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

// 获取所有标签
export async function getAllTags(): Promise<Tag[]> {
  const db = getDb();
  try {
    const res = await db.query("SELECT id, name, created_at, updated_at FROM tags ORDER BY name");
    return res.rows.map(row => ({
      id: row.id,
      name: row.name,
      created_at: row.created_at,
      updated_at: row.updated_at
    }));
  } catch (error) {
    console.error('数据库查询失败:', error);
    throw new Error(`获取标签失败: ${error instanceof Error ? error.message : '未知数据库错误'}`);
  }
}

// 根据ID获取单个标签
export async function getTagById(id: number): Promise<Tag | null> {
  const db = getDb();
  const res: QueryResult = await db.query(
    "SELECT id, name, created_at, updated_at FROM tags WHERE id = $1",
    [id]
  );
  
  if (res.rows.length === 0) {
    return null;
  }
  
  const row = res.rows[0];
  return {
    id: row.id,
    name: row.name,
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

// 添加新标签
export async function addTag(name: string): Promise<Tag> {
  const db = getDb();
  const res: QueryResult = await db.query(
    "INSERT INTO tags (name) VALUES ($1) RETURNING id, name, created_at, updated_at",
    [name]
  );
  
  return res.rows[0];
}

// 更新标签
export async function updateTag(id: number, name: string): Promise<boolean> {
  const db = getDb();
  const res: QueryResult = await db.query(
    "UPDATE tags SET name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
    [name, id]
  );
  
  return res.rowCount !== null && res.rowCount > 0;
}

// 删除标签
export async function deleteTag(id: number): Promise<boolean> {
  const db = getDb();
  const res: QueryResult = await db.query(
    "DELETE FROM tags WHERE id = $1",
    [id]
  );
  
  return res.rowCount !== null && res.rowCount > 0;
}

// 获取指定标签的所有封面
export async function getCoversByTagId(tagId: number): Promise<any[]> {
  const db = getDb();
  const res: QueryResult = await db.query(
    `SELECT c.* 
     FROM covers c
     JOIN cover_tags ct ON c.id = ct.cover_id
     WHERE ct.tag_id = $1`,
    [tagId]
  );
  
  return res.rows;
}

// 根据slug获取标签
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const db = getDb();
  const res: QueryResult = await db.query(
    "SELECT id, name, created_at, updated_at FROM tags WHERE name = $1",
    [decodeURIComponent(slug)]
  );
  
  if (res.rows.length === 0) {
    return null;
  }
  
  const row = res.rows[0];
  return {
    id: row.id,
    name: row.name,
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

// 根据slug获取标签下的所有封面
export async function getCoversByTagSlug(slug: string): Promise<any[]> {
  const db = getDb();
  const res = await db.query(
    `SELECT c.id, c.img_description, c.img_url, c.slug
     FROM covers c
     JOIN cover_tags ct ON c.id = ct.cover_id
     JOIN tags t ON ct.tag_id = t.id
     WHERE t.name = $1`,
    [decodeURIComponent(slug)]
  );
  
  return res.rows;
}
