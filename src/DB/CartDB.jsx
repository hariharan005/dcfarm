import { openDB } from "idb";

const DB_NAME = "CartDatabase";
const STORE_NAME = "cart";

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
}

// Trigger a custom event after any cart change
const triggerCartChange = () => {
  window.dispatchEvent(new Event("cartChanged"));
};

export async function addOrUpdateItem(item) {
  const db = await getDB();
  await db.put(STORE_NAME, item);
  triggerCartChange();
}

export async function removeItem(id) {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
  triggerCartChange();
}

export async function getAllItems() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function clearCart() {
  const db = await getDB();
  await db.clear(STORE_NAME);
  triggerCartChange();
}
