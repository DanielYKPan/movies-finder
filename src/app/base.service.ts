import { Observable } from "rxjs";
import { PaginatedResult, IMovie } from "./model";
import { URLSearchParams, Response, Http } from "@angular/http";
/**
 * base.service
 */

export class BaseService {

    protected readonly apikey: string;

    constructor(protected http: Http) {
        this.apikey = '0ea0b3ae1ad79cc9e6354410580840c3';
    }

    protected getPaginatedResult<T>(url: string, queries?: Array<{name: string, value: string}>): Observable<PaginatedResult<T[]>> {
        let search = new URLSearchParams();
        search.set('api_key', this.apikey);

        if (queries) {
            for (let query of queries) {
                search.set(query.name, query.value);
            }
        }

        let paginatedResult: PaginatedResult<T[]> = new PaginatedResult<T[]>();
        return this.http.get(url, {search})
            .map(( res: Response ) => {
                let value = res.json();
                paginatedResult.result = value.results;
                paginatedResult.pagination = {
                    CurrentPage: value.page,
                    ItemsPerPage: paginatedResult.result.length,
                    TotalItems: value.total_results,
                    TotalPages: value.total_pages
                };

                return paginatedResult;
            });
    }

    protected getResult<T>(url: string, queries?: Array<{name: string, value: string}>): Observable<T> {
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
