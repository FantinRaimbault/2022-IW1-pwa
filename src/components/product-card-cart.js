import { html } from 'lit';
import { Base } from '../Base';
import { addProductToCart, deleteProductToCart } from '../api/products';
import { resetRessources, setRessource, unsetRessource } from '../idbHelpers';

export class ProductCardCart extends Base {
    constructor() {
        super();

        this.product = {};

        this.loaded = false;
    }

    static get properties() {
        return {
            product: { type: Object },
            loaded: { type: Boolean, state: true },
            removeProduct: Function
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
      <button @click="${this._removeProduct}">Remove product from cart</button>
      <button @click="${this._incrementProduct}">Increment amount</button>
      <button @click="${this._decrementProduct}">Decrement amount</button>
      <span>${this.product.amount}</span>
    </div>
    `;
    }

    _removeProduct(e) {
        return unsetRessource(this.product.id, 'Cart')
            .then(() => deleteProductToCart(this.product))
    }

    _incrementProduct(e) {
        return setRessource({ ...this.product, amount: (this.product.amount || 0) + 1 }, 'Cart').then(() => addProductToCart(this.product));
    }

    _decrementProduct(e) {
        return setRessource({ ...this.product, amount: !this.product.amount ? 0 : this.product.amount - 1 }, 'Cart')
            .then(() => addProductToCart(this.product));
    }
}
customElements.define('product-card-cart', ProductCardCart);