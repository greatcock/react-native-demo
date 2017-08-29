import React, { Component } from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity
} from 'react-native';
import  Swipeout from 'react-native-swipeout'




import {MessageList} from './messageList'
import {Message} from  './message'


class ChatScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            message:[],
            isEnter:true,
            // isRightOpen:false
        };
        this.deleteMsg = this.deleteMsg.bind(this)
    }

    componentDidMount() {

        const url = ' http://ec2-54-255-177-132.ap-southeast-1.compute.amazonaws.com'
        fetch(
            `${url}/api/v1/chat/get_dialogue_list?user_id=1`
            )
            .then((response) => response.text())
            .then((response) =>{
                 console.log(123)
                const json = JSON.parse(response);
                let message = json.data

                this.setState({
                    message
                })
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    deleteMsg(index) {
        var message = this.state.message
        //删除最后一个的时候diff算法会检查第一次的message与最后一次message。如果相同 则不会渲染 所以最后一个不会删除。
        message.splice(index,1)
        if(message.length===0){
            this.setState({
                message:null
            })
            return false
        }
        //message.splice(index,1) 返回的是删除的那个
        this.setState({
            message
        })
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={{backgroundColor:'#676B6B',flex:1,paddingBottom:20}}>
                <View style={[styles.container]}>
                    <View style={[styles.contacts, {flexDirection:'row'}]}>
                        <Text style={styles.Vertical}></Text>
                        <Text>联系人:</Text>
                    </View>
                    {this.state.message != null ?
                    <FlatList
                        data = {this.state.message}
                        keyExtractor = { (item, index) => {
                             return item.dialogue_id
                             // return index
                        } }
                        renderItem = {({ item, index }) => {
                            let another_user = item.another_user
                            let latest_work_xp = another_user.latest_work_xp
                            let hrName = `${another_user.first_name +' '+ another_user.last_name}`
                            let company = latest_work_xp && latest_work_xp.company ? latest_work_xp.company : 'kong'
                            let dialogue_id = item.dialogue_id == null ? item.dialogue_id : 'kong'
                            let job_title = latest_work_xp && latest_work_xp.job_title ? latest_work_xp.job_title:'kong'
                            let description = latest_work_xp && latest_work_xp.description  ?latest_work_xp.description:'kong'
                            let avatar = another_user && another_user.avatar ? another_user.avatar:'kong'
                            return (
                                <Swipeout right={[{
                                        text: 'delete',
                                        backgroundColor:'red',
                                         onPress :()=> {
                                             this.deleteMsg(index)      // aaaa    bbb
                                         },
                                }]}
                                              //卡死
                                          // disabled={this.state.close}
                                          onOpen={() => {this.setState({isEnter:false})}}

                                >
                                <TouchableOpacity onPress={() =>{
                                        if(this.state.isEnter){
                                            navigate('Message',{ avatar,hrName, job_title, company, dialogue_id,color:'#90FFB4'})
                                        } else {
                                            this.setState({
                                                isEnter:true
                                            })
                                            return
                                        }
                                }
                                    }>

                                    <MessageList
                                        key={dialogue_id}
                                        message = {item}
                                        company= {company}
                                        job_title = {job_title}
                                        description = {description}
                                    />
                                </TouchableOpacity>
                                </Swipeout>
                            )
                        }}
                    /> : <Text>没有了</Text>
                    }
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