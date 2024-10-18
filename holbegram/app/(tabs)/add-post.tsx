import { AddImagePlaceholder } from "@/components/AddImagePlaceholder";
import { AddPhotoButton, ResetPhotoButton, SaveAddedPhotoButton } from "@/components/Buttons";
import { CaptionInput } from "@/components/Inputs";
import { Loading } from "@/components/Loading";
import { useImagePicker } from "@/hooks/useImagePicker";
import { useState } from "react";
import { View, Text, Button } from "react-native";

export default function Page() {
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { image, openImagePicker, reset } = useImagePicker();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <AddImagePlaceholder image={image}/>
      <View style={{}}>
        {!image && (
          <AddPhotoButton onPress={openImagePicker}/>
        )}
        {image && (
          <View style={{width: '100%', alignItems: 'center'}}>
            <CaptionInput caption={caption} setCaption={setCaption}></CaptionInput>
            <SaveAddedPhotoButton onPress={() => alert('Saved')}/>
            <ResetPhotoButton onPress={reset}/>
          </View>
        )}
      </View>
      {loading && <Loading/>}
    </View>
  )
}
