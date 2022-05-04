import { LitElement, html, css } from 'lit';
import { deleteProductToCart, resetCart } from '../api/products';
import { Base } from '../Base';
import "../components/product-card-cart";
import { resetRessources, unsetRessource } from '../idbHelpers';

export class AppCart extends Base {
    constructor() {
        super();
        this.products = [];

        this.removeProduct = this.removeProduct.bind(this);
    }
    static get properties() {
        return {
            products: { type: Array }
        }
    }
    render() {
        const products = this.products.map((product) => html`
      <product-card-cart
        .product="${product}"
        .removeProduct="${this.removeProduct}"
      ></product-card-cart>
    `);
        return html`
    <div>
        <h1>Cart VIEW</h1>
        <button @click="${this._resetCart}">Reset whole cart</button>
        <div class="products">
          ${products}
        </div>
    </div>
    `;
    }

    removeProduct(product) {
        this.products = this.products.filter((p) => p.id !== product.id);
        // return unsetRessource(this.product.id, 'Cart')
        //     .then(() => deleteProductToCart(this.product))
    }

    _resetCart(e) {
        return resetRessources('Cart').then(() => resetCart());
    }


}
customElements.define('app-cart', AppCart);
