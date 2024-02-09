import "dotenv/config"

export const jwtConstants = {
    secret: process.env.JWT_SECRET_KEY,
    expiration: process.env.EXPIRATION_TIME_TOKEN
};
  