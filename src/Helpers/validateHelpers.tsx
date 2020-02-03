export const validateEmail = (email?: string) => {
  const emailRegex = new RegExp(
    // tslint:disable-next-line: max-line-length
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  );
  if (!email) {
    return "Email field is required";
  }
  return !emailRegex.test(email) ? "Email format is invalid" : undefined;
};
export const validatePassword = (password?: string) => {
  if (!password) {
    return "Password field is required";
  }
  return password.length < 8 ? "Password must be at least 8 characters long" : undefined;
};
