export class FocusTrap<T extends HTMLElement> {
  public shifting = false;
  public focusIndex = 0;
  public static readonly FOCUSABLE_SELECTORS =
    "a[href], button, input, textarea, iframe, select, details, [tabindex]:not([tabindex='-1']";

  public readonly onKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Shift") {
      this.shifting = false;
    }
  };

  public onTab(container: T) {
    const nodes = FocusTrap.getFocusableNodes(container);
    if (this.shifting) {
      const next = this.focusIndex - 1;
      this.focusIndex = next < 0 ? nodes.length - 1 : next;
    } else {
      const next = this.focusIndex + 1;
      this.focusIndex = next >= nodes.length ? 0 : next;
    }
    nodes[this.focusIndex].focus();
  }

  public onClick(container: T, clickTarget: HTMLElement) {
    const nodes = FocusTrap.getFocusableNodes(container);
    const idx = nodes.indexOf(clickTarget);
    if (idx !== -1) {
      this.focusIndex = idx;
    }
  }

  public static getFocusableNodes(parent: HTMLElement | null | Document) {
    if (!parent) {
      return [];
    }
    const nodes = [
      ...parent.querySelectorAll(FocusTrap.FOCUSABLE_SELECTORS),
    ].filter(
      node =>
        node.getAttribute("disabled") !== "true" &&
        node.getAttribute("aria-hidden") !== "true",
    ) as HTMLElement[];
    const { length } = nodes;
    const map = new Map<number, HTMLElement[]>();
    for (let i = 0; i < length; i++) {
      const node = nodes[i];
      if (node.tagName === "IFRAME") {
        const iframe = node as HTMLIFrameElement;
        let iframeNodes: HTMLElement[] = [];
        if (iframe.contentDocument) {
          iframeNodes = this.getFocusableNodes(iframe.contentDocument);
        }
        map.set(i, iframeNodes);
      }
    }
    const entries = Array.from(map.entries());
    while (entries.length) {
      const [index, elements] = entries.pop()!;
      nodes.splice(index, 1, ...elements);
    }
    return nodes;
  }
}
