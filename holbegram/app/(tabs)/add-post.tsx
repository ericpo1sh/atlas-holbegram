import { AddImagePlaceholder } from "@/components/AddImagePlaceholder";
import { useAuth } from "@/components/AuthProvider";
import { AddPhotoButton, ResetPhotoButton, SaveAddedPhotoButton } from "@/components/Buttons";
import { CaptionInput } from "@/components/Inputs";
import { Loading } from "@/components/Loading";
import { useImagePicker } from "@/hooks/useImagePicker";
import firestore from "@/lib/firestore";
import storage from "@/lib/storage";
import { useState } from "react";
import { View, Text, Button } from "react-native";

export default function Page() {
  const auth = useAuth();
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { image, openImagePicker, reset: resetImage } = useImagePicker();

  function reset() {
    setCaption("");
    resetImage();
  }

  async function save() {
    if (!image) {
      return;
    }
    setLoading(true);
    const name = image?.split('/').pop() as string; 
    const { downloadUrl, metadata } = await storage.upload(image, name);
    console.log(downloadUrl);

    firestore.addPost({
      caption,
      image: downloadUrl,
      createdAt: new Date(),
      createdBy: auth.user?.uid!!,
      favoritedBy: [],
    });

    setLoading(false);
    alert('Post Added');
    reset();
  }

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
            <SaveAddedPhotoButton onPress={save}/>
            <ResetPhotoButton onPress={reset}/>
          </View>
        )}
      </View>
      {loading && <Loading/>}
    </View>
  )
}
