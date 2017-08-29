import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    StatusBar,
    FlatList,
    InteractionManager
} from 'react-native';
import {Input} from "./input"


class Message extends Component {
    constructor(props){
        super(props)
        this.state = {
            message: '',
            dialogue_id : null,
            content: '',
            hrName:'',
            from_user_id:''
        }
    }

    static navigationOptions = ({navigation}) =>({
            headerTitle:
                <View style={{alignSelf:'center', alignItems:'center',marginRight:40}}>
                    <Text style={{fontSize: 15}}>
                        {navigation.state.params.hrName}
                    </Text>
                    <Text style={{fontSize: 14}}>
                        {navigation.state.params.company}
                    </Text>
                </View>
        }
    )




    componentDidMount (){
        console.log('componentWillMount')
        const {params} = this.props.navigation.state
        let dialogue_id = params.dialogue_id
        let hrName = params.hrName
        this.setState({
            dialogue_id,
            hrName,
        })
            const url = 'http://ec2-54-255-177-132.ap-southeast-1.compute.amazonaws.com'
            fetch(
                `${url}/api/v1/chat/get_dialogue_msg?dialogue=1`
                )
                .then((response) => response.text())
                .then((response) =>{
                    const json = JSON.parse(response);
                    let message = json.data
                    // let content = message.content
                    // let from_user_id = message.from_user_id
                    this.setState({
                        message
                    })
                })
                .catch((err) =>{
                    console.log(err)
                })

        //跳转到聊天记录最下面
        InteractionManager.runAfterInteractions(() => {
            //使用InteractionManager可以让一些耗时的任务在交互操作或者动画完成之后进行执行
            this.FlatList.scrollToEnd({animated: true})

        });
    }

    render() {
        // const data = this.state.message
        // let data = this.message
        const {params} = this.props.navigation.state
        return (
            <View style={{flex:1}}>
                <StatusBar backgroundColor= {params.color} />
                <View style={styles.exchange}>
                    <Text style={[styles.flex,styles.centered,{color:'blue'}]}>End chat</Text>
                    <Text style={[styles.centered,{width:.5,height:30 ,backgroundColor:'gray'}]}>ss</Text>
                    <Text style={[styles.flex,styles.centered,{color:'blue'}]}>resume</Text>
                </View>
                <View style={{alignSelf:'center',marginTop:15}}><Text style={{fontSize:11}}>{`您正在与Boss ${params.hrName}直接沟通如下职位`}</Text></View>
                <View style={styles.message}>
                    <FlatList
                        ref={ FlatList => this.FlatList = FlatList}
                        // onScroll = { ()=> console.log(this.ref)}
                        data = { this.state.message }
                        // extraData={this.state}
                        keyExtractor = { (item, index) => {
                           // console.log(item)
                            return item.msg_id
                        } }

                        renderItem = {({ item, index }) => {
                            let content = item.content
                            let from_user_id = item.from_user_id
                            let user = from_user_id === 4? 'my':'other'
                            let source = user==='my' ? require('../img/combinedShape.png') :{uri:params.avatar}
                            return (
                                <View style={styles[user]} key = {index}>
                                <Image source={source} style={styles.userIcon}/>
                                {/*<Image source={require('../img/iconEat.png')} style={styles.userIcon}/>*/}
                                <Text style={[styles.containerText,{backgroundColor: '#3af0b1',alignSelf:'center'}]}
                                    selectable={true}
                                    numberOfLines={4}
                                > {content}</Text>
                            {/*<Image source={require('../img/ticked.png')} style={styles.userIcon}/>*/}
                                </View>
                            )

                        }}
                    />

                </View>
                <Input />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    exchange:{
        flexDirection:'row',
        backgroundColor: '#f0f0f0',
        height:45,
        alignItems:'center',

    },
    centered: {
       textAlign:'center'
    },
    flex: {
        flex:1
    },
    message:{
         flex:1,
        marginVertical:10,
    },
    my:{
        flexDirection:'row-reverse',
       // backgroundColor: '#3af0b1',
        marginVertical:5,
    },
    containerText: {
        paddingHorizontal:10, //zuoyou内边距
        paddingVertical:10, //上下
        borderRadius: 12.5,
        maxWidth:200
        // flex: 1
    },
    other:{
        flexDirection: 'row',
       // backgroundColor: '#3af0b1',
        marginVertical:5,
    },
    userIcon: {
        width: 44,
        height: 44,
        borderRadius: 12.5,
        marginHorizontal:8,


    },
});

export {Message}