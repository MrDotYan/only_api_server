import { isNotEmpty } from "./toolUtils";

/**
 * 获取用户UA
 * @param header 
 * @returns 
 */
export function getUA(header:object) {
  if(!isNotEmpty(header)) return '未知';
  return header['user-agent'] ?? '未知';
}

export function getIP(req:object) {
  if(!isNotEmpty(req)) return '未知';
  return req['ip'];
}