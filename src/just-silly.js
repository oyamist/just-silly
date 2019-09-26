(function(exports) {
    const logger = require('./logger');


    class JustSilly {
        constructor(opts = {}) {
        }

        static get js() { return new JustSilly(); }

        get logger() { return logger; }

        simpleString(value) {
            if (value instanceof Array) {
                var a = value.map((d,i)=> this.simpleString(d));
                return `[${a.join(", ")}]`;
            }
            if (value instanceof Date) {
                return value.toLocaleDateString();
            }
            if (value === undefined) {
                return 'undefined';
            }
            if (value === null) {
                return 'null';
            }
            if (typeof value === 'string') {
                return value;
            }
            if (value.toString !== {}.toString) {
                return `${value.toString()}`;
            }
            var keys = Object.keys(value);
            if (keys && keys.length) {
                var kv = keys.map(k => {
                    let vk = value[k]; 
                    let v = this.simpleString(vk);
                    return `${k}:${v}`;
                });
                var s = kv.join(', ');
                return `{${kv}}`;
            }
            return ""+value;
        }

    }

    module.exports = exports.JustSilly = JustSilly;
})(typeof exports === "object" ? exports : (exports = {}));

