import { config } from 'dotenv';

export const initConfig = () => {
  const nodeEnv = process.env.NODE_ENV;
  const path = `.env.${nodeEnv}`;
  console.log('ENV PATH: ', path);
  config({ path });
  console.log(process.env);
};
