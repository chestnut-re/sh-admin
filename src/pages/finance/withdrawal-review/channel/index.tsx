import { Space, Table, Tag, Form, Row, Col, Button, DatePicker, Input, Image, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import ChannelService from '@/service/ChannelService'
import dayjs from 'dayjs'
import { HttpCode } from '@/constants/HttpCode'
import { WithdrawalReviewService } from '@/service/FinanceAccountService'
import AEBannerDialog, { DialogMode } from './components/AEBannerDialog'
import { useHistory } from 'react-router-dom'
/**
 * 渠道提现
 */

const ChannelPage: React.FC = () => {
  const [form] = Form.useForm()
  const history = useHistory<any>()
  const { RangePicker } = DatePicker
  const { Option } = Select
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [channelData, setChannelData] = useState([])
  const [total, setTotal] = useState()

  const [showDialog, setShowDialog] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>('edit')

  useEffect(() => {
    loadData(pageIndex)
    getChannel()
  }, [pageIndex])

  const loadData = (pageIndex) => {
    form.validateFields().then((query) => {
      const beginTime = query.time ? dayjs(query.time[0]).format('YYYY-MM-DD HH:mm:ss') : ''
      const endTime = query.time ? dayjs(query.time[1]).format('YYYY-MM-DD HH:mm:ss') : ''
      WithdrawalReviewService.channelList({
        current: pageIndex,
        size: pageSize,
        channelId: query.channelId,
        sts: query.sts,
        name: query.name,
        startDate: beginTime,
        endDate: endTime,
      }).then((res) => {
        // if (res.code === HttpCode.success) {
        setData(res.records)
        setTotal(res.total)
        // }
      })
    })
  }

  const _export = () => {
    console.log(111)
    form.validateFields().then((query) => {
      const beginTime = query.time ? dayjs(query.time[0]).format('YYYY-MM-DD HH:mm:ss') : ''
      const endTime = query.time ? dayjs(query.time[1]).format('YYYY-MM-DD HH:mm:ss') : ''
      WithdrawalReviewService.channelExport({
        sts: query.sts,
        startDate: beginTime,
        endDate: endTime,
      }).then((res) => {
        download(res, 'application/octet-stream', 'filename.xls')
        // const content = res.data // 文件流
        // const blob = new Blob([content], { type: 'application/octet-stream' })
        // const fileName = 'filename.xls'
        // // 如果后端返回文件名
        // // const contentDisposition = res.headers['content-disposition']
        // // const fileName = decodeURI(contentDisposition.split('=')[1])
        // if ('download' in document.createElement('a')) {
        //   // 非IE下载
        //   const link = document.createElement('a')
        //   link.download = fileName
        //   link.style.display = 'none'
        //   link.href = URL.createObjectURL(blob)
        //   document.body.appendChild(link)
        //   link.click()
        //   URL.revokeObjectURL(link.href) // 释放URL 对象
        //   document.body.removeChild(link)
        // } else {
        //   // IE10+下载
        //   navigator.msSaveBlob(blob, fileName)
        // }
      })
    })
  }

  const download = (res, type, filename) => {
    // 创建blob对象，解析流数据
    const blob = new Blob([res], {
      // 如果后端没返回下载文件类型，则需要手动设置：type: 'application/pdf;chartset=UTF-8' 表示下载文档为pdf，如果是word则设置为'application/msword'，zip为 'application/zip'
      type: type,
    })
    const a = document.createElement('a')
    // 兼容webkix浏览器，处理webkit浏览器中href自动添加blob前缀，默认在浏览器打开而不是下载
    const URL = window.URL || window.webkitURL
    // 根据解析后的blob对象创建URL 对象
    const herf = URL.createObjectURL(blob)
    // 下载链接
    a.href = herf
    // 下载文件名,如果后端没有返回，可以自己写a.download = '文件.pdf'
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    // 在内存中移除URL 对象
    window.URL.revokeObjectURL(herf)
  }

  const getChannel = () => {
    ChannelService.list({ pages: 1, size: 10 }).then((res) => {
      if (res.code === HttpCode.success) {
        setChannelData(res.data?.records ?? [])
      }
    })
  }

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '所属渠道',
      dataIndex: 'channelNm',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '提现金额',
      dataIndex: 'amount',
    },
    {
      title: '申请时间',
      dataIndex: 'applicationTime',
    },
    {
      title: '审核时间',
      dataIndex: 'handleTime',
    },
    {
      title: '提现状态',
      dataIndex: 'sts',
      render: (text: any, record: any) => {
        if (record?.sts == 1) {
          return `待审核`
        } else if (record?.sts == 2) {
          return `已通过`
        } else if (record?.sts == 3) {
          return `已驳回`
        }
      },
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => toDetails(record)}>详情</Button>
          {record?.sts == 1 ? <Button onClick={() => _editDialog(record)}>审核</Button> : null}
        </Space>
      ),
    },
  ]

  /**详情 */
  const toDetails = (record) => {
    history.push('/finance/withdrawal-review/details', {
      record: record,
    })
  }

  /**编辑 */
  const _editDialog = (record) => {
    setDialogMode('edit')
    setSelectedData(record)
    setShowDialog(true)
  }

  const onFinish = (values: any) => {
    loadData(pageIndex)
    console.log(values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const _onDialogSuccess = () => {
    setSelectedData(null)
    setShowDialog(false)
    loadData(pageIndex)
  }

  const _onDialogClose = () => {
    setSelectedData(null)
    setShowDialog(false)
  }
  return (
    <div className="page-root">
      <div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row gutter={[10, 0]}>
            <Col span={4}>
              <Form.Item name="name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} className="table-from-label">
              状态
            </Col>
            <Col span={2}>
              <Form.Item name="sts">
                <Select>
                  <Option value={1}>待审核</Option>
                  <Option value={2}>已通过</Option>
                  <Option value={3}>已驳回</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={2} className="table-from-label">
              渠道
            </Col>
            <Col span={4}>
              <Form.Item name="channelId">
                <Select style={{ width: 120 }}>
                  {channelData?.map((item: any) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="time">
                <RangePicker showTime />
              </Form.Item>
            </Col>
            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button htmlType="button" onClick={_export}>
                  导出
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        scroll={{ x: 'max-content' }}
        dataSource={[...data]}
        pagination={{
          onChange: setPageIndex,
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />
      <AEBannerDialog
        data={selectedData}
        mode={dialogMode}
        onSuccess={_onDialogSuccess}
        show={showDialog}
        onClose={_onDialogClose}
      />
    </div>
  )
}

export default ChannelPage
