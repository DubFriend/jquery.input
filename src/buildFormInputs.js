var buildFormInputs = function ($self) {
    var inputs = {};

    constructor = {
        text: createInputText,
        textarea: createInputTextarea,
        select: createInputSelect,
        radio: createInputRadio,
        checkbox: createInputCheckbox,
        file: createInputFile,
        button: createInputButton,
        hidden: createInputHidden,
        range: createInputRange
    };

    var addInputsBasic = function (type, selector, group) {
        group = group || inputs;
        var $input = isObject(selector) ? selector : $self.find(selector);

        $input.each(function () {
            var name = $(this).attr('name');
            group[name] = constructor[type]({
                $: $(this)
            });
        });
    };

    var addInputsGroup = function (type, selector) {
        var names = [],
            $input = isObject(selector) ? selector : $self.find(selector);

        // gropu by name attribute
        $input.each(function () {
            if(indexOf(names, $(this).attr('name')) === -1) {
                names.push($(this).attr('name'));
            }
        });

        foreach(names, function (name) {
            inputs[name] = constructor[type]({
                $: $self.find('input[name="' + name + '"]')
            });
        });
    };

    if($self.is('input, select, textarea')) {
        if($self.is('input[type="text"]')) {
            addInputsBasic('text', $self);
        }
        else if($self.is('input[type="password"]')) {
            addInputsBasic('text', $self);
        }
        else if($self.is('input[type="email"]')) {
            addInputsBasic('text', $self);
        }
        else if($self.is('input[type="url"]')) {
            addInputsBasic('text', $self);
        }
        else if($self.is('input[type="range"]')) {
            addInputsBasic('range', $self);
        }
        else if($self.is('select')) {
            if($self.is('[multiple]')) {
                addInputsBasic('select', $self);
            }
            else {
                addInputsBasic('select', $self);
            }
        }
        else if($self.is('input[type="file"]')) {
            if($self.is('[multiple]')) {
                addInputsBasic('file', $self);
            }
            else {
                addInputsBasic('file', $self);
            }
        }
        else if($self.is('input[type="hidden"]')) {
            addInputsBasic('hidden', $self);
        }
        else if($self.is('input[type="radio"]')) {
            addInputsGroup('radio', $self);
        }
        else if($self.is('input[type="checkbox"]')) {
            addInputsGroup('checkbox', $self);
        }
        else {
            throw 'invalid input type';
        }
    }
    else {
        addInputsBasic('text', 'input[type="text"]');
        addInputsBasic('text', 'input[type="password"]');
        addInputsBasic('text', 'input[type="email"]');
        addInputsBasic('text', 'input[type="url"]');
        addInputsBasic('range', 'input[type="range"]');
        addInputsBasic('textarea', 'textarea');
        addInputsBasic('select', 'select');
        addInputsBasic('file', 'input[type="file"]');
        addInputsBasic('button', 'input[type="button"], input[type="submit"]');
        addInputsBasic('hidden', 'input[type="hidden"]');
        addInputsGroup('radio', 'input[type="radio"]');
        addInputsGroup('checkbox', 'input[type="checkbox"]');
    }

    return inputs;
};
