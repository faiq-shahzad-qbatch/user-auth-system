const WEBHOOK_URL = process.env.REACT_APP_WEBHOOK_URL;

export default function nofifySlack(message) {
  fetch(WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify({
      text: message,
    }),
  });
}
