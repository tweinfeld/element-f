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

const MyElement = elementF(function(){
    // --- Your logic goes here --
});
```

To tap into lifecycle events, this function can use the "life" event emitter:
```javascript
const MyElement = elementF(function(life){
    life.on('connected', ()=> console.log(`I'm Alive!`));
});
```

The following events are thrown:
  * **`connected`** - Fired upon `connectedCallback`
  * **`disconnected`** - Fired upon `disconnectedCallback`
  * **`attribute`** - Fired when an observed attribute changes.

To observe attributes, just add their list to `elementF` call:
```javascript
const MyElement = elementF(function(life){
    life.on('attribute', ({ name, oldValue, newValue })=> {
        // name can be "one" or "two"
    });
}, ["one", "two"]);
```

### Usage 
To define a custom element using the standard class notation:

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

    connectedCallback() {
      this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
    }
}
```

Defining the same element using element-f would look like this:

```javascript
const MyButton = elementF(function(life){
  
  life.on('connected', ()=> { 
    this.innerHTML = "<b>I'm an x-foo-with-markup!</b>"; 
  });
  
  life.on('attribute', ({ name, newValue, oldValue })=> {
    this.classList.toggle('disabled', newValue); 
  });
  
  console.log(`I'm alive!`);

}, ['disabled']);
```












