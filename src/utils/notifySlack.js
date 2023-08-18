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
