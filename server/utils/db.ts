import { drizzle } from 'drizzle-orm/sqlite-cloud';
import { Database } from '@sqlitecloud/drivers';


export const useDb = () => {
  // const runtimeConfig = useRuntimeConfig();
  // Using a client allows for more advanced configuration if needed
  const client = new Database(process.env.SQLITE_CLOUD_URL!);
  return drizzle({ client });
};

export const db = useDb();