var createInputRadio = function (fig) {
    var my = {},
        self = createInput(fig, my);

    self.getType = function () {
        return 'radio';
    };

    self.get = function () {
        return self.$().filter(':checked').val() || null;
    };

    self.set = function (newValue) {
        if(!newValue) {
            self.$().each(function () {
                $(this).prop('checked', false);
            });
            // self.$().prop('checked', false);
        }
        else {
            self.$().filter('[value="' + newValue + '"]').prop('checked', true);
        }
    };

    // self.set = my.buildSetter(function (newValue) {
    //     console.log('set : ', newValue, self.$());
    //     if(!newValue) {
    //         self.$().prop('checked', false);
    //     }
    //     else {
    //         self.$().filter('[value="' + newValue + '"]').prop('checked', true);
    //     }
    // });

    self.$().change(function (e) {
        my.publishChange(e, this);
    });

    return self;
};
