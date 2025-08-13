// TODO: Upload Image to Buckets// services/BucketService.ts
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export const uploadImageToBucket = async (imageUri: string, imageName: string) => {
  const storageRef = ref(storage, `images/${imageName}`);

  // Convert URI -> Blob
  const res = await fetch(imageUri);
  const blob = await res.blob();

  await uploadBytes(storageRef, blob);
  return await getDownloadURL(storageRef);
};
