<template>
  <BaseCard>
    <div class="text-center">
      <div>
        <h2 class="text-3xl heading">
          <template
            v-if="!roomID && joinSuccess === undefined && !recommendations"
          >
            You haven't entered a matching room.
          </template>
          <template v-else>Your {{ joinSuccess ? "friend's" : '' }} room ID:
            <span class="text-green-400">
              {{ roomID }}
            </span>
          </template>
        </h2>
        <h3
          v-if="roomTimer"
          class="text-xl"
        >
          Room will close in <span class="font-bold">{{ roomTimer }}</span>
          seconds.
        </h3>
      </div>
      <div
        v-if="!roomID && joinSuccess === undefined && !recommendations"
        class="mt-2"
      >
        <BaseButton
          class="text-xl"
          @click="create()"
        >
          Create a new matching room
        </BaseButton>
        <div class="mt-6">
          <h2 class="text-2xl heading">...or enter your friend's room ID:</h2>
          <input
            v-model="roomInput"
            class="rounded-full p-4 text-center font-bold text-3xl block
            mx-auto bg-gray-300 dark:bg-gray-700"
            type="number"
            min="100000"
            max="999999"
            name="matchingID"
          >
          <BaseButton
            class="text-xl block mx-auto mt-4"
            @click="join()"
          >
            Join
          </BaseButton>
          <h3
            v-if="joinSuccess === false"
            class="mt-4 text-red-500 font-bold"
          >
            Could not join the room.
          </h3>
        </div>
      </div>
      <div v-if="(roomID && !recommendations) || joinSuccess === null">
        <div class="p-4">
          <icon-spinner class="animate-spin w-24 h-24 block mx-auto my-2">
          </icon-spinner>
          <h2 class="heading text-xl">
            <template v-if="!seeds">
              {{
                joinSuccess ?
                "Joining your friend's room..." :
                'Waiting for someone to enter your room...'
              }}
            </template>
            <template v-else>Getting recomendations from Spotify...</template>
          </h2>
        </div>
      </div>
      <div v-if="recommendations">
        <div class="w-full sm:w-11/12 mx-auto">
          <TrackList
            :title="'Results'"
            :tracks="recommendations.tracks"
          />
        </div>
      </div>
      <BaseButton
        v-if="recommendations"
        class="text-xl mt-8"
        @click="recommendations = null; roomID = 0; joinSuccess = undefined"
      >
        Clear
      </BaseButton>
    </div>
  </BaseCard>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref, Ref, watch } from 'vue';
import {
  MatchStatus,
  RecommendationSeeds as FunixSeeds,
} from '../models/funix/matcher';
import { RecommendationResponse } from '../models/spotify/api';
import {
  createRoom,
  getSeeds,
  getRoomID,
  getRoomStatus,
  joinRoom,
} from '../services/funix/matcher';
import { getRecommendations, getUserInfo } from '../services/spotify/api';
import { accessToken } from '../store/auth';
import TrackList from './TrackList.vue';

export default defineComponent({
  name: 'Matcher',
  components: {
    TrackList,
  },
  setup() {
    const spotifyID = ref('');
    getUserInfo().then((user) => (spotifyID.value = user.id));

    const roomID = ref(0);
    watch(spotifyID, (value) =>
      getRoomID({ user_id: value }).then((result) => {
        if (result.matching_id) {
          roomID.value = result.matching_id;
        } else {
          roomID.value = 0;
        }
      }),
    );
    const create = async () => {
      const result = await createRoom({
        user_id: spotifyID.value!,
        access_token: accessToken.value!.access_token!,
      });
      if (!result.matching_id) {
        return;
      }
      roomID.value = result.matching_id;
    };

    const roomInput = ref<number>();
    const joinSuccess = ref<boolean | null | undefined>();

    const join = async () => {
      joinSuccess.value = null;
      if (!roomInput.value) {
        return;
      }

      const id = roomInput.value;
      joinRoom({
        matching_id: id,
        user_id: spotifyID.value!,
        access_token: accessToken.value?.access_token!,
      }).then((response) => {
        if (response.status !== MatchStatus.ok) {
          joinSuccess.value = false;
          return;
        }
        joinSuccess.value = true;
        roomID.value = id;
      });
    };

    const roomTimer = ref(0);
    const seeds = ref<FunixSeeds | null>(null);

    const _watchRoom = () => {
      getRoomStatus({ matching_id: roomID.value }).then((data) => {
        switch (data.status) {
          case MatchStatus.too_few:
            break;
          case MatchStatus.no_match:
            roomID.value = 0;
            break;
          case MatchStatus.ok:
            getSeeds({ user_id: spotifyID.value }).then((data) => {
              seeds.value = data.seeds;
            });
            break;
        }
        if (data.expires_at && !roomTimer.value) {
          _setTimer(data.expires_at, roomTimer);
        }
      });
    };

    const _setTimer = (expiresAt: string, roomTimer: Ref<number>) => {
      const expiry = new Date(expiresAt);
      const now = new Date();
      const diff = Math.floor((expiry.getTime() - now.getTime()) / 1000);
      if (diff > 0) {
        roomTimer.value = diff;
      }
    };

    const _clearPolling = () => {
      clearInterval(polling.value!);
      polling.value = null;
    };

    const polling: Ref<ReturnType<typeof setInterval> | null> = ref(null);
    watch(roomID, (id) => {
      if (!id) {
        _clearPolling();
        return;
      }
      _watchRoom();
      polling.value = setInterval(_watchRoom, 3000);
    });
    watch(seeds, (value) => {
      if (!value) {
        _clearPolling();
      }
    });

    const recommendations = ref<RecommendationResponse | null>(null);
    watch(seeds, (value) => {
      if (!value) {
        return;
      }
      getRecommendations({
        seed_artists: value.seed_artists,
        seed_tracks: value.seed_tracks,
        seed_genres: value.seed_genres || [],
      }).then((results) => {
        recommendations.value = results;
        seeds.value = null;
      });
    });

    watch(roomTimer, (val) => {
      if (!val || roomTimer.value <= 0) {
        roomTimer.value = 0;
        return;
      }
      setTimeout(() => roomTimer.value--, 1000);
    });

    onBeforeUnmount(_clearPolling);

    return {
      create,
      roomID,
      roomTimer,
      roomInput,
      join,
      joinSuccess,
      seeds,
      recommendations,
    };
  },
});
</script>

<style scoped>
.heading {
  @apply font-bold p-2 m-2;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
