export interface AccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface AuthQueryParams {
  client_id: string;
  response_type: 'code';
  redirect_uri: string;
  code_challenge_method: 'S256';
  code_challenge: string;
  state?: string;
  scope?: string;
}

export interface RedirectQueryParams {
  code?: string;
  error?: string;
  state?: string;
}

export interface TokenRequest {
  client_id: string;
  grant_type: string;
  code: string;
  redirect_uri: string;
  code_verifier: string;
}
