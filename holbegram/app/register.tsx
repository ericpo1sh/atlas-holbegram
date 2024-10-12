import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Page() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Register Page</Text>
      <Link href="/login" replace>
        <Text>Log in to an existing account</Text>
      </Link>
    </View>
  )
}
