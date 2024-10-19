import { db } from "@/firebaseConfig";
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc } from "firebase/firestore";

type Post = {
  caption: string;
  image: string;
  createdAt: Date;
  createdBy: string;
  favoritedBy?: string[];
}

const postsCollection = collection(db, 'posts');

async function addPost(post: Post) {
  await addDoc(postsCollection, {
    ...post,
    favoritedBy: [],
  });
}

async function getPosts() {
  const snapshot = await getDocs(postsCollection);
  const posts = snapshot.docs.map(doc => doc.data()) as Post[];
  return posts;
}

async function addFavorite(postId: string, userId: string) {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    favoritedBy: arrayUnion(userId)
  });
}

async function removeFavorite(postId: string, userId: string) {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    favoritedBy: arrayRemove(userId)
  });
}

export default {
  addPost,
  getPosts,
  addFavorite,
  removeFavorite,
};
