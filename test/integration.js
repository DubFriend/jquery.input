var $fixture = $('#qunit-fixture');

module("integration", {
    setup: function () {
        $fixture.html($('#input').html());
        this.$ = $fixture.find('.js-container');

        var self = this;

        var $getByName = function (name) {
            return self.$.find('[name="' + name + '"]');
        };

        $getByName('text').val('foo');
        $getByName('radio').filter('[value="a"]').attr('checked', true);
        $getByName('checkbox').filter('[value="b"]').attr('checked', true);
        $getByName('select').val('b');
        $getByName('textarea').val('bar');
        $getByName('range').val('3');
        $getByName('url').val('baz');
        $getByName('multipleSelect').val(['a', 'b']);
    }
});

test("inputVal get from container", function () {
    deepEqual(this.$.inputVal(), {
        checkbox: ['b'], checkbox2: [],
        email: '', file: '', multipleFile: [],
        multipleSelect: ['a', 'b'], password: '',
        radio: 'a', range: '3', select: 'b',
        select2: 'a', text: 'foo', textarea: 'bar',
        url: 'baz'
    });
});

test("inputVal set from container", function () {
    this.$.inputVal({
        checkbox: ['a', 'b'], email: 'email', multipleSelect: ['a'],
        password: 'password', radio: 'b', range: '5',
        select: 'a', text: 'text', textarea: 'textarea',
        url: 'url'
    });

    deepEqual(this.$.inputVal(), {
        checkbox: ['a', 'b'], checkbox2: [],
        email: 'email', file: '', multipleFile: [],
        multipleSelect: ['a'], password: 'password',
        radio: 'b', range: '5', select: 'a',
        select2: 'a', text: 'text', textarea: 'textarea',
        url: 'url'
    });
});

test("inputOnChange from container text", function () {
    expect(2);
    this.$.inputOnChange(function (e) {
        ok(e.preventDefault, 'passed event object');
        strictEqual($(this).attr('name'), 'text', '"this" set to dom element');
    });
    this.$.find('[name="text"]').change();
});
