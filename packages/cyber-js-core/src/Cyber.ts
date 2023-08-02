export type Message = {
    type: string,
    data?: { [key: string] : any }
}

export interface NativeAdapter {
    dispatchToNative(message: Message): void
    dispatchToScript(message: Message): void
}

export interface ScriptAdapter {
    dispatchToScript(message: Message): void
}

export interface Middleware {
    dispatchToNative(message: Message): void
    dispatchToScript(message: Message): void
}

export class LoggingMiddleware implements Middleware {
    dispatchToNative(message: Message) {
        console.log("[Script → Native]", message.type, message.data)
    }
    dispatchToScript(message: Message) {
        console.log("[Native → Script]", message.type, message.data)
    }
}

export class Cyber {
    public static nativeAdapter?: NativeAdapter
    public static scriptAdapter?: ScriptAdapter

    public static middlewares: Middleware[] = []

    public static dispatchToNative(message: Message) {
        this.middlewares.forEach(middleware => {
            middleware.dispatchToNative(message)
        });

        if (this.nativeAdapter) {
            this.nativeAdapter.dispatchToNative(message)
        }
    }

    public static dispatchToNativeAfterNextRepaint(message: Message) {
		// Avoid message being queued by call to requestAnimationFrame.
		if (document.hidden) {
			this.dispatchToNative(message)
		} else {
			var postMessage = this.dispatchToNative.bind(this, message)
			requestAnimationFrame(() => {
				requestAnimationFrame(postMessage)
			})
		}
	}

    public static dispatchToScript(message: Message) { 
        this.middlewares.forEach(middleware => {
            middleware.dispatchToScript(message)
        });

        if (this.scriptAdapter) {
            this.scriptAdapter.dispatchToScript(message)
        }
    }

    public static dispatchToScriptAfterNextRepaint(message: Message) {
		// Avoid message being queued by call to requestAnimationFrame.
		if (document.hidden) {
			this.dispatchToScript(message)
		} else {
			var postMessage = this.dispatchToScript.bind(this, message)
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
