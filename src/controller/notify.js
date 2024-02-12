import OBR from "@owlbear-rodeo/sdk";

const NOTIFICATION_DELAY = 1000;

async function notify(mensage, changeState) {
  let notificationId;

  switch (changeState) {
    case "IN":
      notificationId = await OBR.notification.show(mensage, "SUCCESS");
      break;
    case "OUT":
      notificationId = await OBR.notification.show(mensage, "ERROR");
      break;
  }

  if (notificationId !== undefined) {
    setTimeout(async () => {
      await OBR.notification.close(notificationId);
    }, NOTIFICATION_DELAY);
  }
}

async function handleNotifications(playerChanged, typeOfChange) {
  switch (typeOfChange) {
    case "IN":
      await notify(`${playerChanged.name} has entered the room!`, typeOfChange);
      break;
    case "OUT":
      await notify(`${playerChanged.name} has exited the room!`, typeOfChange);
      break;
  }
}

export { notify, handleNotifications };
