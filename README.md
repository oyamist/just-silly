A library of simple things that are hard to find in other libraries.

### Installation

```bash
git clone https://github.com/oyamist/just-silly.git
cd just-silly
npm install
npm run test
```

### Example `simpleString(value)`
Use `js.simpleString` to generate a simple string for a data value:

```js
const js = require('just-silly').JustSilly.js;
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
