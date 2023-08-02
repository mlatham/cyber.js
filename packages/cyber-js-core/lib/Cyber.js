var LoggingMiddleware = /** @class */ (function () {
    function LoggingMiddleware() {
    }
    LoggingMiddleware.prototype.dispatchToNative = function (name, data) {
        console.log("[Script → Native]", name, data);
    };
    LoggingMiddleware.prototype.dispatchToScript = function (name, data) {
        console.log("[Native → Script]", name, data);
    };
    return LoggingMiddleware;
}());
export { LoggingMiddleware };
export var Cyber = /** @class */ (function () {
    function Cyber() {
    }
    Cyber.dispatchToNative = function (name, data) {
        this.middlewares.forEach(function (middleware) {
            middleware.dispatchToNative(name, data);
        });
        if (this.nativeAdapter) {
            this.nativeAdapter.dispatchToNative(name, data);
        }
    };
    Cyber.dispatchToNativeAfterNextRepaint = function (name, data) {
        // Avoid message being queued by call to requestAnimationFrame.
        if (document.hidden) {
            this.dispatchToNative(name, data);
        }
        else {
            var postMessage = this.dispatchToNative.bind(this, name, data);
            requestAnimationFrame(function () {
                requestAnimationFrame(postMessage);
            });
        }
    };
    Cyber.dispatchToScript = function (name, data) {
        this.middlewares.forEach(function (middleware) {
            middleware.dispatchToScript(name, data);
        });
        if (this.scriptAdapter) {
            this.scriptAdapter.dispatchToScript(name, data);
        }
    };
    Cyber.dispatchToScriptAfterNextRepaint = function (name, data) {
        // Avoid message being queued by call to requestAnimationFrame.
        if (document.hidden) {
            this.dispatchToScript(name, data);
        }
        else {
            var postMessage = this.dispatchToScript.bind(this, name, data);
            requestAnimationFrame(function () {
                requestAnimationFrame(postMessage);
            });
        }
    };
    Cyber.middlewares = [];
    return Cyber;
}());
window.Cyber = Cyber;
// Raise event to notify that Cyber has loaded.
var event = new Event("cyber:load", { bubbles: true, cancelable: false });
document.dispatchEvent(event);
//# sourceMappingURL=Cyber.js.map