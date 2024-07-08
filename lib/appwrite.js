import { Client, Account, ID } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.fabio.aora',
  projectId: '668c10800031fa4446cb',
  databaseId: '668c1175001c45a4c380',
  usersCollectionId: '668c119400208e92179d',
  videosCollectionId: '668c11ab001a1b1f4757',
  storageId: '668c12de0026dfb652ad',
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);

export const createUser = () => {
  // Register User
  account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe').then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
