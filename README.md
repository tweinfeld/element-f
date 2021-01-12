# element-f
Define your custom elements with elegance 👒

### Installation

```
npm i element-f
```

### Basics
In order to define a custom-element, you only need one definition function:

```javascript
import elementF from "element-f";

const MyElement = elementF(function(){
  // Your logic goes here  
  const shadow = this.attachShadow({mode: 'open'});
});
```

To tap into lifecycle events, this function can use the "life" event emitter:
```javascript
const MyElement = elementF(function(life)=> {
    const shadow = this.attachShadow({mode: 'open'});
    // Listen once to when this component connects to a document 
    life.once('connect', ()=> shadow.innerHTML = `I'm Alive!`);
});
```

The "life" event emitter supports three methods:
  * **`once(name, fn)`<br/>`on(name, fn)`** - Registers **`fn`** for events of name **`name`**. **`once()`** will invoke **fn** once.
    * **`name`** - The name of the event to listen to
    * **`fn(payload)`** - The function to be called when  an event occurs
      * **`payload`** - An object containing information regarding the event
  * **`off(name, fn)`** - Removes an event handler previously registered using **on** or **once**.

The following events are thrown:
  * **`connect`** - Fired upon `connectedCallback`. Delivers no payload.
  * **`disconnect`** - Fired upon `disconnectedCallback`. Delivers no payload.
  * **`attribute:[Attribute Name]`** - Fired when an observed attribute changes. Delivers **previousValue** and **newValue** as payload.

To observe attributes, just add their list to `elementF` call:
```javascript
const MyElement = elementF(function(life) {
    life.on('attribute:foo', ({ previousValue, newValue })=> {
        // Do something when attribute "foo" changes value
    });

    life.on('attribute:bar', ({ previousValue, newValue })=> {
        // Do something when attribute "bar" changes value
    });
}, ["foo", "bar"]);
```

#### Usage Examples
Whereas defining custom elements using standard class notation looks like this:

```javascript
class MyButton extends HTMLElement {
    
    constructor(){
      super();
      console.log(`I'm alive!`);
    }

    static get observedAttributes(){
        return ['disabled'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      if(name === "disabled") this.classList.toggle('disabled', newValue);
    }

    connectCallback() {
      this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
    }
}
```

With **element-f** the same custom element definition would look like this:

```javascript
const MyButton = elementF(function(life)=> {

  console.log(`I'm alive!`);
  life.on('connect', ()=> this.innerHTML = "<b>I'm an x-foo-with-markup!</b>");
  life.on('attribute:disabled', ({ newValue, oldValue })=> this.classList.toggle('disabled', newValue));

}, ['disabled']);
```

Compact, functional and elegant 😇

### What does Element-F solve?

**Element-F** is a stylistic framework, not a fundamental solution to any specific architectural or functional problem. If you're happy with OOP-styled constructs, you probably wouldn't draw much enjoyment from using it :)