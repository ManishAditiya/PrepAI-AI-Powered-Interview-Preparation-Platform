export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validatePhoneNumber = (phone) => {
  const regex = /^\d{10}$/;
  return regex.test(phone.replace(/\D/g, ''));
};

export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  return error?.response?.data?.message || 'An error occurred';
};
