var $fixture = $('#qunit-fixture');

module("integration", {
    setup: function () {
        $fixture.html($('#input').html());
        this.$ = $fixture.find('.js-container');
        var self = this;
        var $getByName = function (name) {
            return self.$.find('[name="' + name + '"]');
        };
        // set some default values on the dom.
        $getByName('text').val('foo');
        $getByName('radio').filter('[value="a"]').attr('checked', true);
        $getByName('checkbox').filter('[value="b"]').attr('checked', true);
        $getByName('select').val('b');
        $getByName('textarea').val('bar');
        $getByName('range').val('3');
        $getByName('url').val('baz');
        $getByName('multipleSelect').val(['a', 'b']);
        $getByName('hidden').val('bat');
    }
});

test("inputVal get from container", function () {
    deepEqual(this.$.inputVal(), {
        button: 'button-value',
        checkbox: ['b'], checkbox2: [],
        email: '', file: '', multipleFile: [],
        multipleSelect: ['a', 'b'], password: '',
        radio: 'a', range: '3', select: 'b',
        select2: 'a', text: 'foo', textarea: 'bar',
        url: 'baz', hidden: 'bat'
    });
});

test("inputVal set from container", function () {
    this.$.inputVal({
        button: 'button',
        checkbox: ['a', 'b'], email: 'email', multipleSelect: ['a'],
        password: 'password', radio: 'b', range: '5',
        select: 'a', text: 'text', textarea: 'textarea',
        url: 'url', hidden: 'hidden'
    });

    deepEqual(this.$.inputVal(), {
        button: 'button',
        checkbox: ['a', 'b'], checkbox2: [],
        email: 'email', file: '', multipleFile: [],
        multipleSelect: ['a'], password: 'password',
        radio: 'b', range: '5', select: 'a',
        select2: 'a', text: 'text', textarea: 'textarea',
        url: 'url', hidden: 'hidden'
    });
});

test("inputDisable", function () {
    this.$.inputDisable();
    this.$.find('input, select, textarea').each(function () {
        strictEqual($(this).prop('disabled'), true);
    });
});

test("inputDisable", function () {
    this.$.inputDisable();
    this.$.find('input, select, textarea').prop('disabled', true);
    this.$.inputEnable();
    this.$.find('input, select, textarea').each(function () {
        strictEqual($(this).prop('disabled'), false);
    });
});

var buildTestInputOnChangeFromContainer = function (selector, name) {
    test("inputOnChange from container " + name, function () {
        expect(2);
        this.$.inputOnChange(function (e) {
            ok(e.preventDefault, 'passed event object');
            strictEqual($(this).attr('name'), name, '"this" set to dom element');
        });
        this.$.find(selector).change();
    });
};

buildTestInputOnChangeFromContainer('[name="button"]', 'button');
buildTestInputOnChangeFromContainer('[name="checkbox"][value="a"]', 'checkbox');
buildTestInputOnChangeFromContainer('[name="email"]', 'email');
buildTestInputOnChangeFromContainer('[name="file"]', 'file');
buildTestInputOnChangeFromContainer('[name="hidden"]', 'hidden');
buildTestInputOnChangeFromContainer('[name="multipleFile"]', 'multipleFile');
buildTestInputOnChangeFromContainer('[name="multipleSelect"]', 'multipleSelect');
buildTestInputOnChangeFromContainer('[name="password"]', 'password');
buildTestInputOnChangeFromContainer('[name="radio"][value="a"]', 'radio');
buildTestInputOnChangeFromContainer('[name="range"]', 'range');
buildTestInputOnChangeFromContainer('[name="select"]', 'select');
buildTestInputOnChangeFromContainer('[name="text"]', 'text');
buildTestInputOnChangeFromContainer('[name="textarea"]', 'textarea');
buildTestInputOnChangeFromContainer('[name="url"]', 'url');

var buildInputIntegrationTests = function (fig) {
    var selector = fig.selector,
        changeSelector = fig.changeSelector || selector,
        name = fig.name,
        expectedGetValue = fig.expectedGetValue,
        setValue = fig.setValue,
        noSet = fig.noSet || false;

    test("inputVal get for input: " + name, function () {
        deepEqual(this.$.find(selector).inputVal(), expectedGetValue);
    });

    if(!noSet) {
        test("inputVal set for input: " + name, function () {
            this.$.find(selector).inputVal(setValue);
            deepEqual(this.$.find(selector).inputVal(), setValue);
        });
    }

    test("inputDisable for input: " + name, function () {
        this.$.find(selector).inputDisable();
        strictEqual(this.$.find(selector).prop('disabled'), true);
    });

    test("inputEnable for input: " + name, function () {
        this.$.find(selector).prop('disabled', true);
        this.$.find(selector).inputEnable();
        strictEqual(this.$.find(selector).prop('disabled'), false);
    });

    test("inputOnChange for input: " + name, function () {
        expect(2);
        this.$.find(selector).inputOnChange(function (e) {
            ok(e.preventDefault, 'passed event object');
            strictEqual($(this).attr('name'), name, '"this" set to dom element');
        });
        this.$.find(changeSelector).change();
    });
};



buildInputIntegrationTests({
    selector: '[name="checkbox"]',
    changeSelector: '[name="checkbox"][value="a"]',
    name: 'checkbox',
    expectedGetValue: ['b'],
    setValue: ['a']
});

buildInputIntegrationTests({
    selector: '[name="button"]',
    name: 'button',
    expectedGetValue: 'button-value',
    setValue: 'new value'
});

buildInputIntegrationTests({
    selector: '[name="email"]',
    name: 'email',
    expectedGetValue: '',
    setValue: 'bar'
});

buildInputIntegrationTests({
    selector: '[name="file"]',
    name: 'file',
    expectedGetValue: '',
    noSet: true
});

buildInputIntegrationTests({
    selector: '[name="hidden"]',
    name: 'hidden',
    expectedGetValue: 'bat',
    setValue: 'ball'
});

buildInputIntegrationTests({
    selector: '[name="multipleFile"]',
    name: 'multipleFile',
    expectedGetValue: [],
    noSet: true
});

buildInputIntegrationTests({
    selector: '[name="multipleSelect"]',
    name: 'multipleSelect',
    expectedGetValue: ['a', 'b'],
    setValue: ['a']
});

buildInputIntegrationTests({
    selector: '[name="password"]',
    name: 'password',
    expectedGetValue: '',
    setValue: 'foo'
});

buildInputIntegrationTests({
    selector: '[name="radio"]',
    changeSelector: '[name="radio"][value="a"]',
    name: 'radio',
    expectedGetValue: 'a',
    setValue: 'b'
});

buildInputIntegrationTests({
    selector: '[name="range"]',
    name: 'range',
    expectedGetValue: '3',
    setValue: '2'
});

buildInputIntegrationTests({
    selector: '[name="select"]',
    name: 'select',
    expectedGetValue: 'b',
    setValue: 'a'
});

buildInputIntegrationTests({
    selector: '[name="text"]',
    name: 'text',
    expectedGetValue: 'foo',
    setValue: 'bar'
});

buildInputIntegrationTests({
    selector: '[name="textarea"]',
    name: 'textarea',
    expectedGetValue: 'bar',
    setValue: 'foo'
});

buildInputIntegrationTests({
    selector: '[name="url"]',
    name: 'url',
    expectedGetValue: 'baz',
    setValue: 'ball'
});
