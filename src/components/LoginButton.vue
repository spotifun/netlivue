<template>
  <a class="p-2 bg-green-700 text-white font-bold rounded" :href="authURI">
    Click here to login
  </a>
</template>

<script lang="ts">
import { nanoid } from 'nanoid';

export default {
  name: 'LoginButton',
  data() {
    return {
      authURI: '',
    };
  },
  created() {
    this.constructAuthURI().then((uri) => (this.authURI = uri));
  },
  mounted() {},
  methods: {
    async digestMessage(message) {
      const encoder = new TextEncoder();
      const data = encoder.encode(message);
      const hash = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hash));
      const hashBinary = hashArray.map((b) => String.fromCharCode(b)).join('');
      return hashBinary;
    },

    genCodeVerifier() {
      return nanoid(64);
    },

    async genCodeChallenge(codeVerifier: string) {
      const hash = await this.digestMessage(codeVerifier);
      const hashb64 = btoa(hash);
      const codeChallenge = hashb64
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
      return codeChallenge;
    },

    genState() {
      return nanoid(16);
    },

    async constructAuthURI() {
      const codeVerifier = this.genCodeVerifier();
      const codeChallenge = await this.genCodeChallenge(codeVerifier);
      const state = this.genState();

      localStorage.setItem('spotifyCodeVerifier', codeVerifier);
      localStorage.setItem('spotifyState', state);

      const params = new URLSearchParams({
        client_id: 'ac6b0cfda2af4e1b9544951e45fb3c65',
        response_type: 'code',
        redirect_uri: 'http://localhost:3000/auth',
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        state: state,
        scope: 'user-read-email user-read-private',
      });
      return 'https://accounts.spotify.com/authorize?' + params;
    },
  },
};
</script>
