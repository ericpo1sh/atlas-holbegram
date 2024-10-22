import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, RefreshControl, Alert } from "react-native";
import firestore from "@/lib/firestore";
import { Loading } from "@/components/Loading";
import { useAuth } from "@/components/AuthProvider";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PostsPage() {
  const auth = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [lastTap, setLastTap] = useState<number | null>(null);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await firestore.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      await fetchPosts();
      setLoading(false);
    };
    initialFetch();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const isFavorite = (post: any) => {
    return favorites.includes(post.id);
  };

  const toggleFavorite = async (post: any) => {
    try {
      const isFavorited = isFavorite(post);
      await firestore.toggleFavoritePost(post.id, auth.user?.uid, isFavorited);
      setFavorites(prevFavorites => 
        isFavorited 
          ? prevFavorites.filter(favId => favId !== post.id) 
          : [...prevFavorites, post.id]
      );
      Alert.alert(isFavorited ? "Removed from favorites" : "Added to favorites");
    } catch (error) {
      console.error("Error favoriting post:", error);
    }
  };

  const handleDoubleTap = (post: any) => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      toggleFavorite(post);
    } else {
      setLastTap(now);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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

          <TouchableWithoutFeedback onPress={() => handleDoubleTap(post)}>
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
