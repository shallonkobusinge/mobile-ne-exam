import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function VotersHome({ route, navigation }) {
    console.log("user ", route?.params?.user)
    const handleLogout = () => {
        AsyncStorage.removeItem("token")
        Alert.alert("Logout", "User logged out successfully")
        setTimeout(() => { navigation.navigate("Login") }, 300)
    }
    return (

        <View style={styles.container}>
            <View
                style={styles.item}

            >
                <Image
                    source={require("../../assets/images/poll.jpg")}
                    style={styles.image}
                    resizeMode='contain'
                />
            </View>
            <View
                style={styles.selection}
            >
                <Text style={styles.optionText}>Select your option</Text>

                <TouchableOpacity
                    style={styles.selectionText}
                    onPress={() => {
                        navigation.navigate("Vote", {
                            user: route?.params?.user,
                            displayVote: true
                        })
                    }}
                >
                    <Text
                        style={styles.employeesText}
                    >View and Vote Candidates</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.selectionText}
                    onPress={handleLogout}
                >
                    <Text
                        style={styles.employeesText}
                    >Logout</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "white",
        flex: 1,


    },
    item: {
        alignItems: "center",
        justifyContent: "center",

    },
    optionText: {
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: "bold",
        paddingBottom: 20
    },
    selection: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: -90
    },
    image: {
        marginTop: 30,
        height: "45%",
        width: "45%",
        borderRadius: 100
    },
    selectionText: {
        width: "50%",
        height: "14%",
        marginTop: 10,
        backgroundColor: "#EEF2FF"
    },
    employeesText: {
        textAlign: "center",
        marginTop: 14,
    }
})