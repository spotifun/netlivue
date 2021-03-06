export enum MatchStatus {
  no_match = 'no_match',
  too_few = 'too_few',
  ok = 'ok',
  too_much = 'too_much',
}

export enum ResponseStatus {
  ok = 'ok',
  error = 'error',
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
  matching_id: number;
}

export interface StatusResponse {
  errors?: Array<Record<string, any>>;
  matching_id?: number;
  status: MatchStatus | ResponseStatus;
  expires_at?: string;
}

export interface MatchingIDRequest extends GenericRequest {}

export interface MatchingIDResponse {
  errors?: Array<Record<string, any>>;
  matching_id?: number;
  status: ResponseStatus;
  is_owner?: boolean;
}

export interface RecommendationSeeds {
  seed_artists: Array<string>;
  seed_tracks: Array<string>;
  seed_genres?: Array<string>;
}

export interface RecommendationRequest extends GenericRequest {}

export interface RecommendationResponse {
  status: ResponseStatus;
  seeds: RecommendationSeeds;
}
