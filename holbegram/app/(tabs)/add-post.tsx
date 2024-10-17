import { AddImagePlaceholder } from "@/components/AddImagePlaceholder";
import { AddPhotoButton } from "@/components/Buttons";
import { Loading } from "@/components/Loading";
import { useState } from "react";
import { View, Text, Button } from "react-native";

export default function Page() {
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const image = undefined;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <AddImagePlaceholder image={image}/>
      <View style={{}}>
        {!image && (
          <AddPhotoButton onPress={() => alert('Add photo')}/>
        )}
        {image && (
          <View style={{ flex: 1, gap: 16 }}>
            <View style={{ flex: 0 }}>
              <CaptionInput caption={caption} setCaption={setCaption}></CaptionInput>
            </View>
            <Button
            theme="primary"
            label="Save"
            onPress={() => alert('Save')}
            />
            <Button label={'Reset'} onPress={() => alert('Reset')}></Button>
          </View>
        )}
      </View>
      {loading && <Loading/>}
    </View>
  )
}
