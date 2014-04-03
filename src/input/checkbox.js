var createInputCheckbox = function (fig) {
    var my = {},
        self = createInput(fig, my);

    self.getType = function () {
        return 'checkbox';
    };

    self.get = function () {
        var values = [];
        self.$().filter(':checked').each(function () {
            values.push($(this).val());
        });
        return values;
    };

    self.set = function (newValues) {
        newValues = isArray(newValues) ? newValues : [newValues];

        self.$().each(function () {
            $(this).prop('checked', false);
        });

        foreach(newValues, function (value) {
            self.$().filter('[value="' + value + '"]')
                .prop('checked', true);
        });
    };

    my.equalTo = function (a, b) {
        a = isArray(a) ? a : [a];
        b = isArray(b) ? b : [b];

        var isEqual = true;
        foreach(a, function (value) {
            if(!inArray(b, value)) {
                isEqual = false;
            }
        });
        return isEqual;
    };

    self.$().change(my.publishChange);

    return self;
};
