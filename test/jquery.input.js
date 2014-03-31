var $fixture = $('#qunit-fixture');

module('jquery.input',{
    setup: function () {
        $fixture.html($('#input').html());
    }
});

test('foo', function () {
    ok(true);
});