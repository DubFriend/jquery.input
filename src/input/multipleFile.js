var createInputMultipleFile = function (fig) {
    var my = {},
        self = createBaseInput(fig, my);

    self.getType = function () {
        return 'file[multiple]';
    };

    self.get = function () {
        // http://stackoverflow.com/questions/14035530/how-to-get-value-of-html-5-multiple-file-upload-variable-using-jquery
        // var fileList = mapToArray(excludedSet(self.$().get(0).files || {}, 'length'), identity);
        var fileListObject = self.$().get(0).files || [];
        var names = [];
        var i;
        for(i = 0; i < (fileListObject.length || 0); i += 1) {
            names.push(fileList[i].name);
        }
        return names;

        // console.log(fileList[0]);
        // return pluck(fileList, 'name');
    };

    self.clear = function () {
        // http://stackoverflow.com/questions/1043957/clearing-input-type-file-using-jquery
        this.$().each(function () {
            $(this).wrap('<form>').closest('form').get(0).reset();
            $(this).unwrap();
        });
    };

    self.$().change(function () {
        self.publish('change', self);
    });

    return self;
};
