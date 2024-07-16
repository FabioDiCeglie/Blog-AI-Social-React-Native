import { Client, Account, ID, Avatars, Databases, Query, Storage, ImageGravity } from 'react-native-appwrite';
import { FormProps } from '@/app/(tabs)/create';
import { ImagePickerAsset } from 'expo-image-picker';

export const config = {
  endpoint: process.env.APPWRITE_ENDPOINT ?? 'https://cloud.appwrite.io/v1',
  platform: process.env.PLATFORM ?? 'com.fabio.aora',
  projectId: process.env.APPWRITE_PROJECT_ID ?? '668c10800031fa4446cb',
  databaseId: '668c1175001c45a4c380',
  usersCollectionId: '668c119400208e92179d',
  videosCollectionId: '668c11ab001a1b1f4757',
  storageId: '668c12de0026dfb652ad',
};

const { endpoint, platform, projectId, databaseId, usersCollectionId, videosCollectionId, storageId } = config;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email: string, password: string, username: string) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error('No user created!');

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    console.log('Error creating user:', error);
    throw new Error(error.message || 'Unknown error');
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    if (!session) throw new Error('Session creation failed');

    return session;
  } catch (error: any) {
    console.log('Error sign in:', error);
    throw new Error(error.message || 'Unknown error');
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');

    if (!session) throw new Error('The session is not deleted!');

    return session;
  } catch (error: any) {
    console.log('Error signing out', error);
    throw new Error(error.message || 'Unknown error');
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error('No user found');

    return currentUser.documents[0];
  } catch (error: any) {
    console.log('Error fetching user:', error);
    throw new Error(error.message || 'Unknown error');
  }
}

export const getPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(7)]
    );

    if (!posts) throw new Error('No posts found');

    return posts.documents;
  } catch (error: any) {
    console.log('Error fetching posts:', error);
    throw new Error(error.message || 'Unknown error');
  }
}

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(7)]
    );

    if (!posts) throw new Error('No posts found');

    return posts.documents;
  } catch (error: any) {
    console.log('Error fetching latest posts:', error);
    throw new Error(error.message || 'Unknown error');
  }
}

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.search('title', query)]
    );

    if (!posts) throw new Error('No posts found');

    return posts.documents;
  } catch (error: any) {
    console.log('Error fetching searched posts:', error);
    throw new Error(error.message || 'Unknown error');
  }
}

export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.equal('creator', userId)]
    );

    if (!posts) throw new Error(`No posts found on this user id: ${userId}`);

    return posts.documents;
  } catch (error: any) {
    console.log(`Error fetching posts on user id: ${userId}`, error);
    throw new Error(error.message || 'Unknown error');
  }
}

const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl;

  try {
    if (type === 'video') {
      fileUrl = storage.getFileView(storageId, fileId)
    } else if (type === 'image') {
      fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, ImageGravity.Top, 100)
    } else {
      throw new Error('Invalid file type!')
    }

    if (!fileUrl) throw new Error(`Getting file url failed`);
    return fileUrl
  } catch (error: unknown) {
    throw new Error((error as { message: string }).message || 'Unknown error');
  }
}

const uploadFile = async (file: ImagePickerAsset | null, type: string) => {
  if (!file) return;

  const { mimeType, fileName, fileSize, uri } = file;
  const asset = { type: mimeType as string, name: fileName as string, size: fileSize as number, uri: uri as string };
  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );

    if (!uploadedFile) throw new Error(`Upload file ${JSON.stringify(file)} to bucket failed`);

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error: unknown) {
    throw new Error((error as { message: string }).message || 'Unknown error');
  }
}

export const createVideo = async ({ title, thumbnail, video, prompt, userId }: FormProps) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(thumbnail, 'image'),
      uploadFile(video, 'video'),
    ])

    const newPost = await databases.createDocument(databaseId, videosCollectionId, ID.unique(), {
      title,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      prompt,
      creator: userId
    })

    if (!newPost) throw new Error(`Error uploading new post: ${title}`)

    return newPost;
  } catch (error: unknown) {
    console.log(`Error uploading new video`, error);
    throw new Error((error as { message: string }).message || 'Unknown error');
  }
}
