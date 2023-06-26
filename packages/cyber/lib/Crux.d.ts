export interface NativeAdapter {
    dispatchToNative(name: string, data?: {
        [key: string]: any;
    }): void;
    dispatchToScript(name: string, data?: {
        [key: string]: any;
    }): void;
}
export interface ScriptAdapter {
    dispatchToScript(name: string, data?: {
        [key: string]: any;
    }): void;
}
export interface Middleware {
    dispatchToNative(name: string, data?: {
        [key: string]: any;
    }): void;
    dispatchToScript(name: string, data?: {
        [key: string]: any;
    }): void;
}
export declare class LoggingMiddleware implements Middleware {
    dispatchToNative(name: string, data?: {
        [key: string]: any;
    }): void;
    dispatchToScript(name: string, data?: {
        [key: string]: any;
    }): void;
}
export default class Cyber {
    static nativeAdapter?: NativeAdapter;
    static scriptAdapter?: ScriptAdapter;
    static middlewares: Middleware[];
    static dispatchToNative(name: string, data?: {
        [key: string]: any;
    }): void;
    static dispatchToNativeAfterNextRepaint(name: string, data?: {
        [key: string]: any;
    }): void;
    static dispatchToScript(name: string, data?: {
        [key: string]: any;
    }): void;
    static dispatchToScriptAfterNextRepaint(name: string, data?: {
        [key: string]: any;
    }): void;
}
declare global {
    interface Window {
        Cyber: typeof Cyber;
    }
}
