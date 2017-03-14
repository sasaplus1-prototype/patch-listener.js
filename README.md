# patch-listener.js

easily add/remove listener

## Installation

```sh
$ npm install sasaplus1-prototype/patch-listener.js
```

## Usage

via `require()`

```js
var PatchListener = require('patch-listener');
```

via `<script>`

```html
<script src="patch-listener.min.js"></script>
```

### Example

```js
var fn = new PatchListener(document.body, 'click', function() {
  console.log('click');
}, false);

// add to EventListener
fn.on();

// remove from EventListener
fn.off();

// once more add to EventListener
fn.on();
```

```js
var fn = new PatchListener({
  eventName: 'click',
  callback: function() {
    console.log('callback');
  }
});

// add to EventListener with parameters
fn.on(document.body, 'mouseup', null, false);

// remove from EventListener
fn.off(document.body, 'mouseup', null, false);
```

## Functions

### PatchListener(element, eventName, callback, capture)

PatchListener constructor

- `element`
  - `Element|Object`
- `element.eventName`
  - `string`
- `element.callback`
  - `Function`
- `element.capture`
  - `boolean`
- `eventName`
  - `string`
- `callback`
  - `Function`
- `capture`
  - `boolean`

### PatchListener#off(element, eventName, callback, capture)

remove from EventListener

- `element`
  - `Element`
- `eventName`
  - `string`
- `callback`
  - `Function`
- `capture`
  - `boolean`

### PatchListener#on(element, eventName, callback, capture)

add to EventListener

- `element`
  - `Element`
- `eventName`
  - `string`
- `callback`
  - `Function`
- `capture`
  - `boolean`

## License

The MIT license.
