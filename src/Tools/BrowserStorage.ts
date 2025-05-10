import { LiveStorage } from "@figliolia/typed-storage";

export class BrowserStorage {
  private static client: LiveStorage<Schema> | null = null;

  public static getClient() {
    if (typeof localStorage === "undefined") {
      return null;
    }
    if (!this.client) {
      this.client = new LiveStorage<Schema>(localStorage);
    }
    return this.client;
  }
}

export interface Schema {
  btm_cart: Record<string, number>;
}
