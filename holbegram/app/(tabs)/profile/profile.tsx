import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, FlatList, Dimensions } from "react-native";
import firestore from "@/lib/firestore";
import { useAuth } from "@/components/AuthProvider";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfilePage() {
  const auth = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserPosts = async () => {
    try {
      const fetchedPosts = await firestore.getUserPosts(auth.user?.uid);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      await fetchUserPosts();
      setLoading(false);
    };
    initialFetch();
  }, []);

  const renderGridItem = ({ item }: { item: any }) => (
    <Image source={{ uri: item.image }} style={styles.gridImage} />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: auth.user.photoURL || 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.username}>{auth.user?.email || 'User'}</Text>
      </View>

      <FlatList
        data={posts}
        renderItem={renderGridItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImageContainer: {
    borderRadius: 75,
    overflow: 'hidden',
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  gridContainer: {
    paddingHorizontal: 10,
  },
  gridImage: {
    width: (Dimensions.get('window').width / 3) - 15,
    height: (Dimensions.get('window').width / 3) - 15,
    margin: 5,
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
