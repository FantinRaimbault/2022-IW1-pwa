import { html } from 'lit';
import { Base } from '../Base';
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
            removeProduct: Function,
            decrProduct: Function,
            incrProduct: Function
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
      <button @click="${() => this.removeProduct(this.product)}">Remove product from cart</button>
      <button @click="${() => this.incrProduct(this.product)}"> Add + </button>
        <button @click="${() => this.decrProduct(this.product)}"> Less - </button>
        <span>Amount: ${this.product.amount}</span>
    </div>
    `;
    }
}
customElements.define('product-card-cart', ProductCardCart);