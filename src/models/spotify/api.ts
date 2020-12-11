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

export interface User {
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

export interface PrivateUser extends User {
  email: string;
  explicit_content: ExplicitContentSettings;
  product: string;
}
