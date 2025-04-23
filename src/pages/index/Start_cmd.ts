import { Dota2ArgsLiteType } from "@/mod/store";

export const Start_cmd = (
  args: string[],
  regex: Dota2ArgsLiteType['replace'],
  steamCmd?: boolean
): string[] => {
  // 1. 先做占位符替换
  const replaced = args.map(arg =>
    arg.replace(/\{(\w+)\}/g, (_, key) => {
      const val = regex[key as keyof typeof regex];
      return val !== undefined ? String(val) : `{${key}}`;
    })
  );

  // 2. 再对每条替换后的字符串做“合并参数拆分”
  //    用正则 (?=-\w+) 在每个 '-' 前面拆分
  const splitArgs = replaced.flatMap(arg => {
    // 先拆成若干段，去掉空白，再决定是否要拆分
    const parts = arg
      .split(/(?=-\w+)/)
      .map(s => s.trim())
      .filter(s => s !== "");

    // 如果拆出来多于 1 段，就用拆出来的；否则保留原串
    return parts.length > 1 ? parts : [arg];
  });

  // 3. 根据 steamCmd 决定是否加上 '-applaunch 570'
  return steamCmd
    ? ['-applaunch', '570', ...splitArgs]
    : splitArgs;
};
