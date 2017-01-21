/**
 * tv.service
 */

import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { BaseService } from "../base.service";
import { Observable } from "rxjs";
import { PaginatedResult, ISeries } from "../model";

@Injectable()
export class TVService extends BaseService {

    constructor( private http: Http ) {
        super();
    }

    /*getPopular(): Observable<PaginatedResult<ISeries[]>> {

    }*/
}
