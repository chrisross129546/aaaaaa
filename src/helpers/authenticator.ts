import password from 'password-hash';

export const authenticate = () => {
  const date = new Date().toLocaleDateString();
  const environment = process.env.API_KEY;

  console.log(date + environment);
  return password.generate(date + environment);
};
