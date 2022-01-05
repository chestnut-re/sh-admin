import { InputTemp } from '@/components/filter/formItem'
import TimeColumn from '@/components/tableColumn/TimeColumn'
import TravelModeColumn from '@/components/tableColumn/TravelModeColumn'
import { Button, Col, Form, Modal, Row, Space, Table } from 'antd'
import React, { FC, useEffect, useState } from 'react'

interface Props {
  id: string
  goodsName: string
  show: boolean
  /**内容修改成功回调，页面需要刷新数据 */
  onSuccess: () => void
  onClose: () => void
}

/**
 * 上架商品的渠道列表
 */
const ChannelDialog: FC<Props> = ({ id, goodsName, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState()

  useEffect(() => {
    loadData(pageIndex)
  }, [pageIndex, show])

  const loadData = (pageIndex) => {
    const params = form.getFieldsValue()
    // ProductionListService.list({ current: pageIndex, size: pageSize, ...params }).then((res) => {
    //   setData(res.data.records)
    //   setTotal(res.data.total)
    // })
  }

  const columns = [
    {
      title: '渠道ID',
      dataIndex: 'id',
    },
    {
      title: '渠道名称',
      dataIndex: 'goodsName',
      width: 150,
    },
    {
      title: '责任人',
      dataIndex: 'goodsTypeTag',
      width: 100,
    },
    {
      title: '责任人手机号',
      width: 100,
      dataIndex: 'goodsTypeTag',
    },
    {
      title: '责任区域',
      dataIndex: 'departureCity',
    },
    {
      title: '累计销量',
      dataIndex: 'stock',
    },
    {
      title: '渠道上架时间',
      render: (text, record, index) => <TimeColumn time={record?.startDate} />,
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            onClick={() => {
              // ProductionService.ban(record.id).then((res) => {
              //   if (res.code === '200') {
              //     loadData(pageIndex)
              //   }
              // })
            }}
          >
            下架
          </Button>
        </Space>
      ),
    },
  ]

  /**分页 */
  const onPaginationChange = (page: number, pageSize: number) => {
    setPageIndex(page)
    setPageSize(pageSize)
  }

  /**筛选 */
  const onFinish = () => {
    setPageIndex(1)
    loadData(1)
  }

  /**重置 */
  const resetTable = () => {
    form.resetFields()
    setPageIndex(1)
    loadData(1)
  }

  /**提交数据 */
  const _formClose = () => {
    onClose()
  }

  return (
    <Modal title={`已上架 ${goodsName} 的渠道`} visible={show} onCancel={_formClose} width="80%" footer={[]}>
      <div>
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} form={form}>
          <Row gutter={[10, 0]}>
            <Col span={1} className="table-from-label"></Col>
            <Col span={5}>
              <InputTemp name="planName" placeholder="请输入方案名称" />
            </Col>

            <Form.Item wrapperCol={{ offset: 2, span: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button type="primary" onClick={resetTable}>
                  重置
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
          onChange: onPaginationChange,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: pageSize,
          total: total,
        }}
      />
    </Modal>
  )
}

export default ChannelDialog
