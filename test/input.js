var $fixture = $('#qunit-fixture');

var buildSetup = function (fig) {
    return function() {
        $fixture.html($('#input').html());
        this.$ = $fixture.find(fig.selector);
        this.createInput = fig.createInput;
        this.input = this.createInput({ $: this.$ });
        this.testValue = fig.testValue;
    };
};

var testGet = function() {
    var value = this.testValue || 'b';
    this.$.val(value);
    deepEqual(this.input.get(), value, 'gets current value');
};

var testSet = function() {
    var value = this.testValue || 'b';
    this.input.set(value);
    deepEqual(this.$.val(), value, 'text input value is set');
};

var testClear = function () {
    this.input.clear();
    strictEqual(this.input.get(), '', 'input cleared');
};

var testPublishesOnSetChange = function() {
    var value = this.testValue || 'b';
    expect(1);
    this.input.subscribe('change', function (input) {
        deepEqual(input.get(), value, 'publishes changed data');
    });
    this.input.set(value);
};

var testNotPublishesOnSetNotChange = function() {
    expect(0);
    var value = this.testValue || 'b';
    this.input.set(value);
    this.input.subscribe('change', function (data) {
        ok(false);
    });
    this.input.set(value);
};

var testGetType = function (type) {
    return function () {
        deepEqual(this.input.getType(), type, 'getType returns ' + type);
    };
};

var testDisabled = function () {
    expect(2);
    this.input.subscribe('isEnabled', function (isEnabled) {
        deepEqual(isEnabled, false, 'publishes result');
    });
    this.input.disable();
    deepEqual(this.$.prop('disabled'), true, 'disabled property set');
};

var testEnabled = function () {
    expect(2);
    this.input.disable();
    this.input.subscribe('isEnabled', function (isEnabled) {
        deepEqual(isEnabled, true, 'publishes result');
    });
    this.input.enable();
    deepEqual(this.$.prop('disabled'), false, 'disabled property not set');
};

var testPublishesOnEvents = function () {
    var events = argumentsToArray(arguments);
    return function () {
        var self = this;
        expect(events.length * 2);
        var value = self.testValue || 'a';
        self.input.set(value);

        foreach(events, function (ev) {
            self.input.subscribe('change', function (data) {
                ok(data.e.preventDefault, 'passed event object');
                strictEqual(
                    $(data.domElement).attr('name'), self.input.$().attr('name'),
                    '"this" set to dom element'
                );
            });
        });

        foreach(events, function (ev) {
            self.$.trigger($.Event(ev));
        });
    };
};


module("createInputButton", {
    setup: buildSetup({
        selector: 'input[name="button"]',
        createInput: createInputButton
    })
});

test("buttonInput get", testGet);
test("buttonInput set", testSet);
test("buttonInput clear", testClear);
test("buttonInput getType", testGetType('button'));
test("buttonInput disable", testDisabled);
test("buttonInput enable", testEnabled);
test(
    "buttonInput set publishes change",
    testPublishesOnEvents('change')
);



module("createInputText", {
    setup: buildSetup({
        selector: 'input[name="text"]',
        createInput: createInputText
    })
});

test("textInput get", testGet);
test("textInput set", testSet);
test("textInput clear", testClear);
test("textInput getType", testGetType('text'));
test("textInput disable", testDisabled);
test("textInput enable", testEnabled);
test(
    "textInput set publishes change on keyup, keydown",
    testPublishesOnEvents('keyup', 'keydown', 'change')
);


module("createInputHidden", {
    setup: buildSetup({
        selector: 'input[name="hidden"]',
        createInput: createInputHidden
    })
});

test("textInput get", testGet);
test("textInput set", testSet);
test("textInput clear", testClear);
test("textInput getType", testGetType('hidden'));
test("textInput disable", testDisabled);
test("textInput enable", testEnabled);
test(
    "textInput set publishes change on keyup, keydown",
    testPublishesOnEvents('keyup', 'keydown', 'change')
);


module("createInputPassword", {
    setup: buildSetup({
        selector: 'input[name="password"]',
        createInput: createInputPassword
    })
});

test("passwordInput get", testGet);
test("passwordInput set", testSet);
test("passwordInput clear", testClear);
test("passwordInput getType", testGetType('password'));
test("passwordInput disable", testDisabled);
test("passwordInput enable", testEnabled);
test(
    "passwordInput set publishes change on keyup, keydown, change",
    testPublishesOnEvents('keyup', 'keydown', 'change')
);



module("createInputEmail", {
    setup: buildSetup({
        selector: 'input[name="email"]',
        createInput: createInputEmail
    })
});

test("emailInput get", testGet);
test("emailInput set", testSet);
test("emailInput clear", testClear);
test("emailInput getType", testGetType('email'));
test("emailInput disable", testDisabled);
test("emailInput enable", testEnabled);
test(
    "emailInput set publishes change on keyup, keydown, change",
    testPublishesOnEvents('keyup', 'keydown', 'change')
);



module("createInputURL", {
    setup: buildSetup({
        selector: 'input[name="url"]',
        createInput: createInputURL
    })
});

test("urlInput get", testGet);
test("urlInput set", testSet);
test("urlInput clear", testClear);
test("urlInput getType", testGetType('url'));
test("urlInput disable", testDisabled);
test("urlInput enable", testEnabled);
test(
    "urlInput set publishes change on keyup, keydown, change",
    testPublishesOnEvents('keyup', 'keydown', 'change')
);



module("createInputRange", {
    setup: buildSetup({
        selector: 'input[name="range"]',
        createInput: createInputRange,
        testValue: '6'
    })
});

test("rangeInput get", testGet);
test("rangeInput set", testSet);
test("rangeInput getType", testGetType('range'));
test("rangeInput disable", testDisabled);
test("rangeInput enable", testEnabled);
test(
    "rangeInput set publishes change on change",
    testPublishesOnEvents('change')
);



module("createInputTextarea", {
    setup: buildSetup({
        selector: '[name="textarea"]',
        createInput: createInputTextarea
    })
});

test("textareaInput get", testGet);
test("textareaInput set", testSet);
test("textareaInput clear", testClear);
test(
    "textareaInput set publishes change on keyup, keydown, change",
    testPublishesOnEvents('change', 'keyup', 'keydown')
);
test("textareaInput getType", testGetType('textarea'));
test("textareaInput disable", testDisabled);
test("textareaInput enable", testEnabled);



module("createInputSelect", {
    setup: buildSetup({
        selector: '[name="select"]',
        createInput: createInputSelect
    })
});

test("selectInput get", testGet);
test("selectInput set", testSet);
test("selectInput clear", function () {
    this.input.clear();
    strictEqual(this.input.get(), null, 'input cleared');
});
test(
    "selectInput set publishes change on change",
    testPublishesOnEvents('change')
);
test("selectInput getType", testGetType('select'));
test("selectInput disable", testDisabled);
test("selectInput enable", testEnabled);



module("createInputMultipleSelect", {
    setup: buildSetup({
        selector: '[name="multipleSelect"]',
        createInput: createInputMultipleSelect
    })
});

test("selectMultipleSelect get", function() {
    this.$.val(['b']);
    deepEqual(this.input.get(), ['b'], 'gets current value');
});

test("selectMultipleSelect clear", function () {
    this.input.clear();
    deepEqual(this.input.get(), [], 'input cleared');
});

test("selectMultipleSelect set", function () {
    this.input.set(['b']);
    deepEqual(this.input.get(), ['b'], 'text input value is set');
});

test("selectMultipleSelect set empty string", function () {
    this.$.val(['a']);
    this.input.set('');
    deepEqual(this.input.get(), [], 'checkbox is cleared');
});

test("selectMultipleSelect set erases previously set", function() {
    this.$.val(['a']);
    this.input.set(['b']);
    deepEqual(this.input.get(), ['b'], 'text input value is set');
});

test("selectMultipleSelect set multiple", function() {
    this.input.set(['b', 'a']);
    deepEqual(this.input.get(), ['a','b'], 'text input value is set');
});

test("selectMultipleSelect set wraps with array if set value not an array", function() {
    this.input.set('b');
    deepEqual(this.input.get(), ['b'], 'get data is wrapped');
});

test(
    "selectMultipleSelect set publishes change on change",
    testPublishesOnEvents('change')
);

test("selectMultipleSelect getType", testGetType('select[multiple]'));
test("selectMultipleSelect disable", testDisabled);
test("selectMultipleSelect enable", testEnabled);




module("createInputRadio", {
    setup: buildSetup({
        selector: '[name="radio"]',
        createInput: createInputRadio
    })
});

test("radioInput get", function() {
    this.$.filter('[value="b"]').prop('checked', true);
    deepEqual(this.input.get(), 'b', 'gets current value');
});

test("radioInput set", function() {
    this.input.set('b');
    strictEqual(
        this.$.filter(':checked').val(), 'b',
        'radio input value is set'
    );
});

test("radioInput set to empty string", function () {
    this.input.set('b');
    this.input.set('');
    strictEqual(
        this.$.filter(':checked').length, 0,
        'radio input value is cleared'
    );
});

test("radioInput clear", function () {
    this.input.clear();
    deepEqual(this.input.get(), null, 'input cleared');
});

test("radioInput set publishes change on change", function () {
    expect(2);
    this.input.set('b');
    this.input.subscribe('change', function (data) {
        ok(data.e.preventDefault, 'passed event object');
        strictEqual(
            $(data.domElement).attr('name'), 'radio',
            '"this" set to dom element'
        );
    });
    this.$.filter('[value="a"]').change();
});

test("radioInput getType", testGetType('radio'));
test("radioInput disable", testDisabled);
test("radioInput enable", testEnabled);



module("createInputCheckbox", {
    setup: buildSetup({
        selector: '[name="checkbox"]',
        createInput: createInputCheckbox
    })
});

test("checkboxInput get", function() {
    this.$.filter('[value="b"]').prop('checked', true);
    deepEqual(this.input.get(), ['b'], 'gets current value');
});

test("checkboxInput clear", function () {
    this.input.clear();
    deepEqual(this.input.get(), [], 'input cleared');
});

test("checkboxInput set", function () {
    this.input.set(['b']);
    deepEqual(this.input.get(), ['b'], 'text input value is set');
});

test("checkboxInput set empty string", function () {
    this.$.prop('checked', true);
    this.input.set('');
    deepEqual(this.input.get(), [], 'checkbox is cleared');
});

test("checkboxInput set erases previously set", function() {
    this.$.filter('[value="a"]').prop('checked', true);
    this.input.set(['b']);
    deepEqual(this.input.get(), ['b'], 'text input value is set');
});

test("checkboxInput set multiple", function() {
    this.input.set(['b', 'a']);
    deepEqual(this.input.get(), ['a','b'], 'text input value is set');
});

test("checkboxInput set wraps with array if set value not an array", function() {
    this.input.set('b');
    deepEqual(this.input.get(), ['b'], 'get data is wrapped');
});

test("checkboxInput set publishes change on click", function () {
    expect(2);
    this.input.subscribe('change', function (data) {
        ok(data.e.preventDefault, 'passed event object');
        strictEqual(
            $(data.domElement).attr('name'), 'checkbox',
            '"this" set to dom element'
        );
    });
    this.$.filter('[value="a"]').click();
});

test("checkboxInput set publishes change on change", function () {
    expect(2);
    this.input.subscribe('change', function (data) {
        ok(data.e.preventDefault, 'passed event object');
        strictEqual(
            $(data.domElement).attr('name'), 'checkbox',
            '"this" set to dom element'
        );
    });
    this.$.filter('[value="a"]').prop('checked', true);
    this.$.filter('[value="a"]').change();
});

test("checkboxInput getType", testGetType('checkbox'));
test("checkboxInput disable", testDisabled);
test("checkboxInput enable", testEnabled);



module("createInputFile", {
    setup: buildSetup({
        selector: '[name="file"]',
        createInput: createInputFile
    })
});

test("fileInput clear", testClear);
test("fileInput getType", testGetType('file'));
test("fileInput disable", testDisabled);
test("fileInput enable", testEnabled);
test("fileInput getFileName, file not set", function () {
    strictEqual(this.input.get(), '');
});

test("fileInput publishes filename when file changed", function () {
    expect(2);
    this.input.subscribe('change', function (data) {
        ok(data.e.preventDefault, 'passed event object');
        strictEqual(
            $(data.domElement).attr('name'), 'file',
            '"this" set to dom element'
        );
    });
    this.$.change();
});



module("createInputMultipleFile", {
    setup: buildSetup({
        selector: '[name="multipleFile"]',
        createInput: createInputMultipleFile
    })
});

test("multipleFileInput clear", function () {
    this.input.clear();
    deepEqual(this.input.get(), [], 'input cleared');
});

test("multipleFileInput getType", testGetType('file[multiple]'));
test("multipleFileInput disable", testDisabled);
test("multipleFileInput enable", testEnabled);
test("multipleFileInput getFileName, file not set", function () {
    deepEqual(this.input.get(), []);
});

test("multipleFileInput publishes filename when file changed", function () {
    expect(2);
    this.input.subscribe('change', function (data) {
        ok(data.e.preventDefault, 'passed event object');
        strictEqual(
            $(data.domElement).attr('name'), 'multipleFile',
            '"this" set to dom element'
        );
    });
    this.$.change();
});

