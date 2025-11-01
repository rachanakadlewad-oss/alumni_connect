import { Client, Account, Users, Databases } from "node-appwrite";

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT!) 
  .setProject(process.env.APPWRITE_PROJECT_ID!) 
  .setKey(process.env.APPWRITE_API_KEY!); 

const account = new Account(client);
const users = new Users(client);
const databases = new Databases(client);

export { client, account, users, databases };
