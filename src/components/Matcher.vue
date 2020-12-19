<template>
  <BaseCard>
    <div class="text-center">
      <div>
        <h2 class="text-3xl heading">
          <template v-if="!roomID">
            You haven't entered a matching room.
          </template>
          <template v-else>Your {{ joinSuccess ? "friend's" : '' }} room ID:
            <span class="text-green-400">
              {{ roomID }}
            </span>
          </template>
        </h2>
      </div>
      <div
        v-if="!roomID"
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
      <div v-else>
        <div class="p-4">
          <icon-spinner class="animate-spin w-24 h-24 block mx-auto my-2">
          </icon-spinner>
          <h2 class="heading text-xl">
            {{
              joinSuccess ?
              "Joining your friend's room..." :
              'Waiting for someone to enter your room...'
            }}
          </h2>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue';
import { MatchStatus } from '../models/funix/matcher';
import { createRoom, getRoomID, joinRoom } from '../services/funix/matcher';
import { getUserInfo } from '../services/spotify/api';
import { accessToken } from '../store/auth';

const useSpotifyID = () => {
  const spotifyID = ref('');
  getUserInfo().then((user) => (spotifyID.value = user.id));
  return { spotifyID };
};

const useCreate = (spotifyID: Ref<string>, myRoomID: Ref<number>) => {
  watch(spotifyID, (value) =>
    getRoomID({ user_id: value }).then((result) => {
      if (result.matching_id) {
        myRoomID.value = result.matching_id;
      } else {
        myRoomID.value = 0;
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
    myRoomID.value = result.matching_id;
  };
  return { create };
};

const useRoomInput = (spotifyID: Ref<string>, roomID: Ref<number>) => {
  const roomInput = ref<number>();
  const joinSuccess = ref<boolean | null>(null);

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

  return {
    roomInput,
    join,
    joinSuccess,
  };
};

export default defineComponent(function Matcher() {
  const { spotifyID } = useSpotifyID();
  const roomID = ref(0);
  const { create } = useCreate(spotifyID, roomID);
  const { roomInput, join, joinSuccess } = useRoomInput(spotifyID, roomID);

  return {
    create,
    roomID,
    roomInput,
    join,
    joinSuccess,
  };
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
