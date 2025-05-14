import { BrowserStorage, Schema } from "./BrowserStorage";

export class ShoppingCart {
  public static subscribe(callback: (cart: Schema["btm_cart"] | null) => void) {
    return BrowserStorage.getClient()?.on?.("btm_cart", callback);
  }

  public static unsubscribe(id: string) {
    return BrowserStorage.getClient()?.off?.("btm_cart", id);
  }

  public static get() {
    const client = BrowserStorage.getClient();
    if (!client) {
      return;
    }
    return client.getItem("btm_cart");
  }

  public static incrementItem(id: string) {
    const client = BrowserStorage.getClient();
    if (!client) {
      return;
    }
    const cart = client.getItem("btm_cart") ?? {};
    cart[id] = (cart[id] || 0) + 1;
    client.setItem("btm_cart", cart);
  }

  public static decrementItem(id: string) {
    const client = BrowserStorage.getClient();
    if (!client) {
      return;
    }
    const cart = client.getItem("btm_cart") ?? {};
    cart[id] = (cart[id] || 0) - 1;
    if (cart[id] <= 0) {
      delete cart[id];
    }
    client.setItem("btm_cart", cart);
  }

  public static removeItem(id: string) {
    const client = BrowserStorage.getClient();
    if (!client) {
      return;
    }
    const cart = client.getItem("btm_cart") ?? {};
    delete cart[id];
    client.setItem("btm_cart", cart);
  }

  public static clearCart() {
    const client = BrowserStorage.getClient();
    if (!client) {
      return;
    }
    client.removeItem("btm_cart");
  }
}
