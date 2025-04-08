export interface VersionInfo {
    version: string;
    // 如果存在预发行标识，则会在对象中以对应 key 返回版本号，如 beta: "12"
    beta?: string;
    alpha?: string;
    rc?: string;
  }
  
 export function parseVersion(versionStr: string): VersionInfo {
    // 使用 '-' 分割，第一部分为主版本号，第二部分为预发行标识（如果存在）
    const [main, preRelease] = versionStr.split("-", 2);
    const result: VersionInfo = { version: main };
  
    if (preRelease) {
      // 预发行标识通常形如 beta.12 或 alpha.1
      const parts = preRelease.split(".");
      if (parts.length === 2) {
        const [label, preVersion] = parts;
        result[label] = preVersion;
      } else {
        // 如果预发行部分格式不符合标准，则直接将整个字符串作为 key，值为空
        result[preRelease] = "";
      }
    }
  
    return result;
  }
   