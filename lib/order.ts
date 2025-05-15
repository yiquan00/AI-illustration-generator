/**
 * 这个文件包含了一个生成订单号的函数。
 * 使用Snowflake算法生成一个唯一的订单号。
 * 
 * 导出的函数:
 * - genOrderNo: 生成一个唯一的订单号
 */

import { SnowflakeIdv1 } from "simple-flakeid";

export function genOrderNo(): string {
  const gen = new SnowflakeIdv1({ workerId: 1 });
  const snowId = gen.NextId();

  return snowId.toString();
}
