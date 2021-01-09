export default function (generator, attributes = []) {
  const
    BUS = Symbol('bus'),
    Element = class extends HTMLElement {
      constructor() {
        super();
        const emitter = (function(){
          const
              eventMap = new Map(),
              onceMap = new WeakMap();

          this[BUS] = function ({type, ...payload}) {
            [...(eventMap.get(type) || new Set()).values()].forEach((handler) => handler(payload));
          };

          return {
            on(type, handler) {
              eventMap.set(type, (eventMap.get(type) || new Set()).add(handler));
            },
            off(type, handler) {
              (eventMap.get(type) || new Set()).delete(onceMap.get(handler) ?? handler);
            },
            once(type, handler) {
              let wrappedHandler = (...props)=> {
                handler(...props);
                this.off(type, wrappedHandler);
              };
              onceMap.set(handler, wrappedHandler);
              this.on(type, wrappedHandler);
            }
          };
        }).call(this);

        generator.call(this, emitter);
      }

      attributeChangedCallback(attributeName, previousValue, newValue) {
        this[BUS]({type: ["attribute", attributeName].join(':'), newValue, previousValue});
      }

      connectedCallback() {
        this[BUS]({type: "connect"});
      }

      disconnectedCallback() {
        this[BUS]({type: "disconnect"});
      }
    };

  Object.defineProperty(Element, 'observedAttributes', {
    configurable: false,
    enumerable: false,
    get: ()=> attributes
  });

  return Element;
}