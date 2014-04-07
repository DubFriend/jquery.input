#jquery.input
##A normalized interface for html input elements.

jquery.input exposes a single interface for setting and getting the value of
html inputs as well as a single interface for detecting html input value changes.

###inputVal
inputVal works similarly to how jQuery's ```val``` method works.

Calling inputVal without a parameter gets the inputs value.
```javascript
var data = $input.inputVal();
```

Calling inputVal with a parameter sets the inputs value.
```javascript
$input.inputVal('foo');
````

inputVal sets and gets inputs with string, with the exception of checkboxes,
multiple select's and multiple file inputs.  These elements are set with arrays
```javascript
// checks checkboxes with values 'a' and 'c', all other checkboxes are unchecked.
$checkboxGroup.inputVal(['a', 'c']);
```

if inputVal is called on an element that is not an input, the selected element's
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
// {
//     'text-input': 'foo',
//     'multiple-select-input': ['a', 'b']
// }
$('.container').inputVal();

// set a container by passing an object whose keys are the names attributes
// of the input to set.
$('.container').inputVal({
    'text-input': 'bar',
    'multiple-select-input': ['a']
});
```

###inputOnChange
detect changes on input attributes.  Binds to "change", "keyup", and "keydown" events
for text, and text like inputs (textarea, password, etc.) and to the "change" event
for other inputs.  inputOnChange will only be fired if the value has actually changed
since the last time the inputOnChange callback was fired.  This allows the extra
responsiveness of binding to both keyup, and keydown, without firing the inputOnChange
callback more often then necessary.

```javascript
$input.inputOnChange(function (e) {
    console.log('input has changed', $(this).inputVal());
});
```

inputOnChange may also be called on a an element containing multiple named html
input elements.  In this case, the inputOnChange callback will be fired if any
of the inputs change.  The value of "this" will be bound to the html element that
has changed.

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
```
