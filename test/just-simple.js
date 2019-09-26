(typeof describe === 'function') && describe("just-simple", function() {
    const should = require("should");
    const {
        js,
        logger,
    } = require('../index').JustSimple;


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
            return `<${tag}:${js.simpleString(value)}>`;
        }
    }

    it("TESTTESTlogger calls winston logger", () => {
        js.logger.info("Hello world");
    });

    it("TESTTESTsimpleString(value) summarizes values", ()=>{
        var addr = {
            city: "SFO"
        };
        var ob1 = new Observation('size', 42);
        var ob2 = new Observation('address',addr);

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
        should(js.simpleString({a:1})).equal('{a:1}');
        should(js.simpleString(addr)).equal('{city:SFO}');
        var now = new Date(2019, 9, 22, 1, 2, 3);
        should(js.simpleString(now)).equal(now.toLocaleDateString());

        should(ob1.toString()).equal('<size:42>');
        should(js.simpleString([[ob1],ob2]))
            .equal('[[<size:42>], <address:{city:SFO}>]');
        should(js.simpleString(ob1)).equal('<size:42>');
    });

})
