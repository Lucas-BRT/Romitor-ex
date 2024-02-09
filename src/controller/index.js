import OBR from "@owlbear-rodeo/sdk";
import * as events from "./events";
import * as notify from "./notify";
import * as player from "./player";

const NOTIFICATION_DELAY = 500;

const haveMetadata = async () => {
  let metadata = await getMetadata();

  if (metadata === undefined) {
    return false;
  }
  return true;
};

const renameRoles = (players) => {
  players.map((player) => {
    switch (player.role) {
      case "GM":
        player.role = "Master";
        break;
      case "PLAYER":
        player.role = "Player";
        break;
    }
  });
};

const ajustPopover = async (playersAmount = 1) => {
  const playerSpace = 40;
  const baseheight = 85;

  const totalheight = playerSpace * playersAmount + baseheight;
  await OBR.action.setHeight(totalheight);
};

export { events, notify, player, haveMetadata, renameRoles, ajustPopover };
