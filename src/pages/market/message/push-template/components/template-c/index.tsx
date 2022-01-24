import { Space, Table, Tag, Form, Row, Col, Button, Checkbox, message } from 'antd'
import React, { useEffect, useState } from 'react'
import AEVersionDialog, { DialogMode, DialogType } from './components/AEVersionDialog'
import { MessageService } from '@/service/MessageService'
import { HttpCode } from '@/constants/HttpCode'

/**
 * 系统中心-版本管理-C端消息模版
 */

const TemplateCPage: React.FC = () => {
  const [data, setData] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('get')
  const [dialogType, setDialogType] = useState<DialogType>('0')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    MessageService.templateList({ pushApp: 2 }).then((res) => {
      setData(res.data)
    })
  }

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '消息类型',
      dataIndex: 'messageType',
      render: (text: any, record: any) => {
        if (record?.messageType == '10') {
          return `订单创建时`
        } else if (record?.messageType == '11') {
          return `订单付款后`
        } else if (record?.messageType == '12') {
          return `订单完成`
        } else if (record?.messageType == '13') {
          return `订单退款成功`
        } else if (record?.messageType == '14') {
          return `订单退款失败`
        } else if (record?.messageType == '15') {
          return `提现审核成功`
        } else if (record?.messageType == '16') {
          return `提现审核失败 `
        } else if (record?.messageType == '17') {
          return `发团通知`
        } else if (record?.messageType == '18') {
          return `修改出发时间 `
        } else if (record?.messageType == '19') {
          return `行程结束`
        } else if (record?.messageType == '110') {
          return `进团`
        } else if (record?.messageType == '111') {
          return `出团`
        }
      },
    },
    {
      title: '站内消息',
      dataIndex: 'isPushMail',
      render: (text: any, record: any) => {
        return (
          <Space>
            <Checkbox
              onChange={(e) => _checkedMail(record, e)}
              defaultChecked={record.isPushMail == '1' ? true : false}
            >
              是否发送
            </Checkbox>
            <Button onClick={() => _editDialogMail(record)}>编辑内容</Button>
            <Button onClick={() => _getDialogMail(record)}>查看内容</Button>
          </Space>
        )
      },
    },
    {
      title: '手机短信',
      dataIndex: 'isPushShortMsg',
      render: (text: any, record: any) => {
        return (
          <Space>
            <Checkbox
              onChange={(e) => _checkedMsg(record, e)}
              defaultChecked={record.isPushShortMsg == '1' ? true : false}
            >
              是否发送
            </Checkbox>
            <Button onClick={() => _editDialogMsg(record)}>编辑内容</Button>
            <Button onClick={() => _getDialogMsg(record)}>查看内容</Button>
          </Space>
        )
      },
    },
    {
      title: 'APP消息推送',
      dataIndex: 'isPushApp',
      render: (text: any, record: any) => {
        return (
          <Space>
            <Checkbox defaultChecked={record.isPushApp == '1' ? true : false} onChange={(e) => _checkedApp(record, e)}>
              是否发送
            </Checkbox>
            <Button onClick={() => _editDialogApp(record)}>编辑内容</Button>
            <Button onClick={() => _getDialogApp(record)}>查看内容</Button>
          </Space>
        )
      },
    },
  ]

  const _checkedApp = (record, e) => {
    MessageService.templateOn({
      messageType: record.messageType,
      pushApp: 2,
      isPushApp: e.target.checked == true ? '1' : '0',
    }).then((res) => {
      if (res.code === HttpCode.success) {
        message.success('修改成功')
        loadData()
      }
    })
  }
  const _checkedMsg = (record, e) => {
    MessageService.templateOn({
      messageType: record.messageType,
      pushApp: 2,
      isPushShortMsg: e.target.checked == true ? '1' : '0',
    }).then((res) => {
      if (res.code === HttpCode.success) {
        message.success('修改成功')
        loadData()
      }
    })
  }
  const _checkedMail = (record, e) => {
    MessageService.templateOn({
      messageType: record.messageType,
      pushApp: 2,
      isPushMail: e.target.checked == true ? '1' : '0',
    }).then((res) => {
      if (res.code === HttpCode.success) {
        message.success('修改成功')
        loadData()
      }
    })
  }

  /**编辑App */
  const _editDialogApp = (record) => {
    setDialogMode('edit')
    setDialogType('2')
    setSelectedData(record)
    setShowDialog(true)
    console.log(record, 'rrr')
  }
  /**编辑短信 */
  const _editDialogMsg = (record) => {
    setDialogMode('edit')
    setDialogType('1')
    setSelectedData(record)
    setShowDialog(true)
  }
  /**编辑站内信 */
  const _editDialogMail = (record) => {
    setDialogMode('edit')
    setDialogType('0')
    setSelectedData(record)
    setShowDialog(true)
  }

  /**查看站内信 */
  const _getDialogMail = (record) => {
    setDialogMode('get')
    setDialogType('0')
    setSelectedData(record)
    setShowDialog(true)
  }

  /**查看短信 */
  const _getDialogMsg = (record) => {
    setDialogMode('get')
    setDialogType('1')
    setSelectedData(record)
    setShowDialog(true)
  }

  /**查看app */
  const _getDialogApp = (record) => {
    setDialogMode('get')
    setDialogType('2')
    setSelectedData(record)
    setShowDialog(true)
  }

  const _onDialogSuccess = () => {
    setSelectedData(null)
    setShowDialog(false)
  }

  const _onDialogClose = () => {
    setSelectedData(null)
    setShowDialog(false)
  }
  return (
    <div className="page-root">
      <Table rowKey="id" columns={columns} scroll={{ x: 'max-content' }} dataSource={[...data]} />
      {showDialog && (
        <AEVersionDialog
          data={selectedData}
          mode={dialogMode}
          type={dialogType}
          onSuccess={_onDialogSuccess}
          show={showDialog}
          onClose={_onDialogClose}
        />
      )}
    </div>
  )
}

export default TemplateCPage
