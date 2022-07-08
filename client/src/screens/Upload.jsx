
export default function UploadImageComp() {


    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ marginTop: 80 }} onPress={takeAndUploadPhotoAsync}>
                <Text>UplodButton</Text>
            </TouchableOpacity>
        </View>
    )
}

