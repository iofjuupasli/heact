var assert = require('assert');

var ReactDOMServer = require('react-dom/server');
var React = require('react');
var render = ReactDOMServer.renderToStaticMarkup;
var Heact = require('../');

describe('create w/o namespace', function () {
    var h = Heact();
    it('works for simple div', function () {
        assert.equal(
            render(h('div')),
            '<div></div>'
        );
    });
    it('uses div by default', function () {
        assert.equal(
            render(h('')),
            '<div></div>'
        );
    });
    it('adds class', function () {
        assert.equal(
            render(h('div.foo')),
            '<div class="foo"></div>'
        );
    });
    it('uses default tag div with class', function () {
        assert.equal(
            render(h('.foo')),
            '<div class="foo"></div>'
        );
    });
    it('add all classes', function () {
        assert.equal(
            render(h('div.foo.bar')),
            '<div class="foo bar"></div>'
        );
    });
    it('pass tag name to original createElement', function () {
        assert.equal(
            render(h('span')),
            '<span></span>'
        );
    });
    it('pass rest arguments to original', function () {
        assert.equal(
            render(h('div', null, h('span'))),
            '<div><span></span></div>'
        );
    });
    it('concatenetes class from tag to prop', function () {
        assert.equal(
            render(h('div.foo', {
                className: 'bar'
            })),
            '<div class="bar foo"></div>'
        );
    });
    it('allows to use non-string elements', function () {
        var elem = React.createClass({
            render: function () {
                return h('div');
            }
        });
        assert.equal(
            render(h(elem)),
            '<div></div>'
        );
    });
    it.skip('perf: ~80% of orig speed', function () {
        this.timeout(20000);
        var start = process.hrtime();
        for (i = 0; i < 10000; i++) {
            render(h('.foo'));
        }
        var a = process.hrtime(start);
        var aNano = a[0] * 1e9 + a[1];
        start = process.hrtime();
        for (var i = 0; i < 10000; i++) {
            render(React.createElement('div', {
                className: 'foo'
            }));
        }
        var b = process.hrtime(start);
        var bNano = b[0] * 1e9 + b[1];
        console.log('%d % of original speed', ~~(bNano / aNano * 100));
    });
});

describe('create with namespace', function () {
    var h = Heact('.ns');
    it('add namespace as last class', function () {
        assert.equal(
            render(h('div')),
            '<div class="ns"></div>'
        );
    });
});
