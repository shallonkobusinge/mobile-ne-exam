import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import { useEffect } from 'react';

async function storeToken(user) {
    await AsyncStorage.setItem("token", JSON.stringify(user));

}

async function getToken() {
    return await AsyncStorage.getItem("token");
}

export default function Login({ navigation }) {
    const [formData, setFormData] = useState({});
    const [token, setToken] = useState("")
    const [loginSuccess, setLoginSuccess] = useState(false);
    const handleInput = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
        console.log(formData);
    }

    useEffect(() => {
        const changeToken = async () => {
            await storeToken(token);
        }
        changeToken();
    }, [token])



    const handleSubmit = async () => {
        await axios.post("http://192.168.8.117:5000/api/v1/auth/login", formData)
            .then((response) => {

                if (response?.data?.data?.isAdmin) {
                    setLoginSuccess(true);
                    setToken(response.data.token);
                    Alert.alert("Login", " logged in successfully");
                    setTimeout(() => {
                        navigation.navigate("NecHome")
                    }, 300)
                } else {
                    console.log(response.data.data);
                    Alert.alert("Login", " logged in successfully");
                    setTimeout(() => {
                        setLoginSuccess(true);
                        setToken(response.data.token);
                        navigation.navigate("VotersHome", {
                            user: response.data.data
                        })
                    }, 300)
                }




            }).catch((error) => {
                console.log("error ", error.response);
                Alert.alert("Login", error.response.data.message || "Couldn't login");
            })
    }
    return (
        <Navbar>
            <View style={styles.container}>
                <Text style={styles.heading}>Login</Text>
                <View>

                    <Input
                        label="Id/Phone/Email"
                        name="iDOrPhoneOrEmail"
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
                            onPress={() => { navigation.navigate("Register") }}
                            style={styles.touchable}
                        >
                            <Text>Don't have an account ?  </Text>
                            <Text style={styles.registerText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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