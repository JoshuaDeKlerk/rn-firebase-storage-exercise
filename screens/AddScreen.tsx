import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as React from 'react'

const AddScreen = () => {

    const [title, setTitle] = React.useState<string>('')
    const [image, setImage] = React.useState<string | null>(null)

    // function to pick an image
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsMultipleSelection: false,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.inputField}
            placeholder="Memory Title"
            onChangeText={newText => setTitle(newText)}
            defaultValue={title}
        />

        {/* TODO: Upload Image */}
        <Button title="Pick an image from camera roll" onPress={pickImage} />

        {image && (
            <Image 
                source={{ uri: image }} 
                style={{ width: 200, height: 200 }} 
            />
        )}

        <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Add Memory</Text>
        </TouchableOpacity> 
    </View>
  )
}

export default AddScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    inputField: {
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 15,
        padding: 10
    },
    button: {
        backgroundColor: "green",
        textAlign: 'center',
        padding: 15,
        marginTop: 30
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
})