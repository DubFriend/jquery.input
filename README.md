#jquery.input
##A normalized interface for html input elements.

jquery.input exposes a unified interface for interacting with html input elements.
You can call the methods on specific input elements `$('input[name="foo"]').inputVal('bar');`
groups of radio buttons or checkboxes, or non input elements that contain
input elements `$('.input-container').inputVal({ name: 'bar' })`.

##Methods

###inputVal
"inputVal" works similarly to how jQuery's ```val``` method works.

Calling "inputVal" without a parameter gets the inputs value.
```javascript
var data = $input.inputVal();
```

Calling "inputVal" with a parameter sets the inputs value.
```javascript
$input.inputVal('foo');
````

"inputVal" sets and gets inputs with string, with the exception of checkboxes,
multiple select's and multiple file inputs.  These elements are get set with arrays
(since they can hold multiple values).  Note that file inputs cannot be set, and its
get value will be the name of its selected file.
```javascript
// checks checkboxes with values 'a' and 'c', all other checkboxes are unchecked.
$checkboxGroup.inputVal(['a', 'c']);
```

If "inputVal" is called on an element that is not an input, the selected element's
children will be searched for all input elements with name attributes.

```html
<div class="container">
    <input type="text" name="text-input" value="foo">

    <select name="multiple-select-input" multiple>
        <option value="a" selected>A</option>
        <option value="b" selected>B</option>
    </select>

    <!-- not found, since this element doesn't have a name attribute -->
    <input type="checkbox" value="b">
</div>
```
```javascript
// get returns containing input values that have name attributes as an object
// where the keys are the names of the inputs, and the values are the inputs
// values.
$('.container').inputVal();
//might return
// {
//     'text-input': 'foo',
//     'multiple-select-input': ['a', 'b']
// }

// set a container by passing an object whose keys are the names attributes
// of the input to set.
$('.container').inputVal({
    'text-input': 'bar',
    'multiple-select-input': ['a']
});
```

###inputOnChange
Detect changes on input attributes.  Binds to "change", "keyup", and "keydown" events
for text, and text like inputs (textarea, password, etc.) and to the "change" event
for other inputs.  "inputOnChange" will only be fired if the value has actually changed
since the last time the "inputOnChange" callback was fired.  This allows the extra
responsiveness of binding to both keyup, and keydown, without firing the "inputOnChange"
callback more often then necessary.

```javascript
$input.inputOnChange(function (e) {
    console.log('input has changed', $(this).inputVal());
});
```

"inputOnChange" may also be called on a an element containing multiple named html
input elements.  In this case, the "inputOnChange" callback will be fired if any
of the inputs change.  The value of "this" will be bound to the html element that
has changed.  (Note that if a group of checkboxes or radio buttons are called,
the value of "this" will be the individual input whose value has changed, not the
group)

```javascript
$('.container').inputOnChange(function (e) {
   console.log('input has changed', $(this).attr('name'));
});
```

###inputEnable/inputDisable
May be called on an individual input element or a container of input elements
```javascript
// equivalent to $input.prop('disabled', true);
$input.inputDisable();

// disables all named form inputs in the containing div
$('.container').inputDisable();

//inputEnable is analogous to inputDisable
$('.container').inputEnable();
```

###inputClear


