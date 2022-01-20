import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table, Space } from 'antd'
import './index.less'
import { HttpCode } from '@/constants/HttpCode'
import AEDialog from './components/AEDialog'
import { InputTemp, StatusRoute } from '@/components/filter/formItem'
import { ProductionCommission } from '@/service/ProductionCommission'
import TimeColumn from '@/components/tableColumn/TimeColumn'
import { useSetState } from 'ahooks'
import { DialogState, TableState } from '@/types/commonState'

/**
 * 商品分佣方案
 */
const ProductionCommissionListPage: React.FC = () => {
  const [form] = Form.useForm()
  const [tableState, setTableState] = useSetState<TableState>({
    pageIndex: 1,
    pageSize: 10,
    total: 0,
    data: [],
  })

  const [dialogState, setDialogState] = useSetState<DialogState>({
    showDialog: false,
    selectedData: null,
    dialogMode: 'add',
  })

  useEffect(() => {
    loadData(tableState.pageIndex)
  }, [tableState.pageIndex])

  const loadData = (pageIndex) => {
    const params = form.getFieldsValue()
    ProductionCommission.list({ current: pageIndex, size: tableState.pageSize, ...params }).then((res) => {
      setTableState({
        data: res.data.records,
        total: res.data.total,
      })
    })
  }

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },

    {
      title: '方案名称',
      dataIndex: 'planName',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text: any, record: any) => {
        if (record.state == 0) {
          return `未使用`
        } else if (record.state == 1) {
          return `使用中`
        }
      },
    },
    {
      title: '现关联商品量',
      dataIndex: 'goodsNumber',
    },
    {
      title: '关联分中心',
      dataIndex: 'centerNumber',
    },
    {
      title: '创建时间',
      dataIndex: 'updateTime',
      render: (text, record, index) => <TimeColumn time={record?.updateTime} />,
    },
    {
      title: '操作',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => _editDialog(record)}>查看详情</Button>
          {/* <Button onClick={() => _delItem(record)}>删除</Button> */}
        </Space>
      ),
    },
  ]

  /**删除 */
  const _delItem = (record) => {
    ProductionCommission.del({ id: record.id }).then((res) => {
      if (res.code === HttpCode.success) {
        loadData(tableState.pageIndex)
      }
    })
  }

  /**编辑 */
  const _editDialog = (record) => {
    setDialogState({
      dialogMode: 'edit',
      selectedData: record,
      showDialog: true,
    })
  }

  /**添加 */
  const showAdd = () => {
    setDialogState({
      selectedData: null,
      dialogMode: 'add',
      showDialog: true,
    })
  }

  /**筛选 */
  const onFinish = () => {
    setTableState({ pageIndex: 1 })
    loadData(1)
  }

  /**重置 */
  const resetTable = () => {
    form.resetFields()
    setTableState({ pageIndex: 1 })
    loadData(1)
  }

  const _onDialogSuccess = () => {
    setDialogState({
      selectedData: null,
      showDialog: false,
    })
    loadData(tableState.pageIndex)
  }

  const _onDialogClose = () => {
    setDialogState({
      selectedData: null,
      showDialog: false,
    })
  }

  const onPaginationChange = (page: number, pageSize: number) => {
    setTableState({
      pageSize: pageSize,
      pageIndex: page,
    })
  }

  return (
    <div className="ProductionCommissionListPage__root">
      <div>
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} form={form}>
          <Row gutter={[10, 0]}>
            <Col span={1} className="table-from-label"></Col>
            <Col span={5}>
              <InputTemp name="planName" placeholder="请输入方案名称" />
            </Col>

            <Col span={1} className="table-from-label">
              状态
            </Col>
            <Col span={3}>
              <StatusRoute name="state" />
            </Col>

            <Form.Item wrapperCol={{ offset: 1, span: 12 }}>
              <Space>
                <Button type="primary" onClick={showAdd}>
                  添加
                </Button>
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
        dataSource={tableState.data}
        pagination={{
          onChange: onPaginationChange,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: tableState.pageSize,
          total: tableState.total,
        }}
      />
      <AEDialog
        data={dialogState.selectedData}
        mode={dialogState.dialogMode}
        onSuccess={_onDialogSuccess}
        show={dialogState.showDialog}
        onClose={_onDialogClose}
      />
    </div>
  )
}

export default ProductionCommissionListPage
