export class Seller {
  /**
   * 64-bit unique identifier.
   * @type {string}
   */
  readonly uid: string;

  /**
   * The seller's display name.
   * @type {string}
   */
  readonly name: string;

  constructor(uid, name) {
    this.uid = uid;
    this.name = name;
  }
}
