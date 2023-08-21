const WEBHOOK_URL =
  "https://hooks.slack.com/services/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";

export default function nofifySlack(message) {
  fetch(WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify({
      text: message,
    }),
  });
}
