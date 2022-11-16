export interface ActionSheetButton<T = any> {
    text?: string;
    role?: 'cancel' | 'destructive' | 'selected' | string;
    icon?: string;
    cssClass?: string | string[];
    handler?: () => boolean | void | Promise<boolean | void>;
    data?: T;
}