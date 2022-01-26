import React, { useState, useEffect } from 'react'
import { Layout,Menu,Button,Input,Form,message } from 'antd'
const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input;
import { useStore } from '@/store/context'
import {
  UserOutlined,
} from '@ant-design/icons';
import WebIM from '@/utils/webIm/WebIM'


import './index.less'

/*
 * 客服聊天
 */
const ContactsChat: React.FC = () => {
  const { adminStore } = useStore()
  const [chartUrl,setChartUrl] = useState<string>()
  useEffect(()=>{
      console.log('adminStore :>> ', adminStore.userDetails);
      const {userId} = adminStore.userDetails;
      const packUrl = `https://im.mountainseas.cn/#/login?_u=a${userId}&_p=a${userId}`
      setChartUrl(packUrl)

  },[])


  
  return (
    <div className="Contactschat__root">
        <Layout>
            {chartUrl?<iframe className='chat-box' src={chartUrl} frameBorder="0"></iframe>:null}
        </Layout>
    </div>
  )
}

export default ContactsChat
