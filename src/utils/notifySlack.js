import axios from "axios";

const WEBHOOK_URL = process.env.REACT_APP_WEBHOOK_URL;

export default function nofifySlack(message) {
  const config = {
    url: WEBHOOK_URL,
    method: "POST",
    data: JSON.stringify({
      text: message,
    }),
  };

  axios
    .request(config)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
}
