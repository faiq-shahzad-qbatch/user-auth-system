import passwordValidator from "password-validator";

const schema = new passwordValidator();

schema
  .is()
  .min(8) // Minimum length 8 characters
  .is()
  .max(100) // Maximum length 100 characters
  .has()
  .uppercase() // Must have at least one uppercase letter
  .has()
  .lowercase() // Must have at least one lowercase letter
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .symbols() // Should not contain symbols
  .has()
  .not()
  .spaces() // Should not contain spaces
  .is()
  .not()
  .oneOf(["12345678", "Password123"]); // Cannot be one of these values

export default function validatePassword(password) {
  return schema.validate(password, { list: true });
}
