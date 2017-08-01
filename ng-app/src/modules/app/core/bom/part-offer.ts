import {Seller} from './seller';

export class PartOffer {
  /**
   * The seller's part number.
   * @type {string}
   */
  readonly sku: string;

  /**
   * Object representing the seller.
   * @type {Seller}
   */
  readonly seller: Seller;

  /**
   * (Break, Price) tuples.
   * @type {Map<number, number>}
   */
  readonly prices: Map<number, number>;

  /**
   * The number of parts the seller has in stock ready for shipment. Negative numbers are used to
   * indicate the following conditions:
   * -1: Non-stocked (seller is not currently stocking the product)
   * -2: Yes (seller has the product in stock but has not reported the quantity)
   * -3: Unknown (seller has not indicated whether or not they have parts in stock)
   * -4: RFQ
   * @type {number}
   */
  readonly inStockQuantity: number;

  /**
   * Minimum order quantity.
   * @type {number}
   */
  readonly moq: number;

  /**
   * Form of offer packaging (e.g. reel, tape).
   * @type {string}
   */
  readonly packaging: string;

  constructor(sku, seller, prices, inStockQuantity, moq, packaging) {
    this.sku = sku;
    this.seller = seller;
    this.prices = prices;
    this.inStockQuantity = inStockQuantity;
    this.moq = moq;
    this.packaging = packaging;
  }
}
