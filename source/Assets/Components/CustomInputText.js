import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CustomInputText = (props) => {
    return (
        <View style={styles.viewStyle}>
            <TextInput 
            underlineColorAndroid="transparent"
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor}
            keyboardType={props.keyboardType}
            onChangeText={props.onChangeText}
            returnKeyType={props.returnKeyType}
            numberOfLines={props.numberOfLines}
            multiline={props.multiline}
            onSubmit={props.onSubmit}
            onSubmitEditing={props.onSubmitEditing}
            style={props.style}
            blurOnSubmit={false}
            value={props.value}
            />
        </View>
    );
};

export default CustomInputText;

const styles = StyleSheet.create({
    viewStyle: {
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
    },
});