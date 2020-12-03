export interface User {
  country: string;
  display_name?: string;
  external_urls: object;
  followers: object;
  href: string;
  id: string;
  images: Array<object>;
  type: string;
  uri: string;
}

export interface PrivateUser extends User {
  email: string;
  explicit_content: object;
  product: string;
}
