
var $fixture = $('#qunit-fixture');

var builderBuildFormInputs = function (selector) {
    return buildFormInputs({
        $: selector ?
            $fixture.find('.js-container').find(selector) :
            $fixture.find('.js-container'),
        constructorOverride: {
            button: identity,
            text: identity,
            url: identity,
            email: identity,
            password: identity,
            range: identity,
            textarea: identity,
            select: identity,
            'select[multiple]': identity,
            radio: identity,
            checkbox: identity,
            file: identity,
            'file[multiple]': identity,
            hidden: identity
        }
    });
};

var buildSetup = function (selector) {
    return {
        setup: function () {
            $fixture.html($('#input').html());
            this.inputs = builderBuildFormInputs(selector);
        }
    };
};

var buildTest = function (name, length) {
    test(name + ' length', function () {
        deepEqual(
            this.inputs[name].$.length, length,
            length + ' html element(s)'
        );
    });

    test(name + ' name(s)', function () {
        this.inputs[name].$.each(function () {
            deepEqual($(this).attr('name'), name, 'name is ' + name);
        });
    });
};

// test buildFormInputs when selecting a container element

module('buildFormInputs', buildSetup());

buildTest('button', 1);
buildTest('text', 1);
buildTest('password', 1);
buildTest('email', 1);
buildTest('url', 1);
buildTest('range', 1);
buildTest('textarea', 1);
buildTest('radio', 2);
buildTest('checkbox', 2);
buildTest('checkbox2', 1);
buildTest('select', 1);
buildTest('select2', 1);
buildTest('multipleSelect', 1);
buildTest('file', 1);
buildTest('multipleFile', 1);

// test buildFormInputs when selecting a specific input

module('buildFormInputs button', buildSetup('[name="button"]'));
buildTest('button', 1);

module('buildFormInputs text', buildSetup('[name="text"]'));
buildTest('text', 1);

module('buildFormInputs password', buildSetup('[name="password"]'));
buildTest('password', 1);

module('buildFormInputs email', buildSetup('[name="email"]'));
buildTest('email', 1);

module('buildFormInputs url', buildSetup('[name="url"]'));
buildTest('url', 1);

module('buildFormInputs range', buildSetup('[name="range"]'));
buildTest('range', 1);

module('buildFormInputs textarea', buildSetup('[name="textarea"]'));
buildTest('textarea', 1);

module('buildFormInputs radio', buildSetup('[name="radio"]'));
buildTest('radio', 2);

module('buildFormInputs checkbox', buildSetup('[name="checkbox"]'));
buildTest('checkbox', 2);

module('buildFormInputs select', buildSetup('[name="select"]'));
buildTest('select', 1);

module('buildFormInputs multipleSelect', buildSetup('[name="multipleSelect"]'));
buildTest('multipleSelect', 1);

module('buildFormInputs file', buildSetup('[name="file"]'));
buildTest('file', 1);

module('buildFormInputs multipleFile', buildSetup('[name="multipleFile"]'));
buildTest('multipleFile', 1);
