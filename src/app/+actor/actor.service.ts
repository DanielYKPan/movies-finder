/**
 * actor.service
 */

import { Injectable } from '@angular/core';
import { BaseService } from "../base.service";
import { Http } from "@angular/http";

@Injectable()
export class ActorService extends BaseService {

    constructor( private http: Http ) {
        super();
    }
}
