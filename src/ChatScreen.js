import React, { Component } from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity
} from 'react-native';

import {MessageList} from './messageList'
import {Message} from  './message'

class ChatScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            message: []
        };
    }
    // static navigationOptions = {
    //     headerTitle: '聊天页',
    // };
    componentDidMount() {

        const url = ' http://ec2-54-255-177-132.ap-southeast-1.compute.amazonaws.com'
        fetch(
            `${url}/api/v1/chat/get_dialogue_list?user_id=2`
            )
            .then((response) => response.text())
            .then((response) =>{
                 console.log(123)
                const json = JSON.parse(response);
                let message = json.data
                // console.log(message[0].another_user.latest_work_xp.company)
                this.setState({
                    message
                })
            })
            .catch((err) =>{
                console.log(err)
            })
    }
    // static navigationOptions = {
    //     title: '聊天页',
    //     headerRight: <Button title="你好" />
    // };
    render() {
        const { navigate } = this.props.navigation

        return (
            <View style={{backgroundColor:'#676B6B'}}>
                <View style={[styles.container]}>
                    <View style={[styles.contacts, {flexDirection:'row'}]}>
                        <Text style={styles.Vertical}></Text>
                        <Text>联系人:</Text>
                    </View>
                    <FlatList
                        data = {this.state.message}
                        keyExtractor = { (item, index) => {
                            return index
                        } }
                        renderItem = {({ item, index }) => {
                            let hrName = `${item.another_user.first_name +' '+ item.another_user.last_name}`
                            let company = item.another_user.latest_work_xp.company ? item.another_user.latest_work_xp.company : '不能显示'
                            let dialogue_id = item.dialogue_id
                            let job_title = item.another_user.latest_work_xp.job_title ?item.another_user.latest_work_xp.job_title :'无'
                            let description = item.another_user.latest_work_xp.description ?item.another_user.latest_work_xp.description:'wu'
                            let avatar = item.another_user.avatar
                            return (
                                <TouchableOpacity onPress={() =>{
                                    navigate('Message',{ avatar,hrName, job_title, company, dialogue_id,color:'#90FFB4'})} }>
                                    <MessageList
                                        key = {index}
                                        message = {item}
                                        company= {company}
                                        job_title = {job_title}
                                        description = {description}
                                    />
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
                );
            }
        }
const styles = StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:'#f0f0f0',
        marginTop:10
    },
    contacts:{
        height:35,
        alignItems:'center',
        borderBottomWidth:.3,
        borderBottomColor:'#B5B5B5'
    },
    Vertical:{
        width:3,
        height:'100%',
        backgroundColor:'blue',
        marginRight:30
    }
});
export {ChatScreen}