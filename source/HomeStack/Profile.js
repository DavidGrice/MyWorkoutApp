import React, { useState, useContext,  } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, Button, StyleSheet, SafeAreaView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
// Android -> app -> src -> debug -> AndroidManifest.xml
import { AuthContext } from '../context';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const Profile = () => {
    const [imageSource, setImageSource] = useState(null);
    let { signOut } = useContext(AuthContext);

    useFocusEffect(
        React.useCallback(() => {
          const getPhoto = getAsyncData();
    
          return () => getPhoto;
        }, [])
      );

    const getAsyncData = async() => {
        try {
            AsyncStorage.getItem('profilePhoto', function(errs, result) {
                if (!errs) {
                    if (result !== null) {
                    console.log('profilePhoto' + result); /* it works */
                    }
                }
                }).then((userPhoto) => setImageSource(userPhoto));
        } catch(error) {
            console.log(error)
        }
    }
  
    const setNewPhoto = async(imageSource) => {
        try {
            await AsyncStorage.setItem('profilePhoto', imageSource)
        } catch(error) {
            console.log(error)
        }
    }

    selectImage = () => {
      let options = {
        title: 'You can choose one image',
        maxWidth: 256,
        maxHeight: 256,
        noData: true,
        mediaType: 'photo',
        storageOptions: {
          skipBackup: true
        }
      };

    ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled photo picker');
            Alert.alert('You did not select any image');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            let source = { uri: response.uri };
            setNewPhoto(source.uri);
            setImageSource(source.uri);
        }
        });
    }

    imageCamera = () => {
        let options = {
            title: 'You can choose one image',
            maxWidth: 256,
            maxHeight: 256,
            noData: true,
            mediaType: 'photo',
            storageOptions: {
              skipBackup: true
            }
          };

        ImagePicker.launchCamera(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled photo picker');
            Alert.alert('You did not select any image');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let source = { uri: response.uri };
            setNewPhoto(source.uri);
            setImageSource(source.uri);
            }
        });
    }
  
    return (
    <SafeAreaView style={styles.mainContainer}>
        <View style={styles.subContainer}>
            <View style={styles.mainTitleView}>
                <Text style={styles.mainTitle}> Profile </Text>
            </View>
            <View style={styles.imageContainer}>
            {imageSource === null ? (
                <Image
                source={require('../Assets/Images/placeholder.png')}
                style={styles.imageBox}
                resizeMode='contain'
                />
            ) : (
                <Image
                source={{ uri: imageSource }}
                style={styles.imageBox}
                resizeMode='contain'
                />
            )}
            </View>
            <View style={styles.selectButtonView}>
                <View style={styles.touchButton}>                 
                    <TouchableOpacity
                        onPress={selectImage}
                        style={styles.selectButtonContainer}
                    >
                        <Text style={styles.selectButtonTitle}>Camera Roll</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.touchButton}>
                    <TouchableOpacity
                        onPress={imageCamera}
                        style={styles.selectButtonContainer}
                    >
                        <Text style={styles.selectButtonTitle}>Take photo</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.logoutButtonView}>
                <Button title="Logout" color='#26db60' onPress={() => signOut()}> </Button>
            </View>
        </View>
    </SafeAreaView>
    );
  }

export default Profile;


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#434A54',
        justifyContent: 'center',
    },

    subContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        height: '80%',
        width: '80%',
    },
    mainTitleView: {
        marginTop: 10,
        height: 50,
        width: 200,
        backgroundColor: '#26db60',
        borderRadius: 10,
        
    },

    mainTitle: {
        marginTop: 5,
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },

    imageContainer: {
        marginVertical: 20,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 5,
        zIndex: 3,
    },

    imageBox: {
        width: 128,
        height: 128,
    },

    selectButtonView: {
        height: 60,
        width: 200,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    touchButton: {
        marginTop: 10,
    },
      selectButtonContainer: {
        height: 40,
        width: 80,
        borderRadius: 5,
        backgroundColor: '#26db60',
      },
      selectButtonTitle: {
        marginTop: 12,
        fontFamily: 'arial',
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
        color: 'white',
      },

      logoutButtonView: {
        marginTop: 60,
        width: 125,
        backgroundColor: 'black',
      },
});