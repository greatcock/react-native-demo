import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';


class MessageList extends Component {
    // static navigationOptions = {
    //     title: '聊天页' +'/n',
    //
    // };
    render() {
        //  let key = this.props.key
        // console.log(key)
        // const {params} = this.props.navigation.state
        // console.log(this.props.message.another_user.latest_work_xp.company)
        return (

            <View style={[styles.list, styles.row]}>

                <Image source={{uri:`${this.props.message.another_user.avatar}`}} style={[styles.userIcon,styles.userIconRightSpace ]}></Image>

                <View style={{flex:1,flexDirection: 'column',justifyContent:'space-around'}}>

                    <View >
                        <Text style={styles.html}>
                            {`${this.props.message.another_user.first_name +' '+ this.props.message.another_user.last_name}`}
                        </Text>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'flex-start'}}>

                        <Text style={styles.html}>
                            {this.props.company}
                        </Text>

                        <Text style={{width:1,height:7 ,backgroundColor:'gray',marginLeft:6,alignSelf:'center'}}></Text>

                        <Text style={[styles.html,{marginLeft:6}]}>
                            {this.props.job_title}
                        </Text>

                    </View>

                    <View >
                        <Text numberOfLines={1} style={[styles.html,{width:200}]}>{this.props.description}
                        </Text>
                    </View>

                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    html:{
        fontSize:13,
    },
    list:{
        height:70,
        borderBottomWidth:.3,
        borderBottomColor:'#868686',
         marginLeft:20,
         marginRight:20,
        // paddingLeft:0
    },
    userIcon: {
        width: 44,
        height: 44,
        borderRadius: 12.5,
        alignSelf:'center'
    },
    userIconRightSpace: {
        marginRight: 20
    },
    row: {
        flexDirection: 'row',
        // alignItems:'center'
        // alignItems:'center'

    }
});

export {MessageList}