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
var Crux = /** @class */ (function () {
    function Crux() {
    }
    Crux.dispatchToNative = function (name, data) {
        this.middlewares.forEach(function (middleware) {
            middleware.dispatchToNative(name, data);
        });
        if (this.nativeAdapter) {
            this.nativeAdapter.dispatchToNative(name, data);
        }
    };
    Crux.dispatchToNativeAfterNextRepaint = function (name, data) {
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
    Crux.dispatchToScript = function (name, data) {
        this.middlewares.forEach(function (middleware) {
            middleware.dispatchToScript(name, data);
        });
        if (this.scriptAdapter) {
            this.scriptAdapter.dispatchToScript(name, data);
        }
    };
    Crux.dispatchToScriptAfterNextRepaint = function (name, data) {
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
    Crux.middlewares = [];
    return Crux;
}());
export default Crux;
window.Crux = Crux;
// Raise event to notify that Crux has loaded.
var event = new Event("crux:load", { bubbles: true, cancelable: false });
document.dispatchEvent(event);
//# sourceMappingURL=Crux.js.map