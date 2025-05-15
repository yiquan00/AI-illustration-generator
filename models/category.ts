/**
 * 这个文件包含了一些与分类相关的函数。
 * 
 * 导出的函数:
 * - getAllCategories: 获取所有分类
 * - getCategoryById: 根据ID获取单个分类
 * - getTopLevelCategories: 获取顶级分类
 * - getChildCategories: 获取指定父分类的子分类
 * - addCategory: 添加新分类
 * - updateCategory: 更新分类
 * - deleteCategory: 删除分类
 */
import { QueryResult } from "pg";
import { getDb } from "./db";

// 定义分类接口
interface Category {
  id: number;
  name: string;
  parentId: number | null;
  level: number;
  previewImage: string | null;
}

// 获取所有分类
export async function getAllCategories(): Promise<Category[]> {
  const db = getDb();
  try {
    const res = await db.query(
      "SELECT id, name, parent_id, level, preview_image FROM categories ORDER BY level, name"
    );
    return res.rows.map(row => ({
      id: row.id,
      name: row.name,
      parentId: row.parent_id,
      level: row.level,
      previewImage: row.preview_image
    }));
  } catch (error) {
    console.error('数据库查询失败:', error);
    throw new Error(`获取分类失败: ${error instanceof Error ? error.message : '未知数据库错误'}`);
  }
}

// 根据ID获取单个分类
export async function getCategoryById(id: number): Promise<Category | null> {
  const db = getDb();
  const res: QueryResult = await db.query(
    "SELECT id, name, parent_id, level, preview_image FROM categories WHERE id = $1",
    [id]
  );
  
  if (res.rows.length === 0) {
    return null;
  }
  
  const row = res.rows[0];
  return {
    id: row.id,
    name: row.name,
    parentId: row.parent_id,
    level: row.level,
    previewImage: row.preview_image
  };
}

// 获取顶级分类（没有父分类的分类）
export async function getTopLevelCategories(): Promise<Category[]> {
  const db = getDb();
  const res: QueryResult = await db.query(
    "SELECT id, name, parent_id, level, preview_image FROM categories WHERE parent_id IS NULL ORDER BY name"
  );
  
  return res.rows.map(row => ({
    id: row.id,
    name: row.name,
    parentId: row.parent_id,
    level: row.level,
    previewImage: row.preview_image
  }));
}

// 获取指定父分类的子分类
export async function getChildCategories(parentId: number): Promise<Category[]> {
  const db = getDb();
  const res: QueryResult = await db.query(
    "SELECT id, name, parent_id, level, preview_image FROM categories WHERE parent_id = $1 ORDER BY name",
    [parentId]
  );
  
  return res.rows.map(row => ({
    id: row.id,
    name: row.name,
    parentId: row.parent_id,
    level: row.level,
    previewImage: row.preview_image
  }));
}

// 添加新分类
export async function addCategory(category: Omit<Category, 'id'>): Promise<Category> {
  const db = getDb();
  const res: QueryResult = await db.query(
    "INSERT INTO categories (name, parent_id, level, preview_image) VALUES ($1, $2, $3, $4) RETURNING id",
    [category.name, category.parentId, category.level, category.previewImage]
  );
  
  const newId = res.rows[0].id;
  return { id: newId, ...category };
}

// 更新分类
export async function updateCategory(category: Category): Promise<boolean> {
  const db = getDb();
  const res: QueryResult = await db.query(
    "UPDATE categories SET name = $1, parent_id = $2, level = $3, preview_image = $4 WHERE id = $5",
    [category.name, category.parentId, category.level, category.previewImage, category.id]
  );
  
  return res.rowCount !== null && res.rowCount > 0;
}

// 删除分类
export async function deleteCategory(id: number): Promise<boolean> {
  const db = getDb();
  const res: QueryResult = await db.query(
    "DELETE FROM categories WHERE id = $1",
    [id]
  );
  
  return res.rowCount !== null && res.rowCount > 0;
}

// 获取分类及其所有祖先
export async function getCategoryWithAncestors(categoryId: number): Promise<Category[]> {
    const db = getDb();
    try {
      const query = `
        WITH RECURSIVE category_tree AS (
          SELECT id, name, parent_id, level, preview_image
          FROM categories
          WHERE id = $1
          UNION ALL
          SELECT c.id, c.name, c.parent_id, c.level, c.preview_image
          FROM categories c
          JOIN category_tree ct ON c.id = ct.parent_id
        )
        SELECT * FROM category_tree ORDER BY level;
      `;
      const res = await db.query(query, [categoryId]);
      return res.rows.map(mapRowToCategory);
    } catch (error) {
      console.error('获取分类及其祖先失败:', error);
      throw new Error(`获取分类及其祖先失败: ${error instanceof Error ? error.message : '未知数据库错误'}`);
    }
  }
  
  // 辅助函数：将数据库行映射到Category对象
  function mapRowToCategory(row: any): Category {
    return {
      id: row.id,
      name: row.name,
      parentId: row.parent_id,
      level: row.level,
      previewImage: row.preview_image
    };
  }

//    通过分类名称查找分类信息
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const db = getDb();
  const res: QueryResult = await db.query(
    "SELECT id, name, parent_id, level, preview_image FROM categories WHERE LOWER(name) = LOWER($1)",
    [decodeURIComponent(slug)]
  );
  
  if (res.rows.length === 0) {
    return null;
  }
  
  const row = res.rows[0];
  return {
    id: row.id,
    name: row.name,
    parentId: row.parent_id,
    level: row.level,
    previewImage: row.preview_image
  };
}

export async function getCoversByCategorySlug(categoryNameOrId: string | number): Promise<any[]> {
  const db = getDb();
  
  // 如果是数字（category_id），使用 ID 查询
  if (typeof categoryNameOrId === 'number') {
    const res: QueryResult = await db.query(
      `SELECT c.*, cat.name as category_name 
       FROM covers c
       JOIN categories cat ON c.category_id = cat.id
       WHERE c.category_id = $1
       ORDER BY c.created_at DESC`,
      [categoryNameOrId]
    );
    return res.rows;
  }
  
  // 如果是字符串（category_name），使用名称查询
  const res: QueryResult = await db.query(
    `SELECT c.*, cat.name as category_name 
     FROM covers c
     JOIN categories cat ON c.category_id = cat.id
     WHERE LOWER(cat.name) = LOWER($1)
     ORDER BY c.created_at DESC`,
    [decodeURIComponent(categoryNameOrId)]
  );
  
  return res.rows;
}
