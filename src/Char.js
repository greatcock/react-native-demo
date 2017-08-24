
import { StackNavigator, TabNavigator } from 'react-navigation';



import {HomeScreen} from './HomeScreen'
import {ChatScreen} from './ChatScreen'
import {Message} from './message'

const Chat = TabNavigator({
    home: {
        screen: HomeScreen ,navigationOptions:{
        tabBarLabel: '首页',
    }},
    messageList: {
        screen: ChatScreen ,navigationOptions:{
        tabBarLabel: '消息',}
    }}, {
    tabBarPosition: 'bottom', //导航条位置
    lazy: true, // 是否懒加载
    tabBarOptions:{
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        style: {
            height: 45,
            position: 'relative',
            // backgroundColor: 'red',
        },
        labelStyle: {
            fontSize: 13,
            //  paddingVertical: 0,
            //  marginTop: -4,
            //  backgroundColor: 'red' //字体颜色
        },
        tabStyle: { //tab的样式配置对象
            backgroundColor: 'yellow',
        }
    }
})


export const message = StackNavigator({
    Chat: {
        screen: Chat,
        navigationOptions:{
            headerTitleStyle: {
                alignSelf:'center'
            },
            header: null
          //  gesturesEnabled: true //是否支持滑动返回收拾，iOS默认支持，安卓默认关闭 试过不好使
        }
    },

    Message: {
        screen: Message,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#90FFB4',
                height:50,
                elevation: 0,  //边框阴影去掉
                //justifyContent:'space-around',


            },

        }
    }
},{
    //onTransitionEnd: ()=>{ alert('导航栏切换结束'); }
})
//     ,{
//     style: {
//         backgroundColor: 'rgba(127,180,70,.5)'
//     },
//     titleStyle: {
//         color: 'white'
//     },rr
//     cardStack: {
//         gesturesEnabled: true
//     }
//     // mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
//     // headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
//     //onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
// }
// ,{
//     initialRouteName: 'Home',
//     headerMode: 'screen',
// });


// export default Chat;