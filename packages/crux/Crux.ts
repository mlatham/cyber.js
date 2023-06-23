export interface NativeAdapter {
    dispatchToNative(name: string, data?: { [key: string] : any }): void;
    dispatchToScript(name: string, data?: { [key: string] : any }): void;
}

export interface ScriptAdapter {
    dispatchToScript(name: string, data?: { [key: string] : any }): void;
}

export interface Middleware {
    dispatchToNative(name: string, data?: { [key: string] : any }): void;
    dispatchToScript(name: string, data?: { [key: string] : any }): void;
}

export class LoggingMiddleware implements Middleware {
    dispatchToNative(name: string, data?: { [key: string] : any }) {
        console.log("[Script → Native]", name, data);
    }
    dispatchToScript(name: string, data?: { [key: string] : any }) {
        console.log("[Native → Script]", name, data);
    }
}

export default class Crux {
    public static nativeAdapter?: NativeAdapter;
    public static scriptAdapter?: ScriptAdapter;

    public static middlewares: Middleware[] = [];

    public static dispatchToNative(name: string, data?: { [key: string] : any }) {
        this.middlewares.forEach(middleware => {
            middleware.dispatchToNative(name, data);
        });

        if (this.nativeAdapter) {
            this.nativeAdapter.dispatchToNative(name, data);
        }
    }

    public static dispatchToNativeAfterNextRepaint(name: string, data?: { [key: string] : any }) {
		// Avoid message being queued by call to requestAnimationFrame.
		if (document.hidden) {
			this.dispatchToNative(name, data);
		} else {
			var postMessage = this.dispatchToNative.bind(this, name, data)
			requestAnimationFrame(() => {
				requestAnimationFrame(postMessage)
			})
		}
	}

    public static dispatchToScript(name: string, data?: { [key: string] : any }) { 
        this.middlewares.forEach(middleware => {
            middleware.dispatchToScript(name, data);
        });
        
        if (this.scriptAdapter) {
            this.scriptAdapter.dispatchToScript(name, data);
        }
    }

    public static dispatchToScriptAfterNextRepaint(name: string, data?: { [key: string] : any }) {
		// Avoid message being queued by call to requestAnimationFrame.
		if (document.hidden) {
			this.dispatchToScript(name, data);
		} else {
			var postMessage = this.dispatchToScript.bind(this, name, data)
			requestAnimationFrame(() => {
				requestAnimationFrame(postMessage)
			})
		}
	}
}

declare global {
    interface Window {
        Crux: typeof Crux
    }
}

(window as any).Crux = Crux

// Raise event to notify that Crux has loaded.
const event = new Event("crux:load", { bubbles: true, cancelable: false })
document.dispatchEvent(event)
