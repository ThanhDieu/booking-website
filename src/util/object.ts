import { StarpiDefaultType } from "@/types/globalType/globalType";

export const deepEqual = <T>(obj1: T, obj2: T): boolean => {
    if (obj1 === obj2) return true;
    if (!obj1 || !obj2) return false
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

    const keys1 = Object.keys(obj1) as (keyof T)[];
    const keys2 = Object.keys(obj2) as (keyof T)[];

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
};

export const deepFieldObjStarpi = <T = any>(obj?: StarpiDefaultType<T>) => {
    return obj?.data?.attributes as T
}