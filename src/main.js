$.fn.inputVal = function (newValue) {
    var $self = $(this);

    var inputs = buildFormInputs({ $: $self });

    if($self.is('input, textarea, select')) {
        if(typeof newValue === 'undefined') {
            return inputs[$self.attr('name')].get();
        }
        else {
            inputs[$self.attr('name')].set(newValue);
            return $self;
        }
    }
    else {
        if(typeof newValue === 'undefined') {
            return call(inputs, 'get');
        }
        else {
            foreach(newValue, function (value, inputName) {
                inputs[inputName].set(value);
            });
            return $self;
        }
    }
};

$.fn.inputOnChange = function (callback) {
    var $self = $(this);
    var inputs = buildFormInputs({ $: $self });
    foreach(inputs, function (input) {
        input.subscribe('change', function (data) {
            // console.log($(data.domElement).is(':checked'));
            callback.call(data.domElement, data.e);
        });
    });
    return $self;
};

$.fn.inputDisable = function () {
    call(buildFormInputs({ $: $(this) }), 'disable');
};

$.fn.inputEnable = function () {
    call(buildFormInputs({ $: $(this) }), 'enable');
};
