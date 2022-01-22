import { Form, Input, Modal, Select } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { HttpCode } from '@/constants/HttpCode'
import { AllocationService } from '@/service/AllocationService'

export type DialogMode = 'add' | 'edit'

interface Props {
  data: any
  mode: DialogMode
  show: boolean
  /**内容修改成功回调，页面需要刷新数据 */
  onSuccess: () => void
  onClose: () => void
}

/**
 * 添加&编辑
 */
const AEBannerDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const { Option } = Select
  const [parentList, setParentList] = useState<any>([])
  const [parent, setParent] = useState('0')
  const [addClassName, setAddClassName] = useState('')

  useEffect(() => {
    getParentList()
    form.setFieldsValue({
      sortName: data?.sortName,
    })
  }, [show])

  const getParentList = () => {
    AllocationService.list({ sortName: '', parentId: 0 }).then((res: any) => {
      const parentData = { id: 0, sortName: '无' }
      setParentList([...res.data, parentData])
    })
  }

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        console.log(formData)
        if (mode === 'add') {
          AllocationService.edit([
            { operationType: 1, sortName: formData.sortName, parentId: formData.parentId ?? '0' },
          ]).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
        } else {
          //edit
          AllocationService.edit([{ operationType: 2, sortName: formData.sortName, parentId: formData.parentId }]).then(
            (res) => {
              if (res.code === HttpCode.success) {
                onSuccess()
              }
            }
          )
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const _formClose = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title="商品分类配置"
      visible={show}
      onOk={_handleUpdate}
      onCancel={_formClose}
      okText="确认"
      cancelText="取消"
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="分类名称" name="sortName">
          <Input />
        </Form.Item>
        <Form.Item label="上级分类" name="parentId">
          <Select>
            {parentList?.map((item: any) => {
              return (
                <>
                  <Option value={item.id} key={item.id}>
                    {item.sortName}
                  </Option>
                </>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEBannerDialog
