import { db } from "@/firebaseConfig";
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc, query, where } from "firebase/firestore";

type Post = {
  id?: string;
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
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];
  return posts;
}

async function toggleFavoritePost(postId: string, userId: string, isFavorited: boolean) {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    favoritedBy: isFavorited ? arrayRemove(userId) : arrayUnion(userId),
  });
}

async function getFavoritePosts(userId: string) {
  const q = query(postsCollection, where("favoritedBy", "array-contains", userId));
  const snapshot = await getDocs(q);
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];
  return posts;
}

export default {
  addPost,
  getPosts,
  toggleFavoritePost,
  getFavoritePosts,
};
