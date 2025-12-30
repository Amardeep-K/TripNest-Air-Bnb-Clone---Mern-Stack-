import { Client, Storage} from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.APPWRITE_ENDPOINT)
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

export const storage = new Storage(client);
export {  InputFile };
