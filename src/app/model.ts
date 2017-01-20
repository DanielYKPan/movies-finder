/**
 * model
 */
import { SafeResourceUrl } from "@angular/platform-browser";

export interface IActor {
    adult: boolean;
    also_known_as: Array<string>;
    biography: string;
    birthday: string;
    deathday: string;
    gender: number;
    homepage: string;
    id: number;
    imdb_id: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
}

export interface ICast {
    cast_id: number;
    character: string;
    credit_id: string;
    id: number;
    name: string;
    order: number;
    profile_path: string;
}

export interface ICollection {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
}

export interface ICrew {
    adult: boolean;
    credit_id: string;
    department: string;
    id: number;
    job: string;
    name: string;
    original_title: string;
    poster_path: string;
    profile_path: string;
    release_date: string;
    title: string;
}

export interface ICredits {
    id: number;
    cast: Array<ICast>;
    crew: Array<ICrew>;
}

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

export interface IMovieVideos {
    id: number;
    results: Array<IVideo>
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

export interface IProductionCompany {
    id: number;
    name: string;
}

export interface IProductionCountry {
    iso_3166_1: string;
    id: number;
}

export interface IReview {
    author: string;
    content: string;
    id: string;
    url: string;
}

export interface ISpokenLanguage {
    iso_639_1: string;
    id: number;
}

export interface IVideo {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    url: SafeResourceUrl;
}