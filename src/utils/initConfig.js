import { config } from 'dotenv';

export const initConfig = () => {
  const { NODE_ENV } = process.env;
  const path = `.env.${NODE_ENV}`;
  config({ path });
};
