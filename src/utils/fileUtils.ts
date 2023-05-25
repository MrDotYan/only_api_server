import { stat, mkdirSync, unlinkSync, rmdirSync } from "fs";
import { posix } from "path";

/**
 * 判断文件是否存在
 * @param filePath 文件路径
 * @return 布尔结果 true/false
 */
export async function checkExists(filePath: string): Promise<boolean> {
  return new Promise(resolve => {
    stat(filePath, err => resolve(!err));
  });
}

/**
 * 判断路径是否存在并创建文件目录
 * @param filePath 文件路径不含具体文件
 * @return 路径
 */
export async function checkExistsAndMkdir(filePath: string): Promise<string> {
  const exist = await checkExists(filePath);
  if (!exist) {
    return mkdirSync(filePath, { recursive: true });
  }
  return null;
}

/**
 * 删除文件或文件夹
 * @param absPath 文件绝对路径
 * @return 布尔结果 true/false
 */
export async function deleteFile(absPath: string): Promise<boolean> {
  return new Promise(resolve => {
    stat(absPath, (err, stats) => {
      if (err) return resolve(false);
      if (stats && stats.isFile()) {
        unlinkSync(absPath);
        return resolve(true);
      }
      if (stats && stats.isDirectory()) {
        rmdirSync(absPath);
        return resolve(true);
      }
      return resolve(false);
    });
  });
}

/**
 * 获取文件拓展类型，例 文件.pdf -> pdf
 * @param fileName 文件名
 * @return 文件后缀（不含“.”）
 */
export function getFileExt(fileName: string) {
  const ext = posix.extname(fileName);
  if (!ext) return '';
  return ext.substring(1).toLowerCase();
}