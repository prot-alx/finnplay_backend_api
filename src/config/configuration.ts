export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  jwtSecret: process.env.JWT_SECRET ?? 'jwt_secret_key_reserve',
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
});
