$.fn.inputVal = function (newValue) {
    var $self = $(this);

    var inputs = buildFormInputs($self);

    if(newValue) {


        // return $self.val(newValue);
    }
    else {
        // return $self.val();
    }
};

$.fn.inputChange = function (callback) {
    var $self = $(this);

    var inputs = buildFormInputs($self);

    foreach(inputs, function (input) {
        input.subscribe('change', callback);
    });

    return $self;

    // return $self.change(callback);
};

$.fn.inputDisable = function () {

};

$.fn.inputEnable = function () {

};