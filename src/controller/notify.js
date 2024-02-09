import OBR from "@owlbear-rodeo/sdk";

async function notify(mensage, changeState) {
  let notificationId;

  switch (changeState) {
    case "ENTERED":
      notificationId = await OBR.notification.show(mensage, "SUCCESS");
      break;
    case "EXITED":
      notificationId = await OBR.notification.show(mensage, "ERROR");
      break;
  }

  setTimeout(async () => {
    await OBR.notification.close(notificationId);
  }, NOTIFICATION_DELAY);
}

async function handleNotifications(changeStatus) {
  switch (changeStatus) {
    case "ENTERED":
      await notify("A player has entered the room!", changeStatus);
      break;
    case "EXITED":
      await notify("A player has exited the room!", changeStatus);
      break;
  }
}

export { notify, handleNotifications };
