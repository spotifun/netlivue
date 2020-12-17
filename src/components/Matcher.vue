<template>
  <BaseCard>
    <div class="text-center">
      <div>
        <h2 class="text-3xl heading">
          <template v-if="!roomID">You haven't entered a matching
            room.</template>
          <template v-else>Your room ID:
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
          @click="createMyRoom(spotifyID)"
        >
          Create a new matching room
        </BaseButton>
        <div class="mt-6">
          <h2 class="text-2xl heading">...or enter your friend's room ID:</h2>
          <input
            class="rounded-full p-4 text-center font-bold text-3xl block
            mx-auto bg-gray-300 dark:bg-gray-700"
            type="number"
            min="100000"
            max="999999"
            name="matchingID"
          >
          <BaseButton class="text-xl block mx-auto mt-4">
            Join
          </BaseButton>
        </div>
      </div>
      <div v-else>
        <div class="p-4">
          <icon-spinner class="animate-spin w-24 h-24 block mx-auto my-2">
          </icon-spinner>
          <h2 class="heading text-xl">Waiting for someone to enter your room...
          </h2>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { createRoom, getRoomID } from '../services/funix/matcher';
import { getUserInfo } from '../services/spotify/api';
import { accessToken } from '../store/auth';

const useSpotifyID = () => {
  const spotifyID = ref('');
  getUserInfo().then((user) => (spotifyID.value = user.id));
  return spotifyID;
};

const useRoomID = (spotifyID: string) => {
  const roomID = ref(0);
  getRoomID({ user_id: spotifyID }).then((result) => {
    if (result.matching_id) {
      roomID.value = result.matching_id;
    } else {
      roomID.value = 0;
    }
  });
  return roomID;
};

const _createMyRoom = async (spotifyID: string, roomID: Ref<number>) => {
  const result = await createRoom({
    user_id: spotifyID,
    access_token: accessToken.value!.access_token!,
  });
  if (!result.matching_id) {
    return;
  }
  roomID.value = result.matching_id;
};

export default defineComponent(function Matcher() {
  const spotifyID = useSpotifyID();
  const roomID = useRoomID(spotifyID.value);
  const createMyRoom = (spotifyID: string) => _createMyRoom(spotifyID, roomID);

  return {
    createMyRoom,
    roomID,
    spotifyID,
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
