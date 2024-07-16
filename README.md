# BlogApp README 🎉

Welcome to **BlogApp**! This isn't just any mobile app—it's your new blogging adventure, built with:
- React Native
- Expo
- Appwrite
- NativeWind

## Demo 🏄

<video width="400" height="800" controls>
  <source src="./assets/DemoBlogApp.mp4" type="video/mp4">
</video>


## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)

## Features 🌟
- **User Authentication**: Securely log in and sign up with Appwrite's magic. No capes required.
- **AI-Generated Blog Posts**: Let AI be your muse and create blog posts effortlessly.
- **Bookmark Blogs**: Keep your favorite posts close, just like your favorite snacks.
- **Search Videos**: Find exactly what you're looking for with our snazzy search bar, powered by Appwrite indexing.
- **Responsive Design**: Thanks to NativeWind, our UI is smoother than a jazz saxophone solo.

## Documents Data Structures in Appwrite 📚

### Users
| **KEY**    | **TYPE** | 
|------------|----------|
| username   | String   |
| email      | Email    |
| avatar     | Url      |
| accountId  | String   |

### Videos
| **KEY**     | **TYPE**          |
|-------------|-------------------|
| title       | String            |
| thumbnail   | Url               |
| prompt      | String            |
| video       | Url               |
| creator     | Rel w users       |
| liked       | Rel w users       |
D
## Installation 🚀
Ready to join the fun? Follow these steps:

1. **Clone the repository**:
   ```sh
   git clone git@github.com:FabioDiCeglie/Blog-AI-Social-React-Native.git
   cd Blog-AI-Social-React-Native
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Install Expo CLI**:
   ```sh
   npm install -g expo-cli
   ```

4. **Start the development server**:
   ```sh
   npm run startr
   ```

## Configuration ⚙️
1. **Appwrite Setup**: ( https://appwrite.io/ )
   - Create a shiny new project in Appwrite.
   - Set up your authentication methods.
   - Configure your database collections (users and videos).
   - Create your indexes for the search functionality.

2. **Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add your Appwrite secrets:
     ```env
     APPWRITE_ENDPOINT=https://[YOUR_APPWRITE_ENDPOINT]
     APPWRITE_PROJECT_ID=[YOUR_PROJECT_ID]
     APPWRITE_PLATFORM=""
     ```
     Example:
     ```
         export const config = {
         endpoint: process.env.APPWRITE_ENDPOINT ?? 'https://cloud.appwrite.io/v1',
         platform: process.env.PLATFORM ?? 'com.fabio.aora',
         projectId: process.env.APPWRITE_PROJECT_ID ?? '668c10800031fa4446cb',
         databaseId: '668c1175001c45a4c380',
         usersCollectionId: '668c119400208e92179d',
         videosCollectionId: '668c11ab001a1b1f4757',
         storageId: '668c12de0026dfb652ad',
         };
   ```
2. **Notes**:
   I left my configuration so you can start the project easily but I advice you to create your own project in Appwrite.