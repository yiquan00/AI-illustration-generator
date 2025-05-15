/**
 * 这个文件包含了一些通用的响应函数。
 * 
 * 导出的函数:
 * - respData: 返回一个包含数据的响应
 * - respOk: 返回一个成功的响应
 * - respErr: 返回一个错误的响应
 * - respJson: 返回一个自定义的响应
 */ 

export function respData(data: any) {
  return respJson(0, "ok", data || []);
}

export function respOk() {
  return respJson(0, "ok");
}

export function respErr(message: string) {
  return respJson(-1, message);
}

export function respJson(code: number, message: string, data?: any) {
  let json = {
    code: code,
    message: message,
    data: data,
  };
  if (data) {
    json["data"] = data;
  }

  return Response.json(json);
}
