import OBR from "@owlbear-rodeo/sdk";
import { METADATA_PATH } from ".";

async function getMetadata() {
  return await OBR.room
    .getMetadata()
    .then((metadata) => metadata[METADATA_PATH]);
}

async function setMetadata(data) {
  await OBR.room.setMetadata({ [METADATA_PATH]: data });
}

async function deleteMetadata() {
  setRoomMetadata(undefined);
}

async function resetMetadata() {
  const defaultMetadata = {
    players: [],
  };
  await setRoomMetadata(defaultMetadata);
}

export { getMetadata, setMetadata, deleteMetadata, resetMetadata };
