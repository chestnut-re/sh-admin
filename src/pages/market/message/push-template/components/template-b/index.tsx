import { Space, Table, Tag, Form, Row, Col, Button, Checkbox, message } from 'antd'
import React, { useEffect, useState } from 'react'
import AEVersionDialog, { DialogMode, DialogType } from './components/AEVersionDialog'
import { MessageService } from '@/service/MessageService'
import { HttpCode } from '@/constants/HttpCode'

/**
 * 系统中心-版本管理-B端消息模版
 */

const TemplateBPage: React.FC = () => {
  const [data, setData] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('get')
  const [dialogType, setDialogType] = useState<DialogType>('0')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    MessageService.templateList({ pushApp: 1 }).then((res) => {
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
        if (record?.messageType == '20') {
          return `订单创建成功`
        } else if (record?.messageType == '21') {
          return `订单付款成功`
        } else if (record?.messageType == '22') {
          return `订单核销确认后`
        } else if (record?.messageType == '23') {
          return `订单退款发起`
        } else if (record?.messageType == '24') {
          return `退款审核通过`
        } else if (record?.messageType == '25') {
          return `退款审核拒绝`
        } else if (record?.messageType == '26') {
          return `提现审核通过`
        } else if (record?.messageType == '27') {
          return `提现审核拒绝`
        } else if (record?.messageType == '28') {
          return `建团通知`
        } else if (record?.messageType == '29') {
          return `发团通知`
        } else if (record?.messageType == '210') {
          return `修改出发时间`
        } else if (record?.messageType == '211') {
          return `行程结束`
        } else if (record?.messageType == '212') {
          return `驳回申请联系权限通知`
        } else if (record?.messageType == '213') {
          return `通过申请联系权限通知`
        } else if (record?.messageType == '214') {
          return `待处理联系权限提醒`
        } else if (record?.messageType == '215') {
          return `区域库下架/禁用某商品`
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
      pushApp: 1,
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
      pushApp: 1,
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
      pushApp: 1,
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

export default TemplateBPage
