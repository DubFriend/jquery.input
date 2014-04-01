var createInputPassword = function (fig) {
    var my = {},
        self = createInputText(fig, my);

    self.getType = function () {
        return 'password';
    };

    return self;
};
