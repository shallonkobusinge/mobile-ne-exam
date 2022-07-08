import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'

export default function Register({ navigation }) {
    const [formData, setFormData] = useState({});


    const handleInput = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = () => {
        axios.post("http://192.168.0.11:5000/api/v1/users/add", formData)
            .then(response => {
                Alert.alert("Signup", "User added successfully");
                setTimeout(() => { navigation.navigate("Login") }, 300)

            })
            .catch((error) => {
                Alert.alert("Signup", error.response.data.message.details[0].message || "Couldn't signup");
            })
    }

    return (
        <Navbar>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >

                <Text style={styles.heading}>Register</Text>
                <View>

                    <Input
                        label="First Name"
                        name="fname"
                        InputHandler={handleInput}

                    />
                    <Input
                        label="Last Name"
                        name="lname"
                        InputHandler={handleInput}

                    />
                    <Input
                        label="Email"
                        name="email"
                        InputHandler={handleInput}

                    />
                    <Input
                        label="Phone"
                        name="phone"
                        InputHandler={handleInput}

                    />
                    <Input
                        label="Username"
                        name="username"
                        InputHandler={handleInput}

                    />
                    <Input
                        label="Password"
                        name="password"
                        InputHandler={handleInput}

                    />

                    <Button
                        SubmitData={handleSubmit}
                        title="Submit"
                    />

                    <View style={styles.redirect}>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("Login") }}
                            style={styles.touchable}
                        >
                            <Text>Already have an account ?  </Text>
                            <Text style={styles.registerText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Navbar>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginLeft: "auto",
        marginRight: "auto",

    },
    heading: {
        textAlign: "center",
        textTransform: "uppercase",
        fontSize: 25,
        fontWeight: "bold",
    },
    redirect: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 20

    },
    touchable: {
        display: "flex",
        flexDirection: 'column'
    },
    registerText: {
        color: "#496CE8"
    }

})