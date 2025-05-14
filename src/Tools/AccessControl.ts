export class AccessControl {
  public static get PUBLIC_URL() {
    if (!process.env.PUBLIC_URL) {
      throw new Error("Public URL must be specified by the deployment");
    }
    return process.env.PUBLIC_URL;
  }

  public static requireSameOrigin(request: Request) {
    if (request.headers.get("origin") !== this.PUBLIC_URL) {
      throw new Error("Access control is limited");
    }
  }
}
