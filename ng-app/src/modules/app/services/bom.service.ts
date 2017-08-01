import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Config} from '../config';

import {Part} from '../core/bom/part';
import {PartOffer} from '../core/bom/part-offer';
import {Seller} from '../core/bom/seller';

const APIPaths = Object.freeze({
  parts: 'parts'
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
  private static handleError(error: Response | Error) {
    let errorMessage: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      errorMessage = `${error.status} - ${error.statusText || ''} ${body.error || JSON.stringify(body)}`;
    } else if (error instanceof Error) {
      errorMessage = error.message ? error.message : error.toString();
    }

    console.error(errorMessage);
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

      offers.push(new PartOffer(
        rawOffer.sku,
        new Seller(rawOffer.seller.uid, rawOffer.seller.name),
        new Map(
          rawOffer.prices.usd.map(
            ([bucket, price]) => [bucket, Number.parseFloat(price)] as [number, number]
          )
        ),
        rawOffer.inStockQuantity,
        rawOffer.moq,
        rawOffer.packaging
      ));
    }

    return new Part(rawPart.uid, rawPart.mpn, rawPart.url, offers);
  }

  constructor(private config: Config, private http: Http) {
  }

  getForMpns(mpns: string[]): Observable<Map<string, Part>> {
    return this.http.get(`${this.config.apiDomain}/bom/${APIPaths.parts}/${mpns.join(',')}`)
      .map((response: Response) => {
        const jsonRawValue = response.json();
        if (!jsonRawValue) {
          return new Map();
        }

        return new Map(
          Object.keys(jsonRawValue).map((mpn) => {
            return [mpn, BomService.constructPart(jsonRawValue[mpn] as RawPart)] as [string, Part]
          })
        );
      })
      .catch(BomService.handleError);
  }
}
