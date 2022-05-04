import { html } from "lit";
import { addProductToCart } from '../api/products';
import { Base } from '../Base';
import { setRessource } from '../idbHelpers';

export class AppProduct extends Base {
    constructor() {
        super();
        this.product = {};

        this.loaded = false;
    }
    static get properties() {
        return {
            product: { type: Object },
            loaded: { type: Boolean, state: true }
        };
    }

    firstUpdated() {
        const img = this.querySelector('img');
        img.addEventListener('load', () => {
            this.loaded = true;
        });
    }

    render() {
        return html`
      <section class="product">
        <header>
          <figure>
            <div class="placeholder ${this.loaded ? 'fade' : ''}" style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
            <img
              loading="lazy"
              src="http://localhost:9000/image/500/${this.product.image}"
              alt="${this.product.description}"
              data-src="http://localhost:9000/image/500/${this.product.image}"
              width="1280"
              height="720">
          </figure>
        </header>
        <main>
          <h1>${this.product.title}</h1>
          <p>${this.product.description}</p>
          <button @click="${this._addProduct}">Add to cart</button>
        </main>
      </section>
    `;
    }

    _addProduct(e) {
        this.product.amount = (this.product.amount || 0) + 1
        return setRessource({ ...this.product }, 'Cart').then(() => addProductToCart(this.product));
    }
}
customElements.define('app-product', AppProduct);