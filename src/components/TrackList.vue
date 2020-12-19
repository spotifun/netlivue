<template>
  <BaseCard>
    <h2 class="font-bold text-5xl text-center p-4 my-4">{{ title }}</h2>
    <ul class="text-left">
      <li
        v-for="track in tracks"
        :key="track.id"
      >
        <a
          :href="track.external_urls && track.external_urls.spotify"
          class="bg-gray-500 bg-opacity-10 hover:bg-opacity-20 focus:bg-opacity-20
            flex px-6 py-4 rounded-xl my-2 items-center justify-between"
        >
          <div>
            <h3 class="font-bold text-xl">{{ track.name }}</h3>
            <p>{{ artists[track.id] }}</p>
          </div>
          <div>
            <span
              v-if="track.explicit"
              class="p-2 border-2 border-gray-500 rounded-md mx-4"
            >EXPLICIT</span>
            <span>
              {{ millisToMinutesSeconds(track.duration_ms) }}
            </span>
          </div>
        </a>
      </li>
    </ul>
  </BaseCard>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Track } from '../models/spotify/api';

const millisToMinutesSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export default defineComponent({
  name: 'TrackList',
  props: {
    title: {
      type: String,
      default: 'Track List',
    },
    tracks: {
      type: Array as PropType<Track[]>,
      default: () => [
        {
          artists: [{ name: 'Michael' }, { name: 'Jekjon' }],
          name: 'Pls work',
          id: 'track01',
        },
        {
          artists: [{ name: 'Summer Salt' }, { name: 'Charlie Burg' }],
          name: "Revvin' My Busbeat",
          id: 'track02',
        },
      ],
    },
  },
  setup(props) {
    const artists = computed(() => {
      const tracks = props.tracks;
      const result: Record<string, string> = {};
      for (const track of tracks) {
        result[track.id] = track.artists
          .map((artist) => artist.name)
          .join(', ');
      }
      return result;
    });
    return {
      artists,
      millisToMinutesSeconds,
    };
  },
});
</script>
