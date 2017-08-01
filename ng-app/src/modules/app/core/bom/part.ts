import { PartOffer } from './part-offer';

export class Part {
  /**
   * 64-bit unique identifier.
   * @type {string}
   */
  readonly uid: string;

  /**
   * The manufacturer part number.
   * @type {string}
   */
  readonly mpn: string;

  /**
   * The url of the part detail page.
   * @type {string}
   */
  readonly url: string;

  /**
   * Best offer for the part.
   * @type {PartOffer[]}
   */
  readonly offers: PartOffer[];

  constructor(uid, mpn, url, offers) {
    this.uid = uid;
    this.mpn = mpn;
    this.url = url;
    this.offers = offers;
  }
}
