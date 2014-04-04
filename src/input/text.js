var createInputText = function (fig) {
    var my = {},
        self = createInput(fig, my);

    self.getType = function () {
        return 'text';
    };

    self.$().change(function (e) {
        my.publishChange(e, this);
    });

    return self;
};
