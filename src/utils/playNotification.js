import { Howl } from "howler";
import notificationSound from "../media/notificationSound.mp3";

export default function playNotification() {
  const sound = new Howl({ src: [notificationSound] });
  sound.play();
}
