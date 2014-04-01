var createInputURL = function (fig) {
    var my = {},
        self = createInput(fig, my);

    self.getType = function () {
        return 'url';
    };

    self.$().keyup(debounce(200, function (e) {
        self.publish('change', self);
    }));

    return self;
};
