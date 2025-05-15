/**
 * 这个文件包含了一些与PDF相关的函数。
 * 
 * 导出的函数:
 * - createPdf: 创建新的PDF记录
 * - getPdfsByCoverUuid: 通过封面UUID获取PDF记录
 */
import { QueryResultRow } from "pg";
import { getDb } from "@/models/db";

export interface PdfData {
  url: string;
  title: string;
  cover_uuid: string;
  uuid: string;
}

export async function createPdf(pdfData: PdfData): Promise<QueryResultRow> {
  const db = await getDb();
  try {
    const { rows } = await db.query(
      `INSERT INTO pdfs (url, title, cover_uuid, uuid)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [pdfData.url, pdfData.title, pdfData.cover_uuid, pdfData.uuid]
    );
    return rows[0];
  } catch (error) {
    console.error('Error creating PDF:', error);
    throw error;
  } finally {
    db.end();
  }
}

export async function getPdfsByCoverUuid(coverUuid: string): Promise<QueryResultRow[]> {
  const db = await getDb();
  try {
    const { rows } = await db.query(
      `SELECT * FROM pdfs WHERE cover_uuid = $1`,
      [coverUuid]
    );
    return rows;
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    throw error;
  } finally {
    db.end();
  }
}
