var createInputTextarea = function (fig) {
    var my = {},
        self = createInput(fig, my);

    self.getType = function () {
        return 'textarea';
    };

    self.$().on('change keyup keydown', function (e) {
        my.publishChange(e, this);
    });

    return self;
};
