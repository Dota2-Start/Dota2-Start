import { Dota2ArgsLiteType } from "@/mod/store";

export const Start_cmd = (
  args: string[],
  regex: Dota2ArgsLiteType['replace'],
  steamCmd?: boolean
): string[] => {
  // 1. 占位符替换
  const replaced = args.map(arg =>
    arg.replace(/\{(\w+)\}/g, (_, key) => {
      const val = regex[key as keyof typeof regex];
      return val !== undefined ? String(val) : `{${key}}`;
    })
  );

  // 2. 按空格拆分参数（支持多个空格和连续分隔）
  const splitArgs = replaced.flatMap(arg => 
    arg.split(/\s+/).filter(s => s !== "") // 拆分并过滤空字符串
  );

  // 3. 处理Steam启动命令
  return steamCmd
    ? ['-applaunch', '570', ...splitArgs]
    : splitArgs;
};