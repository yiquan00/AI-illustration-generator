/**
 * 这个文件包含了一些与S3相关的函数。
 * 
 * 导出的函数:
 * - uploadImageToR2: 上传图片到R2
 * - uploadPDFToR2: 上传PDF到R2
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_AK || "",
    secretAccessKey: process.env.AWS_SK || "",
  },
  region: process.env.AWS_REGION_R2 || "auto",
  endpoint: process.env.AWS_ENDPOINT,
});

// Keep the original image upload function unchanged
export async function uploadImageToR2(
  imageUrl: string,
  s3Key: string
): Promise<string> {
  try {
    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'arraybuffer',
      timeout: 30000 // 30 second timeout
    });

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: s3Key,
      Body: response.data,
      ContentType: response.headers['content-type'],
    });

    await s3Client.send(command);

    return `${process.env.R2_PUBLIC_URL}/${s3Key}`;
  } catch (error: any) {
    console.error("Failed to upload to R2:", error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}

// New PDF upload function
export async function uploadPDFToR2(
  pdfBuffer: ArrayBuffer,
  s3Key: string
): Promise<string> {
  try {
    console.log('Starting PDF upload to R2, S3 Key:', s3Key);
    
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: s3Key,
      Body: Buffer.from(pdfBuffer),
      ContentType: 'application/pdf',
    });

    await s3Client.send(command);
    console.log('PDF upload successful');

    const url = `${process.env.R2_PUBLIC_URL}/${s3Key}`;
    console.log('Generated URL:', url);
    return url;
  } catch (error: any) {
    console.error("Failed to upload PDF to R2:", error);
    throw new Error(`Failed to upload PDF: ${error.message}`);
  }
}
