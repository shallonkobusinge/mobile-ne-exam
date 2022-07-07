import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
// export function authHeader() {
//     AsyncStorage.getItem("token").then((response) => {
//         if (response) {
//             return { authorization: `${response}` };
//         } else {
//             return {};
//         }
//     }).catch((error) => {

//     })

// }

export default async function authHeader() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        return { authorization: `${token}` }
    } else {
        return {}
    }
}