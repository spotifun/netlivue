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
          v-if="roomTimer && !seeds"
          class="text-xl"
        >Room will close in {{ roomTimer }} seconds.</h3>
      </div>
      <div
        v-if="!roomID && joinSuccess !== null && !recommendations"
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
      <div class="mt-4">
        <h3
          v-if="roomTimer && recommendations"
          class="text-md"
        >
          <p class="mt-8">Don't like them?</p>
          You still have
          <strong>{{ roomTimer }}</strong> seconds to regenerate
          the results.
        </h3>
        <BaseButton
          v-if="recommendations && seeds"
          class="text-xl mt-4"
          @click="roomTimer ? generateRecommendations() : reset()"
        >
          {{ roomTimer ? 'Regenerate' : 'Reset' }}
        </BaseButton>
      </div>
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
    const roomID = ref(0);
    const roomTimer = ref(0);
    const roomInput = ref<number>();
    const joinSuccess = ref<boolean | null | undefined>();
    const seeds = ref<FunixSeeds | null>(null);
    const polling: Ref<ReturnType<typeof setInterval> | null> = ref(null);
    const recommendations = ref<RecommendationResponse | null>(null);

    // Get ID from Spotify and check if there's an active room.
    getUserInfo().then((user) => {
      spotifyID.value = user.id;
      getRoomID({ user_id: user.id }).then(
        (result) => (roomID.value = result.matching_id || 0),
      );
    });

    // Create room button handler.
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

    // Join room button handler.
    const join = async () => {
      if (!roomInput.value) {
        return;
      }
      joinSuccess.value = null;

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

    const _setTimer = (expiresAt: string) => {
      const expiry = new Date(expiresAt);
      const now = new Date();
      const diff = Math.floor((expiry.getTime() - now.getTime()) / 1000);
      if (diff > 0) {
        roomTimer.value = diff;
      }
    };

    // Create countdown effect.
    watch(roomTimer, (val) => {
      if (!val || roomTimer.value <= 0) {
        roomTimer.value = 0;
        return;
      }
      setTimeout(() => roomTimer.value--, 1000);
    });

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
          _setTimer(data.expires_at);
        }
      });
    };

    const _clearPolling = () => {
      clearInterval(polling.value!);
      polling.value = null;
    };

    // Start/stop polling based on room ID availability.
    watch(roomID, (id) => {
      if (!id) {
        _clearPolling();
        return;
      }
      _watchRoom();
      polling.value = setInterval(_watchRoom, 3000);
    });

    // Create recommendations based on current seeds.
    const generateRecommendations = () => {
      getRecommendations({
        seed_artists: seeds.value!.seed_artists,
        seed_tracks: seeds.value!.seed_tracks,
        seed_genres: seeds.value!.seed_genres || [],
      }).then((results) => {
        recommendations.value = results;
      });
    };

    // Once the seed is retrieved, generate recommendations and stop polling.
    watch(seeds, (value) => {
      if (!value) {
        return;
      }
      generateRecommendations();
      _clearPolling();
    });

    const reset = () => {
      seeds.value = null;
      recommendations.value = null;
      roomID.value = 0;
      roomInput.value = undefined;
      joinSuccess.value = undefined;
    };

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
      generateRecommendations,
      reset,
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
