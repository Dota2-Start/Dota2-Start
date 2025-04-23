import { Dota2ArgsLiteType } from "@/mod/store";

export const Start_cmd = (
  args: string[],
  regex: Dota2ArgsLiteType['replace'],
  steamCmd?: boolean
): string[] => {
  const backData = args.map(arg =>
    arg.replace(/\{(\w+)\}/g, (_, key) => {
        console.log(`Replacing: {${key}} with`, regex[key as keyof typeof regex]);
      const val = regex[key as keyof typeof regex];
      console.log(val);
      
      return val !== undefined ? String(val) : `{${key}}`; // 保留原格式若无匹配
    })
  );
   console.log(regex);
   
  return steamCmd ? ['-applaunch', '570', ...backData] : backData;
};
