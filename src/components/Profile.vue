<template>
  <h1>{{ msg }}</h1>
  <p>{{ success ? 'Welcome' : 'Error' }}</p>
  <p v-if="code">{{ code }}</p>
  <div v-if="user">
    <p>Name: {{ user.display_name }}</p>
    <p>Country: {{ user.country }}</p>
    <p>URI: {{ user.uri }}</p>
  </div>
</template>

<script lang="ts">
import { AccessToken, RedirectQueryParams } from '../models/spotify/auth';
import { PrivateUser } from '../models/spotify/api';

export default {
  name: 'Profile',
  props: {
    msg: { type: String, default: 'hello' },
  },
  data() {
    return {
      success: null,
      code: '',
      user: null as PrivateUser,
    };
  },
  watch: {
    success(val) {
      if (!val) {
        return;
      }
      this.getUserInfo().then(user => {
        this.user = user;
      });
    }
  },
  created() {
    this.authenticate(this.getParams(new URL(window.location.href)));
  },
  mounted() {},
  methods: {
    getParams(url: URL) {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      const error = url.searchParams.get('error');
      return { code, state, error };
    },
    authenticate(params: RedirectQueryParams) {
      const { code, state, error } = params;
      const codeVerifier = localStorage.getItem('spotifyCodeVerifier');
      const savedState = localStorage.getItem('spotifyState');
      if (error || state !== savedState) {
        this.success = false;
        return;
      }
      this.getAccessToken(code, codeVerifier).then((result) => {
        this.success = true;
        this.saveAuthInfo(result);
      });
    },
    async getAccessToken(code: string, codeVerifier: string) {
      const url = 'https://accounts.spotify.com/api/token';
      const body = new URLSearchParams({
        client_id: 'ac6b0cfda2af4e1b9544951e45fb3c65',
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:3000/auth',
        code_verifier: codeVerifier,
      });
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });
      return await response.json();
    },
    saveAuthInfo(result: AccessToken) {
      localStorage.setItem('spotifyAuth', JSON.stringify(result));
    },
    async getUserInfo(): Promise<PrivateUser> {
      const url = 'https://api.spotify.com/v1/me';
      const authString = localStorage.getItem('spotifyAuth');
      const auth = JSON.parse(authString) as AccessToken;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      });
      return await response.json();
    },
  },
};
</script>
