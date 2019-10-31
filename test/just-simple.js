(typeof describe === 'function') && describe("just-simple", function() {
    const should = require("should");
    const path = require('path');
    const {
        JustSimple,
    } = require('../index');
    const {
        js,
        logger,
        LOCAL_DIR,
    } = require('../index').JustSimple;
    const LOCAL = path.join(__dirname, '..', 'local');


    class Observation {
        constructor(tag, value, text, opts) {
            this.tag = tag;
            this.value = value;
            this.text = text;
            logger.logInstance(this, opts); // decorate instance
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

    it("TESTTESTlogInstance() decorates instance with log method", () => {
        // default logLevel
        var obs = new Observation('a', 1, 'text', {});
        should(obs.log('injected log("hello-info")')).equal('info');
        should(obs).properties({logLevel:'info'});

        // custom logLevel
        var logLevel = 'warn';
        var opts = {
            logLevel, // Winston logging level
            otherProperty: 'some-value',
        };
        var obs = new Observation('a', 1, 'text', opts);
        should(obs).properties({logLevel});
        should(obs.log('injected log("hello-warn")')).equal(logLevel);

        // dynamic logLevel
        obs.logLevel = 'error';
        should(obs.log('injected log("hello-error")')).equal('error');
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

    it ("TESTTESTLOCAL_DIR => application local directory", ()=>{
        should(LOCAL_DIR).equal(LOCAL);
        should(js.LOCAL_DIR).equal(LOCAL);
    });

})
