export type Action = {
    type: string,
    data?: { [key: string] : any }
}

export interface NativeAdapter {
    dispatchToNative(action: Action): void
    dispatchToScript(action: Action): void
}

export interface ScriptAdapter {
    dispatchToScript(action: Action): void
}

export interface Middleware {
    dispatchToNative(action: Action): void
    dispatchToScript(action: Action): void
}

export class LoggingMiddleware implements Middleware {
    dispatchToNative(action: Action) {
        console.log("[Script → Native]", action.type, action.data)
    }
    dispatchToScript(action: Action) {
        console.log("[Native → Script]", action.type, action.data)
    }
}

export class Cyber {
    public static nativeAdapter?: NativeAdapter
    public static scriptAdapter?: ScriptAdapter

    public static middlewares: Middleware[] = []

    public static dispatchToNative(action: Action) {
        this.middlewares.forEach(middleware => {
            middleware.dispatchToNative(action)
        });

        if (this.nativeAdapter) {
            this.nativeAdapter.dispatchToNative(action)
        }
    }

    public static dispatchToNativeAfterNextRepaint(action: Action) {
		// Avoid message being queued by call to requestAnimationFrame.
		if (document.hidden) {
			this.dispatchToNative(action)
		} else {
			var postMessage = this.dispatchToNative.bind(this, action)
			requestAnimationFrame(() => {
				requestAnimationFrame(postMessage)
			})
		}
	}

    public static dispatchToScript(action: Action) { 
        this.middlewares.forEach(middleware => {
            middleware.dispatchToScript(action)
        });

        if (this.scriptAdapter) {
            this.scriptAdapter.dispatchToScript(action)
        }
    }

    public static dispatchToScriptAfterNextRepaint(action: Action) {
		// Avoid message being queued by call to requestAnimationFrame.
		if (document.hidden) {
			this.dispatchToScript(action)
		} else {
			var postMessage = this.dispatchToScript.bind(this, action)
			requestAnimationFrame(() => {
				requestAnimationFrame(postMessage)
			})
		}
	}
}

declare global {
    interface Window {
        Cyber: typeof Cyber
    }
}

// Check for window to support server-side rendering.
if (typeof window !== "undefined") {
    (window as any).Cyber = Cyber

    // Raise event to notify that Cyber has loaded.
    const event = new Event("cyber:load", { bubbles: true, cancelable: false })
    document.dispatchEvent(event)
}
