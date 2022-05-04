import { openDB } from 'idb';

const STORE_NAME = "Products";

export function initDB() {
    return openDB("Nozama", 1, {
        upgrade(db) {
            const store = db.createObjectStore(STORE_NAME, {
                keyPath: "id"
            });

            store.createIndex("id", "id");
            store.createIndex("category", "category");

            const cart = db.createObjectStore("Cart", {
                keyPath: "id"
            });

            cart.createIndex("id", "id");
            cart.createIndex("category", "category");
        }
    });
}

export async function setRessources(data = [], table = STORE_NAME) {
    const db = await initDB();
    const tx = db.transaction(table, "readwrite");
    data.forEach(item => {
        tx.store.put(item);
    });
    await tx.done;
    return db.getAllFromIndex(table, "id");
}

export async function setRessource(data = {}, table = STORE_NAME) {
    const db = await initDB();
    const tx = db.transaction(table, "readwrite");
    tx.store.put(data);
    await tx.done;
    return db.getFromIndex(table, "id", data.id);
}


export async function getRessources(table = STORE_NAME) {
    const db = await initDB();
    return db.getAllFromIndex(table, "id");
}

export async function getRessource(id, table = STORE_NAME) {
    const db = await initDB();
    return db.getFromIndex(table, "id", id);
}

export async function unsetRessource(id, table = STORE_NAME) {
    const db = await initDB();
    await db.delete(table, id);
}

export function resetRessources(table = STORE_NAME) {
    return initDB().then(db => db.clear(table));
}