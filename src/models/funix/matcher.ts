export enum MatchStatus {
  no_match,
  too_few,
  ok,
  too_much,
}

export enum ResponseStatus {
  ok,
  error,
}

interface GenericRequest {
  user_id: string;
}

export interface GenerateRequest extends GenericRequest {
  access_token: string;
}

export interface GenerateResponse {
  errors?: Array<Record<string, any>>;
  matching_id?: number;
  status: 'ok' | 'error';
  user_id: string;
}

export interface MatchRequest extends GenericRequest {
  matching_id: number;
  access_token: string;
}

export interface MatchResponse {
  errors?: Array<Record<string, any>>;
  matching_id?: number;
  status: MatchStatus;
  user_id: string;
}

export interface StatusRequest {
  matching_id: string;
}

export interface StatusResponse {
  errors?: Array<Record<string, any>>;
  matching_id?: number;
  status: MatchStatus | ResponseStatus;
}

export interface MatchingIDRequest extends GenericRequest {}

export interface MatchingIDResponse {
  errors?: Array<Record<string, any>>;
  matching_id?: number;
  status: ResponseStatus;
}

export interface RecommendationSeeds {
  seed_artists: Array<string>;
  seed_tracks: Array<string>;
}

export interface RecommendationRequest extends GenericRequest {}

export interface RecommendationResponse {
  status: ResponseStatus;
  seeds: RecommendationSeeds;
}
