import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Loading } from "@/components/Loading";
import { useAuth } from "@/components/AuthProvider";
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from "@/lib/firestore";

export default function FavoritesPage() {
  const auth = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const fetchedPosts = await firestore.getPosts(); // Assuming you fetch all posts
      const userFavorites = fetchedPosts.filter(post => post.favoritedBy.includes(auth.user?.uid));
      setFavorites(userFavorites);
      setLoading(false);
    };

    fetchFavorites();
  }, [auth.user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          Hello, {auth.user?.email || 'Guest'}! Here are your favorite posts:
        </Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet!</Text>
        </View>
      ) : (
        favorites.map((post, index) => (
          <View key={index} style={styles.postContainer}>
            <View style={styles.userRow}>
              <View style={styles.userInfo}>
                <Ionicons name="person-circle-outline" size={24} color="black" />
                <Text style={styles.usernameText}>Random User</Text>
              </View>
              <Ionicons name="ellipsis-horizontal" size={24} color="black" />
            </View>

            <TouchableOpacity>
              <Image
                source={{ uri: post.image }}
                style={styles.postImage}
                resizeMode="cover"
              />
            </TouchableOpacity>

            <Text style={styles.captionText}><Text style={styles.usernameText}>Random User </Text>{post.caption}</Text>
          </View>
        ))
      )}
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
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});
