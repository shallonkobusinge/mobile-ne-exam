import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ButtonComponent({ navigation, SubmitData, title }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity

                style={styles.button}
                underlayColor='#fff'
                onPress={SubmitData}
            >
                <Text
                    style={styles.buttonText}
                >{title}</Text>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: "#496CE8",
        width: 140,
        height: 40,
        color: "white",
        paddingBottom: 10
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        marginTop: 7,
        fontSize: 16,
    }
})