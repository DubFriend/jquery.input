var createInputTextarea = function (fig) {
    var my = {},
        self = createInput(fig, my);

    self.getType = function () {
        return 'textarea';
    };

    self.$().change(function (e) {
        my.publishChange(e, this);
    });

    return self;
};
