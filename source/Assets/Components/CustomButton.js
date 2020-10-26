import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = (props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.customClick}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        color: 'white',
        padding: 10,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 5,
        borderColor: 'gold',
        borderWidth: 1,
        marginBottom: 16,
    },

    text: {
        color: 'white'
    },
});