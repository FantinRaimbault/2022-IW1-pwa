import { createRequest } from "./api.js";

const request = createRequest();

export function getProducts() {
    return request.get("/products")
        .then(({ data }) => data)
        .catch(console.error);
}

export function getProduct(productid) {
    return request.get(`/products/${productid}`)
        .then(({ data }) => data)
        .catch(console.error);
}

export async function addProductToCart(product) {
    const cart = await getCartProducts();
    const newCart = [...cart.filter(item => item.id !== product.id), product];
    return request.post(`/cart`, newCart)
        .then(({ data }) => data)
        .catch(console.error);
}

export async function deleteProductToCart(product) {
    let cart = [await getCartProducts()].flat().filter((item) => Object.keys(item).length > 0);
    cart = cart.filter((item) => item.id !== product.id);
    return request.post(`/cart`, cart)
        .then(({ data }) => data)
        .catch(console.error);
}

export async function setProductsToCart(products) {
    return request.post(`/cart`, products)
        .then(({ data }) => data)
        .catch(console.error);
}


export function getCartProducts() {
    return request.get("/cart")
        .then(({ data }) => {
            return data
        })
        .catch(console.error);
}

export function resetCart() {
    return request.post(`/cart`, [])
        .then(({ data }) => data)
        .catch(console.error);
}