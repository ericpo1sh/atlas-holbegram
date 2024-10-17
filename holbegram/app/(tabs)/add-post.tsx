import { AddPhotoButton } from "@/components/Buttons";
import { View, Text } from "react-native";

export default function Page() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Add Post Page</Text>
      <AddPhotoButton></AddPhotoButton>
    </View>
  )
}
