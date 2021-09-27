import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { Alert, Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { McMovie } from '../interfaces/mcMovies.interface';
import { appTheme } from '../themes/appTheme';

// import GoogleCast, { CastButton, useRemoteMediaClient } from 'react-native-google-cast'
// import { getStreamVideo } from '../hooks/useMyCinema';

interface Props{
    data: McMovie;
    height?: number;
    width?: number;
}

export const MovieCardMyCinema = ( { data, height = 420, width = 275 }: Props) => {

    const navigation = useNavigation();
    
    const [enableModalInfo, setEnableModalInfo] = useState(false);
    const [isVideoPlay, setIsVideoPlay] = useState(false);
    
    //const { video, isVideoLoading } = getStreamVideo(data.title);

    // const client = useRemoteMediaClient();

    
    // if (client) {
    //     // Send the media to your Cast device as soon as we connect to a device
    //     // (though you'll probably want to call this later once user clicks on a video or something)
    //     client.loadMedia({
    //         mediaInfo: {
    //             contentUrl: 
    //             //video,
    //             //'http://192.168.1.38:3000/streamMovie?path=assets/movies/deadpool_2/deadpool_2.mp4',
    //             'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4',
    //             contentType: 'video/mp4',
    //             metadata: {
    //               images: [
    //                 {
    //                   url: data.poster_path
    //                 },
    //               ],
    //               title: data.title,
    //               type: 'movie',
    //             },
    //           }

    //     }).then( res => {
    //         console.log("LOADMEDIA", res);
    //     }).catch( error => {
    //         console.log("LOADMEDIA ERROR", error);
    //         //GoogleCast.sessionManager.endCurrentSession();
    //     });
    //     console.log("CLIENT", client);
    // }


    // const castVideo = async () => {

    //     GoogleCast.sessionManager.endCurrentSession();

    //     const existConexion = await GoogleCast.getCastState(); //noDevicesAvailable - connecting - connected - notConnected
    //     console.log("existConexion", existConexion);
        
    //     if (existConexion !== 'connecting' && existConexion !== 'connected'){
    //         GoogleCast.showCastDialog();
    //     }
        
    // }

    // const togglePlayStopVideo = () => {
    //     setIsVideoPlay( (isVideoPlay) ? false : true);
    //     console.log(isVideoPlay);
    //     if(isVideoPlay){ client?.pause(); }else{ client?.play(); }
    // }

    const ModalInfoVideo = () => {
        return (
            <View style={ appTheme.modalCentered }>
                <Modal
                animationType="slide"
                transparent={true}
                visible={enableModalInfo}
                onRequestClose={() => {
                    setEnableModalInfo(false);
                }}
                >
                    <View style={ appTheme.modalCentered }>
                        <View style={ appTheme.modalView }>
                            <View style={{ ...appTheme.modalContainerPoster, alignItems:'center' }}>
                                <TouchableOpacity style={ appTheme.backButton } 
                                    onPress={() => setEnableModalInfo(false)}> 
                                <Icon 
                                    name='arrow-back'
                                    size={ 45 }
                                    style={{ color: 'white'}}
                                />
                                </TouchableOpacity>
                                <Image
                                    source={{ uri: data.poster_path }}
                                    style={ appTheme.modalPoster }
                                    resizeMode='cover'
                                />
                                <Text style={{ 
                                    ...appTheme.sectionTitle, 
                                    marginVertical: 10, 
                                    paddingHorizontal: 10 }}>
                                    {data.title.replace(/_/g,' ').toUpperCase()}
                                </Text>

                                <Button 
                                    title={'Ver película'}
                                    onPress={ () => {
                                        setEnableModalInfo(false);
                                        navigation.navigate('VideoScreen', data);
                                    }}
                                />

                                {/* <TouchableOpacity style={{
                                    backgroundColor: '#EBC300',
                                    padding: 15,
                                    borderRadius: 10,
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    marginVertical: 20}}
                                    onPress = { () => castVideo()}
                                    >
                                    <CastButton style={{marginHorizontal: 10, marginRight: 20}} />
                                    <Text>Ver en TV</Text>
                                    <Icon 
                                        name={ (isVideoPlay) ? 'pause' : 'play'}
                                        size={ 40 }
                                        onPress={ () => togglePlayStopVideo()}
                                    />
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
    
    return (
        <View>
            <TouchableOpacity 
            onPress= { () => 
                setEnableModalInfo(true)
                //navigation.navigate('VideoScreen', data)
            }
            activeOpacity= {0.8}
            style={{ 
                height, width, 
                marginHorizontal: 2,
                paddingBottom: 20,
                paddingHorizontal: 2
            }}>
                <View style={cardStyle.image_container}>
                    <Image
                        source={{ uri: data.poster_path }}
                        style={ cardStyle.image }
                        resizeMode='cover'
                    />
                </View>
            </TouchableOpacity>

            <ModalInfoVideo></ModalInfoVideo>
        </View>
    )
}

const cardStyle = StyleSheet.create({
    image_container:{
        flex: 1,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 7,

        elevation: 10
    },
    image: {
        flex: 1,
        borderRadius: 5,

    }
})
