import { QuickStack } from "@figliolia/data-structures";
import { EventEmitter } from "@figliolia/event-emitter";

export class TrapStack {
  private static readonly storage = new QuickStack<string>();
  private static readonly emitter = new EventEmitter<Emission>();

  public static push(ID: string) {
    const stackID = this.storage.push(ID);
    this.emit();
    return stackID;
  }

  public static subscribe(callback: (top: string | undefined) => void) {
    return this.emitter.on("change", callback);
  }

  public static unsubscribe(ID: string) {
    return this.emitter.off("change", ID);
  }

  public static delete(ID: string) {
    const deleted = this.storage.delete(ID);
    this.emit();
    return deleted;
  }

  private static emit() {
    const top = this.storage.peek();
    this.emitter.emit("change", top?.[1]);
  }
}

type Emission = {
  change: string | undefined;
};
