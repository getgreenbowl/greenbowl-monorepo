declare const _Object: Readonly<{
    exclude: <T, K extends keyof T>(obj: T, exclude: K[]) => T;
    deepClone: (obj: Record<string, unknown>) => Record<string, unknown>;
    refine: <T_1, K_1 extends keyof T_1>(obj: T_1) => T_1;
    merge: (obj: any, add: any) => any;
}>;

export { _Object };
