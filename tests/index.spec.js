var assert = require('assert');

var React = require('react');
var render = React.renderToStaticMarkup;
var lib = require('../');
var create = lib;

describe('create', function () {
    it('works for simple div', function () {
        assert.equal(
            render(create('div')),
            '<div></div>'
        );
    });
    it('uses div by default', function () {
        assert.equal(
            render(create('')),
            '<div></div>'
        );
    });
    it('adds class', function () {
        assert.equal(
            render(create('div.foo')),
            '<div class="foo"></div>'
        );
    });
    it('uses default tag div with class', function () {
        assert.equal(
            render(create('.foo')),
            '<div class="foo"></div>'
        );
    });
    it('add all classes', function () {
        assert.equal(
            render(create('div.foo.bar')),
            '<div class="foo bar"></div>'
        );
    });
    it('pass tag name to original createElement', function () {
        assert.equal(
            render(create('span')),
            '<span></span>'
        );
    });
    it('pass rest arguments to original', function () {
        assert.equal(
            render(create('div', null, create('span'))),
            '<div><span></span></div>'
        );
    });
    it('concatenetes class from tag to prop', function () {
        assert.equal(
            render(create('div.foo', {
                className: 'bar'
            })),
            '<div class="bar foo"></div>'
        );
    });
    it('allows to use non-string elements', function () {
        var elem = React.createClass({
            render: function () {
                return create('div');
            }
        });
        assert.equal(
            render(create(elem)),
            '<div></div>'
        );
    });
    it.skip('perf: ~95% of orig speed', function () {
        this.timeout(20000);
        var start = process.hrtime();
        for (i = 0; i < 10000; i++) {
            render(create('.foo'));
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
