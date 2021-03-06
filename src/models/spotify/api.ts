export interface Followers {
  href?: string;
  total: number;
}

export interface Image {
  height?: number;
  url: string;
  width?: number;
}

export interface ExplicitContentSettings {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface PublicUser {
  country: string;
  display_name?: string;
  external_urls: Record<string, string>;
  followers: Followers;
  href: string;
  id: string;
  images: Array<Image>;
  type: string;
  uri: string;
}

export interface PrivateUser extends PublicUser {
  email: string;
  explicit_content: ExplicitContentSettings;
  product: string;
}

export interface Artist {
  external_urls: Record<string, string>;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface AlbumSimplified {
  album_group?: string;
  album_type: 'ALBUM' | 'SINGLE' | 'COMPILATION';
  artists: Array<Artist>;
  available_markets: Array<string>;
  external_urls: Record<string, string>;
  href: string;
  id: string;
  images: Array<Image>;
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  restriction?: Record<string, string>;
  type: string;
  uri: string;
}

export interface Track {
  album: AlbumSimplified;
  artists: Array<Artist>;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: Record<string, string>;
  external_urls: Record<string, string>;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface RecommendationSeed {
  initialPoolSize: number;
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string;
  id: string;
  type: string;
}

export interface RecommendationRequest {
  limit?: number;
  market?: string;
  seed_artists: Array<string>;
  seed_genres: Array<string>;
  seed_tracks: Array<string>;
}

export interface RecommendationResponse {
  tracks: Array<Track>;
  seeds: Array<RecommendationSeed>;
}
