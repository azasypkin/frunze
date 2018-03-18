export class Guid {
  static generate() {
    /* tslint:disable:no-bitwise */
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      (character) => {
        const r = (Math.random() * 16) | 0;
        const v = character === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
