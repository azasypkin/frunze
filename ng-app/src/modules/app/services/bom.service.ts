import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Config } from '../config';

import { Part } from '../core/bom/part';
import { PartOffer } from '../core/bom/part-offer';
import { Seller } from '../core/bom/seller';

const APIPaths = Object.freeze({
  parts: 'parts',
});

interface RawSeller {
  uid: string;
  name: string;
}

interface RawPartOffer {
  sku: string;
  seller: RawSeller;
  prices: { usd: [number, string][] };
  inStockQuantity: number;
  moq: number;
  packaging: string;
}

interface RawPart {
  uid: string;
  mpn: string;
  url: string;
  offers: RawPartOffer[];
}

@Injectable()
export class BomService {
  private static handleError(error: HttpErrorResponse) {
    const errorMessage: string =
      error.error instanceof Error ? error.error.message : error.message;

    console.log(error);
    return Observable.throw(errorMessage);
  }

  /**
   * Converts raw project component schema json to a ComponentSchema instance.
   * @param {Object} rawPart Raw component schema JSON returned from the API.
   * @returns {ComponentSchema}
   * @private
   */
  private static constructPart(rawPart: RawPart) {
    const offers = [];

    for (const rawOffer of rawPart.offers) {
      if (!rawOffer.prices.usd) {
        continue;
      }

      offers.push(
        new PartOffer(
          rawOffer.sku,
          new Seller(rawOffer.seller.uid, rawOffer.seller.name),
          new Map(
            rawOffer.prices.usd.map(
              ([bucket, price]) =>
                [bucket, Number.parseFloat(price)] as [number, number]
            )
          ),
          rawOffer.inStockQuantity,
          rawOffer.moq,
          rawOffer.packaging
        )
      );
    }

    return new Part(rawPart.uid, rawPart.mpn, rawPart.url, offers);
  }

  constructor(private config: Config, private http: HttpClient) {}

  getForMpns(mpns: string[]): Observable<Map<string, Part>> {
    return this.http
      .get(`${this.config.apiDomain}/bom/${APIPaths.parts}/${mpns.join(',')}`)
      .map((response) => {
        if (!response) {
          return new Map();
        }

        return new Map(
          Object.keys(response).map((mpn) => {
            return [
              mpn,
              BomService.constructPart(response[mpn] as RawPart),
            ] as [string, Part];
          })
        );
      })
      .catch(BomService.handleError);
  }
}
