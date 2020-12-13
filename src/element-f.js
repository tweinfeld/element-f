export default function (generator, attributes = []) {
  const
    BUS = Symbol('bus'),
    Element = class extends HTMLElement {
      constructor() {
        super();
        const emitter = (function () {
          const eventMap = new Map();
          this[BUS] = function ({type, ...payload}) {
            [...(eventMap.get(type) || new Set()).values()].forEach((handler) => handler(payload));
          };

          return {
            on(type, handler) {
              eventMap.set(type, (eventMap.get(type) || new Set()).add(handler));
            },
            off(type, handler) {
              (eventMap.get(type) || new Set()).delete(handler);
            }
          };
        }).call(this);

        generator.call(this, emitter);
      }

      attributeChangedCallback(attributeName, previousValue, newValue) {
        this[BUS]({type: "attribute", name: attributeName, newValue, previousValue});
      }

      connectedCallback() {
        this[BUS]({type: "connected"});
      }

      disconnectedCallback() {
        this[BUS]({type: "disconnected"});
      }
    };

  Element.observedAttributes = attributes;
  return Element;
}