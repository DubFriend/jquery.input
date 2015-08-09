var buildFormInputs = function (fig) {
    var inputs = {},
        $self = fig.$;

    var constructor = fig.constructorOverride || {
        button: createInputButton,
        text: createInputText,
        url: createInputURL,
        email: createInputEmail,
        password: createInputPassword,
        range: createInputRange,
        textarea: createInputTextarea,
        select: createInputSelect,
        'select[multiple]': createInputMultipleSelect,
        radio: createInputRadio,
        checkbox: createInputCheckbox,
        file: createInputFile,
        'file[multiple]': createInputMultipleFile,
        hidden: createInputHidden
    };

    var addInputsBasic = function (type, selector) {
        var $input = isObject(selector) ? selector : $self.find(selector);

        $input.each(function () {
            var name = $(this).attr('name');
            inputs[name] = constructor[type]({
                $: $(this)
            });
        });
    };

    var addInputsGroup = function (type, selector) {
        var names = [],
            $input = isObject(selector) ? selector : $self.find(selector);

        if(isObject(selector)) {
            inputs[$input.attr('name')] = constructor[type]({
                $: $input
            });
        }
        else {
            // group by name attribute
            $input.each(function () {
                var name = $(this).attr('name');

                if(indexOf(names, $(this).attr('name')) === -1) {
                    names.push($(this).attr('name'));
                }
            });

            foreach(names, function (name) {
                inputs[name] = constructor[type]({
                    $: $self.find('input[name="' + name + '"]')
                });
            });
        }
    };


    if($self.is('input, select, textarea')) {
        if($self.is('input[type="button"], button, input[type="submit"]')) {
            addInputsBasic('button', $self);
        }
        else if($self.is('textarea')) {
            addInputsBasic('textarea', $self);
        }
        else if(
            $self.is('input[type="text"]') ||
            $self.is('input') && !$self.attr('type')
        ) {
            addInputsBasic('text', $self);
        }
        else if($self.is('input[type="password"]')) {
            addInputsBasic('password', $self);
        }
        else if($self.is('input[type="email"]')) {
            addInputsBasic('email', $self);
        }
        else if($self.is('input[type="url"]')) {
            addInputsBasic('url', $self);
        }
        else if($self.is('input[type="range"]')) {
            addInputsBasic('range', $self);
        }
        else if($self.is('select')) {
            if($self.is('[multiple]')) {
                addInputsBasic('select[multiple]', $self);
            }
            else {
                addInputsBasic('select', $self);
            }
        }
        else if($self.is('input[type="file"]')) {
            if($self.is('[multiple]')) {
                addInputsBasic('file[multiple]', $self);
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
            // in all other cases default to a "text" input interface.
            addInputsBasic('text', $self);
        }
    }
    else {
        addInputsBasic('button', 'input[type="button"], button, input[type="submit"]');
        addInputsBasic('text', 'input[type="text"]');
        addInputsBasic('password', 'input[type="password"]');
        addInputsBasic('email', 'input[type="email"]');
        addInputsBasic('url', 'input[type="url"]');
        addInputsBasic('range', 'input[type="range"]');
        addInputsBasic('textarea', 'textarea');
        addInputsBasic('select', 'select:not([multiple])');
        addInputsBasic('select[multiple]', 'select[multiple]');
        addInputsBasic('file', 'input[type="file"]:not([multiple])');
        addInputsBasic('file[multiple]', 'input[type="file"][multiple]');
        addInputsBasic('hidden', 'input[type="hidden"]');
        addInputsGroup('radio', 'input[type="radio"]');
        addInputsGroup('checkbox', 'input[type="checkbox"]');
    }

    return inputs;
};
