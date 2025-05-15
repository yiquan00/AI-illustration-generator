/**
 * 这个文件包含了一些与PDF相关的函数。
 * 
 * 导出的函数:
 * - getPdfByCoverUuidService: 通过封面UUID获取PDF记录
 * - createPdfService: 创建新的PDF记录
 */
import { getDb } from "../models/db";

export async function getPdfByCoverUuidService(coverUuid: string) {
  const pool = getDb();
  try {
    const result = await pool.query('SELECT * FROM pdfs WHERE cover_uuid = $1', [coverUuid]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error in getPdfByCoverUuidService:', error);
    throw error;
  }
}

export async function createPdfService(pdfData: any) {
  const pool = getDb();
  try {
    const { url, title, cover_uuid, uuid } = pdfData;
    console.log("Creating PDF with data:", JSON.stringify({ url, title, cover_uuid, uuid }, null, 2));

    if (!cover_uuid) {
      throw new Error('Cover UUID is required');
    }

    const result = await pool.query(
      'INSERT INTO pdfs (cover_uuid, url, title, uuid) VALUES ($1::uuid, $2, $3, $4::uuid) RETURNING *',
      [cover_uuid, url, title, uuid]
    );
    console.log("Inserted PDF:", JSON.stringify(result.rows[0], null, 2));
    return result.rows[0];
  } catch (error: any) {
    console.error('创建PDF服务时出错:', error);
    if (error.code === '23502') { // 非空约束违反
      console.error('详细错误:', error.detail);
      console.error('导致错误的PDF数据:', JSON.stringify(pdfData, null, 2));
    }
    throw error;
  }
}
