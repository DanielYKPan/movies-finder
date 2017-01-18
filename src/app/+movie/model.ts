/**
 * model
 */


export interface IGenre {
    id: number;
    name: string;
}

export interface IMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface IMovieDetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: ICollection;
    budget: number;
    genres: Array<IGenre>;
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Array<IProductionCompany>;
    production_countries: Array<IProductionCountry>;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Array<ISpokenLanguage>;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface ICollection {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
}

export interface IProductionCompany {
    id: number;
    name: string;
}

export interface IProductionCountry {
    iso_3166_1: string;
    id: number;
}

export interface ISpokenLanguage {
    iso_639_1: string;
    id: number;
}

export interface IPagination {
    CurrentPage: number;
    ItemsPerPage: number;
    TotalItems: number;
    TotalPages: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: IPagination;
}