import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const navigatorlLanguage = navigator.language
export interface Dota2PathType {
    path: string;
    exe: string;
    isExe: boolean;
    steamExt: string;
    setDota2File: (e: Partial<Dota2PathType>) => void
}

export interface Dota2ArgsLiteType {
    args: string[];
    setArgs: (e: Dota2ArgsLiteType['args']) => void
}
export const Dota2File = create<Dota2PathType>((set) => ({
    path: '',
    exe: '',
    isExe: false,
    steamExt: '',
    setDota2File: (e) => set((state) => ({
        ...state, // 保留现有的状态
        ...e,     // 更新传入的字段
    })),
}
))
export interface AppDataType {
    Skipversion: string;
    Language: string;
    setAppData: (e: Partial<AppDataType>) => void
}
// 使用双调用语法创建 store
export const AppDataStore = create<AppDataType>()(
    persist(
        (set) => ({
            Skipversion: '',
            Language: navigatorlLanguage,
            setAppData: (e) => set((err) => ({
                ...err, // 保留现有的状态
                ...e,     // 更新传入的字段
            })),
        }),
        {
            name: 'Dota2Start-local-AppData', // 存储在 localStorage 中的 key
        }
    )
);

// 使用双调用语法创建 store
export const Dota2ArgsLite = create<Dota2ArgsLiteType>()(
    persist(
        (set) => ({
            args: [],
            setArgs: (args: Dota2ArgsLiteType['args']) => set({ args }),
        }),
        {
            name: 'Dota2Start-local-Dota2SargsLite', // 存储在 localStorage 中的 key
        }
    )
); 
