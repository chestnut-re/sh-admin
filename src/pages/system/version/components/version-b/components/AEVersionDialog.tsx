import React, { FC, useEffect, useState } from 'react'
import { Form, Input, Modal, Select, Radio } from 'antd'
import { HttpCode } from '@/constants/HttpCode'
import { VersionService } from '@/service/VersionService'

/**
 * 添加版本弹框
 */

export type DialogMode = 'add' | 'edit'
interface Props {
  data: any
  mode: DialogMode
  show: boolean
  /**内容修改成功回调，页面需要刷新数据 */
  onSuccess: () => void
  onClose: () => void
}
const AEVersionDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [title, setTitle] = useState('添加版本记录')
  const [versionData, setVersionData] = useState<any>({})
  useEffect(() => {
    if (data?.id) {
      getVersion()
    }
    if (mode == 'add') {
      setTitle('添加版本记录')
    } else {
      setTitle('修改版本记录')
    }
  }, [show])

  useEffect(() => {
    form.setFieldsValue({
      clientVersionNo: versionData?.clientVersionNo,
      minorVersionNo: versionData?.minorVersionNo,
      clientType: versionData?.clientType,
      fileUrl: versionData?.fileUrl,
      versionContent: versionData?.versionContent,
      remark: versionData?.remark,
      mandatoryUpdate: versionData?.mandatoryUpdate,
    })
  }, [versionData])

  const getVersion = () => {
    VersionService.details({ id: data?.id }).then((res) => {
      setVersionData(res.data)
    })
  }
  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        if (mode === 'add') {
          // create
          VersionService.add({ ...formData, platform: 1 }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
        } else {
          //edit
          VersionService.add({ ...formData, platform: 1, id: data.id }).then((res) => {
            if (res.code === HttpCode.success) {
              onSuccess()
            }
          })
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
    <Modal title={title} visible={show} onOk={_handleUpdate} onCancel={_formClose}>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ clientType: 1 }}
        onFinish={(values: any) => {}}
        onFinishFailed={(errorInfo: any) => {}}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="版本号" name="clientVersionNo">
          <Input placeholder="(必填)" />
        </Form.Item>
        <Form.Item label="版本Code" name="minorVersionNo">
          <Input />
        </Form.Item>
        <Form.Item label="客户端类型" name="clientType">
          <Select>
            <Select.Option value={1}>H5</Select.Option>
            <Select.Option value={2}>小程序</Select.Option>
            <Select.Option value={3}>ios手机</Select.Option>
            <Select.Option value={4}>ios_pad</Select.Option>
            <Select.Option value={5}>安卓手机</Select.Option>
            <Select.Option value={6}>安卓pad</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="下载链接" name="fileUrl">
          <Input />
        </Form.Item>
        <Form.Item label="更新内容" name="versionContent">
          <Input placeholder="(必填)" />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input />
        </Form.Item>
        <Form.Item label="是否强制更新" name="mandatoryUpdate">
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEVersionDialog
