/**
 * 这个文件包含了一些通用的工具函数。
 * 
 * 导出的函数:
 * - cn: 合并多个CSS类
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
