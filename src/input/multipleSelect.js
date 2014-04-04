var createInputMultipleSelect = function (fig) {
    var my = {},
        self = createInput(fig, my);

    self.getType = function () {
        return 'select[multiple]';
    };

    self.get = function () {
        return self.$().val() || [];
    };

    self.set = function (newValues) {
        self.$().val(
            newValues === '' ? [] : isArray(newValues) ? newValues : [newValues]
        );
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

    self.$().change(function (e) {
        my.publishChange(e, this);
    });

    return self;
};
