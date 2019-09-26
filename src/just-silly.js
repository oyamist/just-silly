(function(exports) {

    class JustSilly {
        constructor(opts = {}) {
        }

        static get js() { return new JustSilly(); }

        simpleString(value) {
            if (value instanceof Array) {
                var a = value.map((d,i)=> d instanceof Array 
                    ? `${this.simpleString(d)}` 
                    : ""+d
                );
                return `[${a.join(", ")}]`;
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
                return value.toString();
            }
            var keys = Object.keys(value);
            if (keys && keys.length) {
                var kv = keys.map(k => {
                    var v = this.simpleString(value[k]);
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

