import { Dota2ArgsLiteType } from "@/mod/store";

export const Start_cmd = (args: string[], regex: Dota2ArgsLiteType['replace'], steamCmd?: boolean) => {
    const backData = args.map(e => e.replace('{fps}', `${regex.fps}`))
    return steamCmd ? ['-applaunch', '570', ...backData] : backData
}