Simple utilities for diagnostics and logging

### Installation

```bash
git clone https://github.com/oyamist/just-simple.git
cd just-simple
npm install
npm run test
```

### Example `simpleString(value)`
Use `js.simpleString` to generate a simple string for a data value:

```js
const { js } = require('just-simple').JustSimple;
var addr = {city: "SFO");
js.simpleString(addr); // {city:SFO}
```

You can override the `toString` method of a class to print it simply:

```js
    class Observation {
        constructor(tag, value, text) {
            this.tag = tag;     // an important attribute
            this.value = value; // an important attribute
            this.text = text;   // annotational attribute
        }

        toString() {
            var {
                tag,
                value,
            } = this;
            return `<${tag}:${js.simpleString(value)}>`;
        }
    }

    var ob1 = new Observation('size', 42, 'a universal dimension');
    js.simpleString(ob1); // <size:42>
```

Here is a simple string for a complex value:

```js
var ob2 = new Observation('address', addr, 'an object');

js.simpleString([ob1,[ob2]]);
// [[<size:42>], <address:{city:SFO}>]
```

### Example `logger`
Setting up Winston consistently across different packages is tedious. 
JustSimple.logger provides a bare-bones utilitarian Winston logger instance.

```js
require { logger } = require("just-simple").JustSimple;

logger.info("Hello world");
// 20190926 08:40:17 I Hello world
```

