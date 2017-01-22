/**
 * model
 */
import { SafeResourceUrl } from "@angular/platform-browser";

export interface IPerson {
    profile_path: string;
    adult: boolean;
    id: number;
    known_for: Array<Object>;
    name: string;
    popularity;
}

export interface IPersonDetails {
    adult: boolean;
    also_known_as: Array<any>;
    biography: string;
    birthday: string;
    deathday: string;
    gender: number;
    homepage: string;
    homepage_url: SafeResourceUrl;
    id: number;
    imdb_id: string;
    movie_credits: IActorCredits;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
}

export interface IActorCast {
    adult: boolean;
    character: string;
    credit_id: string;
    id: number;
    original_title: string;
    poster_path: string;
    release_date: string;
    title: string;
}

export interface IActorCrew {
    adult: boolean;
    credit_id: string;
    department: string;
    id: number;
    job: string;
    original_title: string;
    poster_path: string;
    release_date: string;
    title: string;
}

export interface IActorCredits {
    id: number;
    cast: Array<IActorCast>;
    crew: Array<IActorCrew>;
}

export interface ICollection {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
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

export interface ICast {
    cast_id: number;
    character: string;
    credit_id: string;
    id: number;
    name: string;
    order: number;
    profile_path: string;
}

export interface ICrew {
    credit_id: string;
    department: string;
    id: number;
    job: string;
    name: string;
    profile_path: string;
}

export interface IMovieCredits {
    id: number;
    cast: Array<ICast>;
    crew: Array<ICrew>;
}

export interface IMovieDetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: ICollection;
    budget: number;
    credits: IMovieCredits;
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
    reviews: PaginatedResult<IReview[]>;
    runtime: number;
    similar: PaginatedResult<IMovie[]>;
    spoken_languages: Array<ISpokenLanguage>;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    videos: IVideos;
    vote_average: number;
    vote_count: number;
}

export interface PaginatedResult<T> {
    page: number;
    results: T;
    total_pages: number;
    total_results: number;
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

export interface ISeries {
    poster_path: string;
    popularity: number;
    id: number;
    backdrop_path: string;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: Array<string>;
    genre_ids: Array<number>;
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}

export interface ISeriesDetails {
    backdrop_path: string;
    created_by: Array<IPersonDetails>;
    episode_run_time: Array<number>;
    genres: Array<IGenre>;
    homepage: string;
    id: number;
    in_production: boolean;
    languages: Array<string>;
    last_air_date: string;
    name: string;
    networks: Array<{id: number, name: string}>;
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: Array<string>;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Array<{id: number, name: string}>;
    seasons: Array<ISeriesSeason>;
    status: string;
    type: string;
    videos: IVideos;
    vote_average: number;
    vote_count: number;
}

export interface ISeriesSeason {
    air_date: string;
    episode_count: number;
    id: number;
    poster_path: string;
    season_number: number
}

export interface ISeriesSeasonDetails {
    air_date: string;
    name: string;
    episodes: Array<IEpisode>;
    overview: string;
    id: number;
    poster_path: string;
    season_number: number;
    videos: IVideos;
}

export interface IEpisode {
    air_date: string;
    crew: Array<ICrew>;
    episode_number: number;
    guest_stars: Array<ICast>;
    name: string;
    overview: string;
    id: number;
    production_code: string;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
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

export interface IVideos {
    id: number;
    results: Array<IVideo>
}