(function(exports) {
    class JustSimple {
        constructor(opts = {}) {
            this.s = this.simpleString; // synonym
        }

        static get js() { return new JustSimple(); }
        static get logger() { 
            return require('./logger'); 
        }
        static get LOCAL_DIR() {
            var fs = require('fs');
            var path = require('path');
            var appdir = __dirname.replace(/\/node_modules\/.*/, '');
            if (appdir === __dirname) {
                appdir = path.join(__dirname, '..');
            }
            var local = path.join(appdir, 'local');
            if (!fs.existsSync(local)) {
                fs.mkdirSync(local);
            }

            return local;
        }

        get logger() { return JustSimple.logger; }
        get LOCAL_DIR() { return JustSimple.LOCAL_DIR; }

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

    module.exports = exports.JustSimple = JustSimple;
})(typeof exports === "object" ? exports : (exports = {}));

