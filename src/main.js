import page from "page";
import checkConnectivity from "network-latency";


import { getProducts, getProduct, getCartProducts, setProductsToCart } from './api/products';
import "./views/app-home";
import { getRessource, getRessources, setRessource, setRessources } from "./idbHelpers";

(async (root) => {

    const skeleton = root.querySelector('.skeleton');
    const main = root.querySelector('main');

    checkConnectivity({
        interval: 3000,
        threshold: 2000
    });

    let NETWORK_STATE = true;
    let HAS_BEEN_OFFILINE = false;

    document.addEventListener('connection-changed', async ({ detail }) => {
        NETWORK_STATE = detail;
        if (NETWORK_STATE) {
            document.documentElement.style.setProperty('--app-bg-color', 'royalblue');
            if (HAS_BEEN_OFFILINE) {
                const storedProducts = await getRessources('Cart');
                await setProductsToCart(storedProducts);
                HAS_BEEN_OFFILINE = false;
            }
        } else {
            document.documentElement.style.setProperty('--app-bg-color', '#717276');
            HAS_BEEN_OFFILINE = true
        }
    });

    const AppHome = main.querySelector('app-home');
    const AppProduct = main.querySelector('app-product');
    const AppCart = main.querySelector('app-cart');

    page('*', (ctx, next) => {
        skeleton.removeAttribute('hidden');

        AppHome.active = false;
        AppProduct.active = false;
        AppCart.active = false;

        next();
    });

    page('/', async () => {
        let storedproducts = []
        if (NETWORK_STATE) {
            const products = await getProducts();
            storedproducts = await setRessources(products);
        } else {
            storedproducts = await getRessources('Cart');
        }

        AppHome.products = storedproducts;
        AppHome.active = true;

        skeleton.setAttribute('hidden', 'hiddle');
    });

    page('/product/:id', async ({ params }) => {
        await import('./views/app-product');

        let storedProduct = {};
        if (NETWORK_STATE) {
            const product = await getProduct(params.id);
            storedProduct = await setRessource(product);
        } else {
            storedProduct = await getRessource(params.id);
        }

        AppProduct.product = storedProduct;
        AppProduct.active = true;

        skeleton.setAttribute('hidden', 'hiddle');
    });

    page('/cart', async () => {
        await import('./views/app-cart');

        // let storedProducts = [];

        // if (NETWORK_STATE) {
        //     const products = [await getCartProducts()].flat().filter((item) => Object.keys(item).length > 0);
        //     storedProducts = await setRessources(products, 'Cart');
        // } else {
        //     storedProducts = await getRessources('Cart');
        // }

        AppCart.products = []
        AppCart.active = true
        skeleton.setAttribute('hidden', 'hiddle');
    });


    page();

})(document.querySelector('#app'));