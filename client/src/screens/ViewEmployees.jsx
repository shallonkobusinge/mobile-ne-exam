import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import authHeader from '../utils/auth.header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';

export default function ViewEmployees() {
    const [employees, setEmployees] = useState([]);



    const fetchEmployees = async () => {
        const token = await AsyncStorage.getItem("token")
        const auth = token.split('"').join('')
        axios.get("http://192.168.1.129:5000/api/v1/users", {
            headers: {
                'authorization': `${auth}`
            }
        }).then((response) => {
            setEmployees(response.data.data.docs)
        }).catch((error) => {

        })
    }
    useEffect(() => {
        fetchEmployees()
    }, [employees])

    return (
        <Navbar>
            <View style={styles.menu}>
                <Text style={styles.heading}>View Employees</Text>
                <ScrollView style={styles.container}>
                    {employees.map((item, index) => (
                        <>
                            <View style={styles.card}>
                                <View style={styles.main}>
                                    <Text style={styles.userText}>First Name</Text>
                                    <Text style={styles.userTextValue}>{item.fname}</Text>
                                </View>
                                <View style={styles.main}>
                                    <Text style={styles.userText}>Last Name</Text>
                                    <Text style={styles.userTextValue}>{item.lname}</Text>
                                </View>
                                <View style={styles.main}>
                                    <Text style={styles.userText}>Email</Text>
                                    <Text style={styles.userTextValue}>{item.email}</Text>
                                </View>
                                <View style={styles.main}>
                                    <Text style={styles.userText}>Phone</Text>
                                    <Text style={styles.userTextValue}>{item.phone}</Text>
                                </View>
                                <View style={styles.main}>
                                    <Text style={styles.userText}>Is Admin</Text>
                                    <Text style={styles.userTextValue}>{item.isAdmin === true ? "YES" : "NO"}</Text>
                                </View>
                            </View>

                        </>
                    ))}

                </ScrollView>
            </View>

        </Navbar>

    )
}

const styles = StyleSheet.create({
    menu: {
        marginLeft: "auto",
        marginRight: "auto",

    },
    heading: {
        textAlign: "center",
        textTransform: "uppercase",
        fontSize: 25,
        fontWeight: "bold",
    },
    container: {
        paddingLeft: 20,
        borderRadius: 30,
    },
    card: {
        paddingTop: 8,
        backgroundColor: "white",
        marginTop: 10,
        height: 150,
        width: 370,
        paddingTop: 20,
        textAlign: 'left',
        elevation: 20,
        borderRadius: 10
    },
    main: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around",
    },
    userText: {
        textAlign: 'center'
    },
    userTextValue: {
        width: 120,
        textAlign: 'center'
    }
})