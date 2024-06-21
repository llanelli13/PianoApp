import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: 'com.jsm.pianoplayer',
    projectId: '66350ea30005c932e398',
    databaseId: '66350faa001f11941c81',
    userCollectionId: '66350fbe000458e694fa',
    partitionCollectionId: '66350fda0031fe070178',
    bookmarkedCollectionId: '6645b6630009fb1bbfcb',
    storageId: '663510d500129f8ae697' 
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  partitionCollectionId,
  bookmarkedCollectionId,
  storageId
} = config

const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId)
    .setPlatform(config.platform) 
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw Error

        const avatarUrl = avatars.getInitials(username)
        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl
            }
        );

        return newUser
    } catch (err) {
        throw new Error(err)
    }
}

export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }

export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        config.databaseId,
        config.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
}

export async function signIn(email, password) {
    try {
      const session = await account.createEmailSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

  export const getAllPartitions = async () => {
    try {
      const partitions = await databases.listDocuments(
        databaseId,
        partitionCollectionId
      )

      return partitions.documents
    } catch (err) {
      throw new Error(err)
    }
  }

  export const getLatestPartitions = async () => {
  try {
    const partitions = await databases.listDocuments(
      databaseId,
      partitionCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return partitions.documents;
  } catch (err) {
    throw new Error(err)
  }
}

  export const searchPartitions = async ( query ) => {
    try {
      const partitions = await databases.listDocuments(
        config.databaseId,
        config.partitionCollectionId,
        [Query.search('title', query)]
      )

      if (!partitions) throw new Error("Something went wrong")
      
      return partitions.documents
    } catch (err) {
      throw new Error(err)
    }
  }


  export const searchBookMarkedPartitions = async ( query, partitionId) => {
    try {
      const partitions = await databases.listDocuments(
        config.databaseId,
        config.bookmarkedCollectionId,
        [Query.search('title', query),
          Query.equal('$id', partitionId)
        ]
      )

      if (!partitions) throw new Error("Something went wrong")
      
      return partitions.documents
    } catch (err) {
      throw new Error(err)
    }
  }
  
  export const deletePartition = async (partitionId) => {
    try {
      const response = await databases.deleteDocument(
        config.databaseId,
        config.bookmarkedCollectionId,
        partitionId
      );
      return response

    } catch (err) {
      throw new Error(err);
    }
  };  


  

  export const getUserPartitions = async ( userId ) => {
    try {
      const partitions = await databases.listDocuments(
        config.databaseId,
        config.partitionCollectionId,
        [Query.equal('userId', userId)]
      )

      if (!partitions) throw new Error("Something went wrong")
      
      return partitions.documents
    } catch (err) {
      throw new Error(err)
    }
  }

  export const getBookMarkedPartitions = async ( userId ) => {
    try {
      const partitions = await databases.listDocuments(
        config.databaseId,
        config.bookmarkedCollectionId,
        [Query.equal('userId', userId)]
      )

      if (!partitions) throw new Error("Something went wrong")      

      const partitionDetail = partitions.documents.map(doc => {
        const partition = doc.partitionId;
        return {
          $id: doc.$id,
          artiste: partition.artiste,
          difficulty: partition.difficulty,
          title: partition.title,
          partition: partition.partition
        }
      })
      return partitionDetail
    } catch (err) {
      throw new Error(err)
    }
  }

  export const signOut = async () => {
    try {
      const session = await account.deleteSession('current')

      return session

    } catch (err) {
      throw new Error(err)
    }
  }

  export const getFilePreview = async (fileId, type) => {
    let fileUrl;

    try {
      if (type === "partition") {
        fileUrl = storage.getFileView(storageId, fileId)
      } else if (type === "partition_texte") {
        fileUrl = storage.getFileView(storageId, fileId)
      } else if (type === "image") {
        fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100)
      } else {
        throw new Error('Invalid file Type')
      }

      if (!fileUrl) throw Error

      return fileUrl

    } catch (err) {
      throw new Error(err)
    }
  }



  export const addBookmark = async ( userId, itemId ) => {
    try {
      const bookMark = await databases.createDocument(
        databaseId,
        bookmarkedCollectionId,
        ID.unique(),
        {
          userId: userId,
          partitionId: itemId
        }
      )
      return bookMark
      
    } catch (err) {
      throw new Error(err)
    }
  }

  export const uploadFile = async (file, type) => {
    if (!file) return

    const {mimeType, ...rest} = file;
    const asset = {type: mimeType, ...rest}

    try {
      const uploadedFile = await storage.createFile(
        storageId, 
        ID.unique(),
        asset
      )

      const fileUrl = await getFilePreview(uploadedFile.$id, type)
      return fileUrl

    } catch (err) {
      throw new Error(err)
    }
  }

  export const createPartition = async (form, userId ) => {
    try {
      const [partitionURL, partition_texteURL, imageURL] = await Promise.all([
        uploadFile(form.partition, 'partition'),
        uploadFile(form.partition_texte, 'partition_texte'),
        uploadFile(form.image, 'image')
      ]) 

      const newPost = await databases.createDocument(
        databaseId, partitionCollectionId, ID.unique(), 
        {
          title: form.title,
          artiste: form.artiste,
          difficulty: form.difficulte,
          partition: partitionURL,
          partition_texte: partition_texteURL,
          image: imageURL,
          userId: userId
        }
      )

      return newPost
    } catch (err) {
      throw new Error(err)
    }
  }
  // export const uploadFile = async (file, type) => {
  //   if (!file) return

  //   const {mimeType, ...rest} = file
  //   console.log("file :", file)
  //   const asset = { type: mimeType, ...rest}
  //   console.log("asset :", asset)
  //   try {
  //     const uploadedFile = await storage.createFile(
  //       storageId,
  //       ID.unique(),
  //       asset
  //     );
  //     const fileUrl = await getFilePreview(uploadedFile.$id, type)
  //     console.log("fileURL :", fileUrl)
  //     return fileUrl

  //   } catch (err) {
  //     throw new Error(err)
  //   }
  // }

  // export const createPartition = async (form, userId) => {
  //   try {
  //     const partitionURL = await uploadFile(form.partition, 'partition')
  //     console.log("partitionURL :", partitionURL)
  //     const partition_texte = await uploadFile(form.partition_texte, 'partition_texte')
  //     console.log("partition_texte :", partition_texte)

  //     const newPost = await databases.createDocument(
  //       databaseId, partitionCollectionId, ID.unique(), {
  //         title: form.title,
  //         partition: partitionURL,
  //         partition_texte: partition_texte,
  //         artiste: form.artiste,
  //         difficulty: form.difficulte,
  //         userId: userId
  //       }
  //     )

  //     return newPost

  //   } catch (err) {
  //     throw new Error(err)
  //   }
  // }


