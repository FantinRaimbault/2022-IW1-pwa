import { html } from 'lit';
import { deleteProductToCart, resetCart, setProductsToCart } from '../api/products';
import { Base } from '../Base';
import "../components/product-card-cart";
import { resetRessources, setRessource, unsetRessource } from '../idbHelpers';

export class AppCart extends Base {
    constructor() {
        super();
        this.products = [];

        this.removeProduct = this.removeProduct.bind(this);
        this.incrProduct = this.incrProduct.bind(this);
        this.decrProduct = this.decrProduct.bind(this);
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
        .incrProduct="${this.incrProduct}"
        .decrProduct="${this.decrProduct}"
      ></product-card-cart>
    `);
        return html`
    <div>
        <h1>Cart VIEW</h1>
        <button style="margin-bottom: 10px" @click="${this.resetCart}">Reset whole cart</button>
        <div class="products">
          ${products}
        </div>
    </div>
    `;
    }

    incrProduct(product) {
        const incrementedProduct = { ...product, amount: (product.amount || 0) + 1 }
        const idx = this.products.findIndex((p) => p.id === product.id);
        this.products.splice(idx, 1, incrementedProduct);
        this.products = [...this.products];
        setRessource(incrementedProduct, 'Cart').then(() => setProductsToCart(this.products));
    }

    decrProduct(product) {
        if (product.amount <= 1) {
            this.removeProduct(product);
            return;
        }
        const decrementedProduct = { ...product, amount: (product.amount || 0) - 1 }
        const idx = this.products.findIndex((p) => p.id === product.id);
        this.products.splice(idx, 1, decrementedProduct);
        this.products = [...this.products];
        setRessource(decrementedProduct, 'Cart').then(() => setProductsToCart(this.products));
    }

    removeProduct(product) {
        this.products = this.products.filter((p) => p.id !== product.id);
        return unsetRessource(product.id, 'Cart')
            .then(() => deleteProductToCart(product))
    }

    resetCart(e) {
        this.products = [];
        return resetRessources('Cart').then(() => resetCart());
    }


}
customElements.define('app-cart', AppCart);
