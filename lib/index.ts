/**
 * 这个文件包含了一些通用的工具函数。
 * 目前只有一个生成UUID的函数，但未来可能会添加更多功能。
 * 
 * 导出的函数:
 * - genUuid: 生成一个唯一的UUID字符串
 */

import { v4 as uuidv4 } from "uuid";

export function genUuid(): string {
  return uuidv4();
}
