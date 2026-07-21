import * as FileSystem from "expo-file-system"
import { Alert } from "react-native";



export const downloadFile = async (url) => {
    try {
        const filename = url.split('/').pop();
        const fileUri = FileSystem.documentDirectory + filename;

        const downloadResumable = FileSystem.createDownloadResumable(
            url,
            fileUri
        );

        const { uri } = await downloadResumable.downloadAsync();
        Alert.alert('Download complete', `Saved to: ${uri}`);
        console.log('Finished downloading to ', uri);
    } catch (e) {
        console.error(e);
        Alert.alert('Download failed', e.message);
    }
};