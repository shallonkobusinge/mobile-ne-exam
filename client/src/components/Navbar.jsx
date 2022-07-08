import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

export default function Navbar({ children }) {
    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Text style={styles.logo}>VS</Text>

            </View>
            <View style={styles.main}>
                {children}
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#496CE8"
    },
    navbar: {
        height: "15%",
        justifyContent: 'center',
        paddingLeft: 20
    },
    logo: {
        color: "#FFFFFF",
        fontSize: 18,
    },
    main: {
        height: "85%",
        backgroundColor: "white",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,

        paddingTop: 10


    }
})