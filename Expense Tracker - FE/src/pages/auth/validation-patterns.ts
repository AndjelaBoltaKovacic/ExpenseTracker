
export const passwordValidation = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must have at least 8 characters',
  },
  maxLength: {
    value: 16,
    message: 'Password can have a maximum of 16 characters',
  },
  pattern: {
    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*])[A-Za-z0-9!@#$%^&*]*$/,
    message: 'Password must include at least one capital letter and one special character',
  },
};

export const emailValidation = {
    required: 'Email is required',
    pattern: {
        value: /^\S+@\S+$/i,
        message: 'Invalid email format',
    },
}