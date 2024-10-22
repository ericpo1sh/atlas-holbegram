import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, RefreshControl } from "react-native";
import firestore from "@/lib/firestore";
import { useAuth } from "@/components/AuthProvider";
import { Loading } from "@/components/Loading";

export default function FavoritesPage() {
  const auth = useAuth();
  const [favoritePosts, setFavoritePosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFavorites = async () => {
    try {
      const fetchedFavorites = await firestore.getFavoritePosts(auth.user?.uid);
      setFavoritePosts(fetchedFavorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      await fetchFavorites();
      setLoading(false);
    };
    initialFetch();
  }, [auth.user?.uid]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFavorites();
    setRefreshing(false);
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
        <Text style={styles.greetingText}>Your Favorites</Text>
      </View>

      {favoritePosts.map((post, index) => (
        <View key={index} style={styles.postContainer}>
          <Image
            source={{ uri: post.image }}
            style={styles.postImage}
            resizeMode="cover"
          />
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
  postImage: {
    width: '100%',
    height: 375,
    borderRadius: 10,
  },
  captionText: {
    marginTop: 8,
    fontSize: 16,
  },
  usernameText: {
    fontWeight: 'bold',
  },
});
