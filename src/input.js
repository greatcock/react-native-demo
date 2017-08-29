import React,{ Component } from 'react';
import {
    PixelRatio,
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    Image
} from 'react-native';

class Input extends Component {

    render() {

        return (
            <View style={styles.navBottom}>
                <Image style={styles.icon} source={require('../img/iconEat.png')}/>
                <TextInput style={styles.inputs}
                           underlineColorAndroid='transparent'
                           multiline = {true}
                           numberOfLines = {4}
                           placeholder='input message'
                           placeholderTextColor='#E8E8E8'
                           autoCapitalize='none'/>
            </View>
        );
    }}
const onePT = 1 / PixelRatio.get();
const styles = StyleSheet.create({
    navBottom:{
        flexDirection: 'row',
        height:49,
        backgroundColor: '#f0f0f0',
        alignItems:'center',
        borderWidth: onePT,
        borderColor: 'gray',
        justifyContent:'center'
    },
    icon:{
        width:20,
        height:20,
        borderRadius: 12.5,
    },
    inputs: {
        width:200,
        height: 30,
        borderWidth: 1,
        marginLeft: 5,
        paddingLeft: 5,
        borderColor: '#CCC',
        borderRadius: 4,
        fontSize:15,
    },
})
export {Input}