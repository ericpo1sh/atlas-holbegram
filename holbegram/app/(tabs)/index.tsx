import { useEffect, useRef, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import firestore from "@/lib/firestore";
import { Loading } from "@/components/Loading";
import { useAuth } from "@/components/AuthProvider";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PostsPage() {
  const auth = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const fetchedPosts = await firestore.getPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  const toggleFavorite = async (post: any) => {
    // Ensure favorites is defined
    if (!Array.isArray(favorites)) {
      console.error("Favorites is not an array:", favorites);
      return;
    }
  
    const isFav = isFavorite(post);
    console.log("Toggling favorite for post:", post.id, "Is Favorite:", isFav);
  
    try {
      if (isFav) {
        setFavorites(favorites.filter(fav => fav.id !== post.id)); // Use id to filter
        await firestore.removeFavorite(post.id, auth.user?.uid);
      } else {
        setFavorites([...favorites, post]); // Add the post directly to favorites
        await firestore.addFavorite(post.id, auth.user?.uid);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const isFavorite = (post: any) => {
    return favorites && favorites.some(fav => fav.id === post.id);
  };

  const handleDoubleTap = (post: any) => {
    toggleFavorite(post);
  };

  const lastTapRef = useRef<number | null>(null);

  const handleImagePress = (post: any) => {
    const now = Date.now();
    if (lastTapRef.current && now - lastTapRef.current < 300) {
      handleDoubleTap(post);
    } else {
      lastTapRef.current = now;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          Hello, {auth.user?.email || 'Guest'}!
        </Text>
      </View>

      {posts.map((post, index) => (
        <View key={index} style={styles.postContainer}>
          <View style={styles.userRow}>
            <View style={styles.userInfo}>
              <Ionicons name="person-circle-outline" size={24} color="black" />
              <Text style={styles.usernameText}>Random User</Text>
            </View>
            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
          </View>

          <TouchableWithoutFeedback onPress={() => handleImagePress(post)}>
            <Image
              source={{ uri: post.image }}
              style={styles.postImage}
              resizeMode="cover"
            />
          </TouchableWithoutFeedback>

          <View style={styles.iconRow}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => toggleFavorite(post)}>
                <Ionicons
                  name={isFavorite(post) ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite(post) ? "red" : "black"}
                />
              </TouchableOpacity>
              <Ionicons name="chatbubble-outline" size={24} color="black" style={styles.iconSpacing} />
              <Ionicons name="arrow-up-circle-outline" size={24} color="black" style={styles.iconSpacing} />
            </View>
            <Ionicons name="bookmark-outline" size={24} color="black" style={styles.bookmarkIcon} />
          </View>
          <Text style={styles.captionText}><Text style={styles.usernameText}>Random User </Text>{post.caption}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  greetingContainer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f0f0f0', 
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  postContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usernameText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 375,
    borderRadius: 10,
  },
  captionText: {
    marginTop: 8,
    fontSize: 16,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconSpacing: {
    marginLeft: 16,
  },
  bookmarkIcon: {
    marginRight: 8,
  },
});
