import { View, Text, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import React from 'react'

export default function Select({ options, SelectHandler, name, label }) {
    return (
        <View style={styles.container}>
            <RNPickerSelect
                onValueChange={(value) => SelectHandler(name, value)}
                items={options}
                placeholder={{
                    label: label,
                    value: null
                }}
                style={styles.selectOptions}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 250,
        height: 70,
        paddingLeft: 10,
        paddingTop: 10,
        elevation: 2,
        fontWeight: 'bold'
    },
    selectOptions: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    }
})