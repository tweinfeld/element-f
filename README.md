# element-f
A functional shim to custom element definition.

### Installation

```
npm i @vonage/element-f
```

### Basics
In order to define a custom-element, you only need one definition function:

```javascript
import elementF from "@voange/element-f";

const MyElement = elementF(()=> {
  // Your logic goes here  
  const shadow = this.attachShadow({mode: 'open'});
});
```

To tap into lifecycle events, this function can use the "life" event emitter:
```javascript
const MyElement = elementF((life)=> {
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
  * **`attribute`** - Fired when an observed attribute changes. Delivers **name**, **previousValue** and **newValue** as payload.

To observe attributes, just add their list to `elementF` call:
```javascript
const MyElement = elementF((life)=> {
    life.on('attribute', ({ name, previousValue, newValue })=> {
        // name can be "one" or "two"
    });
}, ["one", "two"]);
```

#### Usage Examples
To define a custom element using standard class notation, you'd write something like:

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
      this.classList.toggle('disabled', newValue); 
    }

    connectCallback() {
      this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
    }
}
```

To defining the same element using **element-f** would look like this:

```javascript
const MyButton = elementF((life)=> {
  
  life.on('connect', ()=> { 
    this.innerHTML = "<b>I'm an x-foo-with-markup!</b>"; 
  });
  
  life.on('attribute', ({ name, newValue, oldValue })=> {
    this.classList.toggle('disabled', newValue); 
  });
  
  console.log(`I'm alive!`);

}, ['disabled']);
```