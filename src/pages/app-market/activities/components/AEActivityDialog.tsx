import { ActivitiesService } from '@/service/ActivitiesService'
import { Form, Input, Modal, Select, DatePicker } from 'antd'
import React, { FC, useEffect, useState } from 'react'
export type DialogMode = 'add' | 'edit'
interface Props {
  data: any
  mode: DialogMode
  show: boolean
  /**内容修改成功回调，页面需要刷新数据 */
  onSuccess: () => void
  onClose: () => void
}

const { Option } = Select

/**
 * 添加&编辑
 */
const AEActivityDialog: FC<Props> = ({ data, mode, show = false, onSuccess, onClose }) => {
  const [form] = Form.useForm()
  const [selectedRoles, setSelectedRoles] = useState<Array<any>>([])
  const [roles, setRoles] = useState<Array<any>>([])

  useEffect(() => {
    setSelectedRoles(data?.roles ?? [])
  }, [data])

  useEffect(() => {
    setRoles([
      {
        id: 1,
        name: '商品',
      },
      {
        id: 2,
        name: '商品2',
      },
    ])
  }, [])

  useEffect(() => {
    form.setFieldsValue({
      id: data?.id,
      activityTitle: data?.activityTitle,
      activityImg: data?.activityImg,
      activitySubtitle: data?.activitySubtitle,
      activityUrl: data?.activityUrl,
      activityPreviewImg: data?.activityPreviewImg,
      // activityDate: !data?.startDate?[moment(data?.startDate??'2020-01-01', dateFormat), moment(data?.endDate??'2022-01-01', dateFormat)]:undefined,
      activityGoodsIdList: [],
    })
  },[show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        const postData = {
          ...formData,
          startDate: formData.activityDate[0].format('YYYY-MM-DD'),
          endDate: formData.activityDate[1].format('YYYY-MM-DD'),
          goodsIdList: formData.activityGoodsIdList.join(','),
        }
        if (mode === 'add') {
          // create
          delete postData.id
          delete postData.activityDate
          delete postData.activityGoodsIdList
          ActivitiesService.save(postData).then((res) => {
            if (res.code === 200) {
              onSuccess()
            }
          })
        } else {
          const postData = {
            ...formData,
            id: data?.id,
          }
          console.log('postData', postData)
          // editUser(postData).then((res) => {
          //   if (res.code === 200) {
          //     onSuccess()
          //   }
          // })
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

  const handleChange = (value) => {
    console.log(value)
    setSelectedRoles(value)
  }

  return (
    <Modal title="用户" visible={show} onOk={_handleUpdate} onCancel={_formClose}>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={(values: any) => {
          console.log(values, '-----')
        }}
        onFinishFailed={(errorInfo: any) => {
          console.log(errorInfo)
        }}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="活动图片" name="activityImg" rules={[{ required: false, message: '请上传活动图片' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="标题" name="activityTitle" rules={[{ required: false, message: '请输入活动标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="副标题" name="activitySubtitle" rules={[{ required: false, message: '请输入副标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="活动跳转地址" name="activityUrl" rules={[{ required: false, message: '请输入活动跳转地址' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="专题页头图"
          name="activityPreviewImg"
          rules={[{ required: false, message: '请输入专题页头图' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="活动展示时间"
          name="activityDate"
          rules={[{ required: false, message: '请选择活动展示时间' }]}
        >
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item label="活动关联商品" name="activityGoodsIdList">
          <Select mode="multiple" allowClear placeholder="活动关联商品" value={selectedRoles} onChange={handleChange}>
            {roles.map((i) => {
              return (
                <Option key={i.id} value={i.id}>
                  {i.name}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AEActivityDialog
