import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Select from "../components/Select"

export default function RegisterCandidate({ navigation }) {
    const [formData, setFormData] = useState({});

    const genderOptions = [
        { value: "FEMALE", label: "FEMALE" },
        { value: "MALE", label: "MALE" }
    ]

    const handleInput = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const SelectHandler = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        const token = await AsyncStorage.getItem("token")
        const auth = token.split('"').join('')
        axios.post("http://192.168.8.117:5000/api/v1/candidate/register", formData, {
            headers: {
                'authorization': `${auth}`
            }
        })
            .then(response => {
                console.log(response.data);
                Alert.alert("Candidate", "Candidate added successfully");
                setTimeout(() => { navigation.navigate("NecHome") }, 300)

            })
            .catch((error) => {
                console.log("error ", error.response.data);
                Alert.alert("Signup", error.response.data.message || "Couldn't register");
            })
    }

    return (
        <Navbar>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >

                <Text style={styles.heading}>Add Candidate</Text>
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
                        label="National ID"
                        name="nationalId"
                        InputHandler={handleInput}

                    />
                    <View style={styles.select}>
                        <Select
                            options={genderOptions}
                            SelectHandler={SelectHandler}
                            name="gender"
                            label="Select the gender"

                        />
                    </View>

                    <Input
                        label="Mission Statement"
                        name="missionStatement"
                        InputHandler={handleInput}

                    />
                    <Button
                        SubmitData={handleSubmit}
                        title="Submit"
                    />


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
    },
    select: {
        marginTop: 30
    },

})