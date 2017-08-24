import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';

 class HomeScreen extends Component {
    // static navigationOptions = {
    //     title: '首页',
    // };
 //     static navigationOptions = {
 //         headerTitle: '首页',
 // };
    render() {
       // const { navigate } = this.props.navigation;

        return (
            <View>
                <Text>首页</Text>
                {/*<Button*/}
                    {/*onPress={() => navigate('Chat', { id: '233333333', name: 'nico' })}*/}
                    {/*title="Go"*/}
                {/*/>*/}
            </View>
        );
    }}
export {HomeScreen}