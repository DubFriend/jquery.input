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

    my.equalTo = inputEqualToArray;

    self.$().change(function (e) {
        my.publishChange(e, this);
    });

    return self;
};
