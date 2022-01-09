import React, { useState, useEffect } from 'react'
import { Layout,Menu,Button,Input,Form,message } from 'antd'
const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input;
import {
  UserOutlined,
} from '@ant-design/icons';
import WebIM from '@/utils/webIm/WebIM'


import './index.less'

/*
 * 客服聊天
 */
const ContactsChat: React.FC = () => {
  const [form] = Form.useForm()
  const [PrivateText,setPrivateText] = useState("")
  const [rosterList,setRosterList] = useState([])
  const [selectMenuKey,setSelectMenuKey] = useState("")
  const [textValue,setTextValue] = useState("")
  useEffect(()=>{
   
    WebIM.conn.listen({
      onOpened: function () {
        message.success('IM登录成功');
          console.log('obje登录成功ct :>> ',);
          getRosterHandel()
      },                  //连接成功回调 
      onClosed: function () {},                  //连接关闭回调
      onTextMessage: function ( message ) {
        console.log('object收到文本消息 :>> ', message);
      },    //收到文本消息
      onEmojiMessage: function ( message ) {},   //收到表情消息
      onPictureMessage: function ( message ) {}, //收到图片消息
      onCmdMessage: function ( message ) {},     //收到命令消息
      onAudioMessage: function ( message ) {},   //收到音频消息
      onLocationMessage: function ( message ) {},//收到位置消息
      onFileMessage: function ( message ) {},    //收到文件消息
      onCustomMessage: function ( message ) {},  //收到自定义消息

      onPresence: function ( message ) {},       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
      onRoster: function ( message ) {},         //处理好友申请
      onInviteMessage: function ( message ) {},  //处理群组邀请
      onOnline: function () {},                  //本机网络连接成功
      onOffline: function () {},                 //本机网络掉线
      onError: function ( message ) {},          //失败回调
      onBlacklistUpdate: function (list) {       //黑名单变动
          // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
          console.log(list);
      },
      onRecallMessage: function(message){},      //收到撤回消息回调
      onReceivedMessage: function(message){},    //收到消息送达服务器回执
      onDeliveredMessage: function(message){},   //收到消息送达客户端回执
      onReadMessage: function(message){},        //收到消息已读回执
      onCreateGroup: function(message){},        //创建群组成功回执（需调用createGroupNew）
      onMutedMessage: function(message){},       //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
      onChannelMessage: function(message){}      //收到整个会话已读的回执，在对方发送channel ack时会在这个回调里收到消息
  });
  LoginIM()
  },[])
  const LoginIM = () => {
        const options = {
          user:"a1468455884505202688",
          pwd:"a1468455884505202688",
          appKey:WebIM.config.appKey,
          
        };
        WebIM.conn.open(options);
  }

 const RegisterUserIM = () => {
    const options = { 
      username: 'hugangyun',
      password: 'hugangyun',
      nickname: 'Hu',
      appKey: WebIM.config.appkey,
      success: function () { },  
      error: function (err) {
          const errorData = JSON.parse(err.data);
          if (errorData.error === 'duplicate_unique_property_exists') {
              console.log('用户已存在！');
          } else if (errorData.error === 'illegal_argument') {
              if (errorData.error_description === 'USERNAME_TOO_LONG') {
                  console.log('用户名超过64个字节！')
              }else{
                  console.log('用户名不合法！')
              }
          } else if (errorData.error === 'unauthorized') {
              console.log('注册失败，无权限！')
          } else if (errorData.error === 'resource_limited') {
              console.log('您的App用户注册数量已达上限,请升级至企业版！')
          }
      }, 
    }; 
    WebIM.conn.registerUser(options);
  }
  const sendPrivateText = () => {
    // return
    const id = WebIM.conn.getUniqueId();                 // 生成本地消息id
    const msg = new WebIM.message('txt', id);      // 创建文本消息
    msg.set({
        msg: textValue,                  // 消息内容
        to: selectMenuKey,        // 接收消息对象（用户id）
        chatType: 'singleChat',                  // 设置为单聊
        ext: {
          time: new Date(),
        },                                  //扩展消息
        success: function (id, serverMsgId) {
            console.log('send private text Success');  
        }, 
        fail: function(e){
            // 失败原因:
            // e.type === '603' 被禁言
            // e.type === '605' 群组不存在
            // e.type === '602' 不在群组或聊天室中
            // e.type === '504' 撤回消息时超出撤回时间
            // e.type === '505' 未开通消息撤回
            // e.type === '506' 没有在群组或聊天室白名单
            // e.type === '501' 消息包含敏感词
            // e.type === '502' 被设置的自定义拦截捕获
            // e.type === '503' 未知错误
            console.log("Send private text error");  
        }
    });
    WebIM.conn.send(msg.body);
  }

  const getRosterHandel = () => {
    WebIM.conn.getRoster().then( (res) => {
      const {data} = res;
      setRosterList(data)
      console.log("获取好友列表",res) // res.data > ['user1', 'user2']
    });
  }

  const setUsernameHandel = (e)=>{
    const {value} = e.target.value
    setUsername(value)
    console.log('e :>> ', e);
  }
  const setpasswordHandel = (e)=>{
    const {value} = e.target.value
    setPassword(value)
    console.log('e :>> ', e);
  }
  const setPrivateTextHandel = (e)=>{
    const {value} = e.target.value
    setPrivateText(value)
    console.log('e :>> ', e);
  }
  const onChange = e => {
    const {value} = e.target;
    setTextValue(value)
  };

  const onSelectMenu = ({ key }) => {
    console.log('item :>> ', key);
    setSelectMenuKey(key)
      }
  
  return (
    <div className="Contactschat__root">
        <Layout>
          <Sider className='contactschat-sider'>
          <Menu theme="dark" mode="inline" onSelect={onSelectMenu} defaultSelectedKeys={['1']}>
            {rosterList.map(item=>{
              return (<Menu.Item key={item} icon={<UserOutlined />}>
              {item}
            </Menu.Item>)
            })}
           
          </Menu>
          </Sider>
          <Layout>
            <Content className='contactschat-content'>
              <div className='contactschat-content-top'>

              </div>
              <div className='contactschat-content-bottom'>
                    <TextArea rows={6} onChange={onChange} onPressEnter={sendPrivateText} />
              </div>
            </Content>
          </Layout>
        </Layout>
    </div>
  )
}

export default ContactsChat
