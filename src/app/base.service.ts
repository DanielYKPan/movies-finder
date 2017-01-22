/**
 * base.service
 */
import { Observable } from "rxjs";
import { URLSearchParams, Response, Http } from "@angular/http";

export class BaseService {

    protected readonly apikey: string;

    constructor( protected http: Http ) {
        this.apikey = '0ea0b3ae1ad79cc9e6354410580840c3';
    }

    protected getResult<T>( url: string, queries?: Array<{name: string, value: string}> ): Observable<T> {
        let search = new URLSearchParams();
        search.set('api_key', this.apikey);

        if (queries) {
            for (let query of queries) {
                search.set(query.name, query.value);
            }
        }
        return this.http.get(url, {search})
            .map(( res: Response ) => {
                return res.json();
            });
    }
}
