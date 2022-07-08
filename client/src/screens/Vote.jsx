import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import authHeader from '../utils/auth.header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';

export default function Vote({ route, navigation }) {
    const [candidates, setCandidates] = useState([]);
    const [newVote, setNewVote] = useState(false);

    const [user, setUserId] = useState(route?.params?.user);

    const voteCandidate = async (id) => {
        console.log("reached", id, route.params.user._id, route.params.displayVote);
        const token = await AsyncStorage.getItem("token")
        const auth = token.split('"').join('')
        axios.post(`http://192.168.8.117:5000/api/v1/candidate/vote/${id}`, {
            user: user?._id
        }, {
            headers: {
                'authorization': `${auth}`
            }
        })
            .then(response => {
                console.log(response.data)
                setNewVote(true);

                Alert.alert("Voting", `${response?.data?.message} ${response?.data?.data?.fname} ${response?.data?.data?.lname}` || "Voted successfully");

            })
            .catch((error) => {
                console.log(error.response.data.message);
                Alert.alert("Vote", error.response.data.message || "Couldn't vote");
            })
        setNewVote(false);
    }


    const fetchCandidates = async () => {
        const token = await AsyncStorage.getItem("token")
        const auth = token.split('"').join('')
        axios.get("http://192.168.8.117:5000/api/v1/candidates", {
            headers: {
                'authorization': `${auth}`
            }
        }).then((response) => {
            setCandidates(response.data.data)
        }).catch((error) => {

        })
    }
    useEffect(() => {
        fetchCandidates()
    }, [newVote])

    return (
        <Navbar>
            <View style={styles.menu}>
                <Text style={styles.heading}>View All Candidates</Text>
                <ScrollView style={styles.container}>
                    {candidates.map((candidate, index) => (
                        <>
                            <View style={styles.card}>
                                <View style={styles.main}>
                                    <Text style={styles.userText}>First Name</Text>
                                    <Text style={styles.userTextValue}>{candidate?.fname}</Text>
                                </View>
                                <View style={styles.main}>
                                    <Text style={styles.userText}>Last Name</Text>
                                    <Text style={styles.userTextValue}>{candidate?.lname}</Text>
                                </View>
                                <View style={styles.main}>
                                    <Text style={styles.userText}>Gender</Text>
                                    <Text style={styles.userTextValue}>{candidate?.gender}</Text>
                                </View>
                                <View style={styles.main}>
                                    <Text style={styles.userText}>Mission Statement</Text>
                                    <Text style={styles.userTextValue}>{candidate?.missionStatement}</Text>
                                </View>
                                <View style={styles.main}>
                                    <Text style={styles.userText}>Number of votes</Text>
                                    <Text style={styles.userTextValue}>{candidate?.votes}</Text>
                                </View>
                                <View style={styles.main}>
                                    <Text style={styles.userText}>Picture</Text>
                                    <Text style={styles.userTextValue}></Text>
                                </View>
                                {(route?.params?.displayVote) &&



                                    <>
                                        <View style={styles.main}>

                                            <TouchableOpacity
                                                onPress={() => { voteCandidate(candidate?._id) }}
                                                style={styles.touchable}
                                            >
                                                <Text style={styles.voteText}>{`Vote ${candidate?.fname} ${candidate?.lname}`}</Text>

                                            </TouchableOpacity>
                                        </View>
                                    </>

                                }





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
        marginTop: 20
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
    },
    touchable: {
        display: "flex",
        flexDirection: 'column'
    },
    registerText: {
        color: "#496CE8"
    },
    voteText: {
        color: "#496CE8",
        textTransform: 'uppercase'
    }
})