/**
 * 这个文件包含了一些与封面相关的函数。
 * 
 * 导出的函数:
 * - insertCover: 插入新的封面记录到数据库
 * - getCoversCount: 获取封面总数
 * - getUserCoversCount: 获取特定用户的封面数量
 * - findCoverById: 通过ID查找封面
 * - findCoverByUuid: 通过UUID查找封面
 */
import { QueryResult, QueryResultRow } from "pg";
import { Cover } from "../types/cover";
import { getDb } from "./db";

// 定义标签接口
export interface Tag {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
// 插入新的封面记录到数据库
export async function insertCover(cover: Cover) {
  const db = getDb();
  const res = await db.query(
    `INSERT INTO covers 
        (user_email, img_description, original_description, img_size, img_url, llm_name, llm_params, created_at, uuid, status, category_id, slug) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
    `,
    [
      cover.user_email,
      cover.img_description,
      cover.original_description || cover.img_description,
      cover.img_size,
      cover.img_url,
      cover.llm_name,
      cover.llm_params,
      cover.created_at,
      cover.uuid,
      cover.status,
      cover.category_id,
      cover.slug,
    ]
  );

  return res.rows[0]; // 直接返回插入的记录
}

// 获取封面总数
export async function getCoversCount(): Promise<number> {
  const db = getDb();
  const res = await db.query(`SELECT count(1) as count FROM covers`);
  if (res.rowCount === 0) {
    return 0;
  }

  const { rows } = res;
  const row = rows[0];

  return row.count;
}

// 获取特定用户的封面数量
export async function getUserCoversCount(user_email: string): Promise<number> {
  const db = getDb();
  const res = await db.query(
    `SELECT count(1) as count FROM covers WHERE user_email = $1`,
    [user_email]
  );
  if (res.rowCount === 0) {
    return 0;
  }

  const { rows } = res;
  const row = rows[0];

  return row.count;
}

// 通过ID查找封面
export async function findCoverById(id: number): Promise<Cover | undefined> {
  const db = getDb();
  const res = await db.query(
    `SELECT w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar, c.id as category_id, c.name as category_name
     FROM covers as w 
     LEFT JOIN users as u ON w.user_email = u.email
     LEFT JOIN categories as c ON w.category_id = c.id
     WHERE w.id = $1`,
    [id]
  );
  if (res.rowCount === 0) {
    return;
  }

  const cover = formatCover(res.rows[0]);

  return cover;
}

// 通过UUID查找封面
export async function findCoverByUuid(uuid: string): Promise<Cover | undefined> {
  const db = getDb();
  const res = await db.query(
    `SELECT w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar, c.id as category_id, c.name as category_name
     FROM covers as w 
     LEFT JOIN users as u ON w.user_email = u.email
     LEFT JOIN categories as c ON w.category_id = c.id
     WHERE w.uuid = $1`,
    [uuid]
  );
  if (res.rowCount === 0) {
    return;
  }

  const cover = formatCover(res.rows[0]);

  return cover;
}

// 获取随机封面列表
export async function getRandCovers(page: number, limit: number): Promise<Cover[]> {
  if (page <= 0) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `SELECT w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar, c.id as category_id, c.name as category_name
     FROM covers as w 
     LEFT JOIN users as u ON w.user_email = u.email
     LEFT JOIN categories as c ON w.category_id = c.id
     WHERE w.status = 1 
     ORDER BY random() 
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  if (res.rowCount === 0) {
    return [];
  }

  const covers = getCoversFromSqlResult(res);

  return covers;
}

// 获取封面列表
export async function getCovers(page: number, limit: number): Promise<Cover[]> {
  if (page < 1) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `SELECT w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar, c.id as category_id, c.name as category_name
     FROM covers as w 
     LEFT JOIN users as u ON w.user_email = u.email
     LEFT JOIN categories as c ON w.category_id = c.id
     WHERE w.status = 1 
     ORDER BY w.created_at DESC 
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  if (res.rowCount === 0) {
    return [];
  }

  const covers = getCoversFromSqlResult(res);

  return covers;
}

// 从SQL查询结果中提取封面数据
export function getCoversFromSqlResult(res: QueryResult<QueryResultRow>): Cover[] {
  if (!res.rowCount || res.rowCount === 0) {
    return [];
  }

  const covers: Cover[] = [];
  const { rows } = res;
  rows.forEach((row) => {
    const cover = formatCover(row);
    if (cover) {
      covers.push(cover);
    }
  });

  return covers;
}

// 格式化单个封面数据
export function formatCover(row: QueryResultRow): Cover | undefined {
  let cover: Cover = {
    id: row.id,
    user_email: row.user_email,
    img_description: row.img_description,
    original_description: row.original_description || row.img_description,
    img_size: row.img_size,
    img_url: row.img_url,
    llm_name: row.llm_name,
    llm_params: row.llm_params,
    created_at: row.created_at,
    uuid: row.uuid,
    status: row.status,
    category_id: row.category_id,
    category_name: row.category_name,
    slug: row.slug,
  };

  // 如果有用户信息，添加到封面对象中
  if (row.user_name || row.user_avatar) {
    cover.created_user = {
      email: row.user_email,
      nickname: row.user_name,
      avatar_url: row.user_avatar,
      uuid: row.user_uuid,
    };
  }

  // 尝试解析 llm_params
  try {
    cover.llm_params = JSON.parse(JSON.stringify(cover.llm_params));
  } catch (e) {
    console.log("parse cover llm_params failed: ", e);
  }

  return cover;
}

// 通过分类ID获取封面列表
export async function getCoversByCategoryId(categoryId: number, page: number = 1, limit: number = 50): Promise<Cover[]> {
  if (page < 1) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `SELECT w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar, c.id as category_id, c.name as category_name
     FROM covers as w 
     LEFT JOIN users as u ON w.user_email = u.email 
     LEFT JOIN categories as c ON w.category_id = c.id
     WHERE w.status = 1 AND w.category_id = $1 
     ORDER BY w.created_at DESC 
     LIMIT $2 OFFSET $3`,
    [categoryId, limit, offset]
  );

  return getCoversFromSqlResult(res);
}

// 获取封面关联的标签
export async function getCoverTags(coverId: number): Promise<Tag[]> {
  const db = getDb();
  const res = await db.query(
    `SELECT t.id, t.name
     FROM tags t
     JOIN cover_tags ct ON t.id = ct.tag_id
     WHERE ct.cover_id = $1
     ORDER BY t.name`,
    [coverId]
  );
  
  return res.rows;
}

// 添加封面标签关联关系
export async function addCoverTag(coverId: number, tagId: number): Promise<boolean> {
  const db = getDb();
  try {
    const res = await db.query(
      'INSERT INTO cover_tags (cover_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [coverId, tagId]
    );
    return res.rowCount !== null && res.rowCount > 0;
  } catch (error) {
    console.error('添加封面标签失败:', error);
    return false;
  }
}

interface CoverWithRedirect extends Cover {
  redirect?: boolean;
  redirectUrl?: string;
}

export async function getCoverByIdentifier(identifier: string): Promise<CoverWithRedirect | null> {
  const db = await getDb();
  
  try {
    // 1. 首先通过 slug 查询
    const { rows } = await db.query<Cover>(
      "SELECT * FROM covers WHERE slug = $1",
      [identifier]
    );
    
    if (rows.length > 0) {
      return rows[0];  // 如果找到了，直接返回
    }
    
    // 2. 如果通过 slug 没找到，尝试通过 uuid 查询
    const uuidResult = await db.query<Cover>(
      "SELECT * FROM covers WHERE uuid = $1",
      [identifier]
    );
    
    // 3. 如果通过 uuid 找到了，添加重定向信息
    if (uuidResult.rows.length > 0) {
      const cover = uuidResult.rows[0];
      return {
        ...cover,
        redirect: true,
        redirectUrl: `/detail/${cover.slug}` // 新路径
      };
    }
    
    return null;  // 4. 如果都没找到，返回 null
  } catch (error) {
    console.error("Failed to get cover by identifier:", error);
    return null;
  }
}
