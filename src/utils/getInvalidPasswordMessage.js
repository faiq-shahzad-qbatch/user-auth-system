export default function getInvalidPasswordMessage(rules) {
  return rules
    .reduce((message, rule) => {
      switch (rule) {
        case "min":
          return message.concat("- Minimum length must be 8 characters\n");
        case "max":
          return message.concat("- Maximum length should be 100 characters\n");
        case "uppercase":
          return message.concat("- Must have at least one uppercase letter\n");
        case "lowercase":
          return message.concat("- Must have at least one lowercase letter\n");
        case "digits":
          return message.concat("- Must have at least 2 digits\n");
        case "symbols":
          return message.concat("- Should not contain symbols\n");
        case "spaces":
          return message.concat("- Should not contain spaces\n");
        case "oneOf":
          return message.concat(
            `- Cannot be one of these values: "12345678" or "Password123"`,
          );
        default:
          return message;
      }
    }, "")
    .trim();
}
