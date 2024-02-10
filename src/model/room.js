import OBR from "@owlbear-rodeo/sdk";
import { METADATA_PATH } from ".";

async function get() {
  return await OBR.room
    .getMetadata()
    .then((metadata) => metadata[METADATA_PATH]);
}

async function set(data) {
  await OBR.room.setMetadata({ [METADATA_PATH]: data });
}

async function purge() {
  setRoomMetadata(undefined);
}

async function reset() {
  const defaultMetadata = {
    players: [],
  };
  await setRoomMetadata(defaultMetadata);
}

export { get, set, purge, reset };
