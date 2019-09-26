(typeof describe === 'function') && describe("just-silly", function() {
    const should = require("should");
    const js = require('../index').JustSilly.js;

    class Observation {
        constructor(tag, value, text) {
            this.tag = tag;
            this.value = value;
            this.text = text;
        }

        toString() {
            var {
                tag,
                value,
            } = this;
            return `${tag}:${value}`;
        }
    }

    it("simpleString(value) summarizes values", ()=>{
        should(js.simpleString(null)).equal('null');
        should(js.simpleString(undefined)).equal('undefined');
        should(js.simpleString(1.2)).equal('1.2');
        should(js.simpleString('abc')).equal('abc');
        should(js.simpleString([])).equal('[]');
        should(js.simpleString(['a'])).equal('[a]');
        should(js.simpleString(['a','b'])).equal('[a, b]');
        should(js.simpleString(['a',1])).equal('[a, 1]');
        should(js.simpleString(['a',[2,[3]],4]))
            .equal('[a, [2, [3]], 4]');
        var ob1 = new Observation('size', 42);
        var ob2 = new Observation('color','red');
        should(js.simpleString(ob1)).equal('size:42');
        should(js.simpleString([[ob1],ob2]))
            .equal('[[size:42], color:red]');
        should(js.simpleString({a:1})).equal('{a:1}');
    });

})
