import { html } from 'lit';
import { Base } from '../Base';
import { addProductToCart } from '../api/products';
import { setRessource } from '../idbHelpers';

export class ProductCard extends Base {
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
    <div>
    <a href="/product/${this.product.id}" class="card">
        <header>
          <figure>
            <div class="placeholder ${this.loaded ? "fade" : ""}" style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
            <img src="${this.product.image}" alt="${this.product.title}" loading="lazy">
          </figure>
        </header>
        <main>
          <h1>${this.product.title}</h1>
          <p>${this.product.description}</p>
        </main>
      </a>
      <button @click="${this._addProduct}">Add to cart</button>
    </div>
    `;
    }

    _addProduct(e) {
        this.product.amount = (this.product.amount || 0) + 1
        return setRessource({ ...this.product }, 'Cart').then(() => addProductToCart(this.product));
    }
}
customElements.define('product-card', ProductCard);