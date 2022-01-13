import { ActivitiesService } from '@/service/ActivitiesService'
import { Form, Input, Modal, Select, DatePicker, Button, Row, Col, Radio, message } from 'antd'
import React, { FC, useEffect, useState } from 'react'
// import dayjsFormat from 'dayjsFormat'
import { dayjsFormat } from '@/utils/dayFormate'
import UploadImage from '@/components/formItem/UploadImage'
import ActivityGoodsTable from './ActivityGoodsTable'
import ActivityDetailTable from './ActivityDetailTable'
import { specialState } from '@/utils/enum'
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
  const [goodsShowDialog, setGoodsShowDialog] = useState(false)
  const [goodsRoleList, setGoodsRoleList] = useState<Array<any>>([])

  useEffect(() => {
    if (show) {
      console.log(data,'data')
      form.setFieldsValue({
        id: data?.id,
        activityTitle: data?.activityTitle,
        activityImg: data?.activityImg,
        activitySubtitle: data?.activitySubtitle,
        activityUrl: data?.activityUrl,
        activityDetailImg: data?.activityDetailImg,
        state: String(data?.state),
        activityDate: !!data?.startDate
          ? [dayjsFormat(data?.startDate, 'YYYY-MM-DD HH:mm:ss'), dayjsFormat(data?.endDate, 'YYYY-MM-DD HH:mm:ss')]
          : null,
        activityGoodsIdList: (data?.goodsIdList ?? '').split(',') ?? [],
      })
      setGoodsRoleList((data?.goodsIdList ?? '').split(',') ?? [])
    }
  }, [show])

  /**提交数据 */
  const _handleUpdate = async () => {
    form
      .validateFields()
      .then((formData) => {
        console.log(formData)
        const postData = {
          ...formData,
          startDate: formData.activityDate[0].format('YYYY-MM-DD HH:mm:ss'),
          endDate: formData.activityDate[1].format('YYYY-MM-DD HH:mm:ss'),
          goodsIdList: formData.activityGoodsIdList.join(','),
        }
        if (mode === 'add') {
          // create
          delete postData.id
          delete postData.activityDate
          delete postData.activityGoodsIdList
          ActivitiesService.save(postData).then((res) => {
            if (res.code === '200' || res.code == 200) {
              onSuccess()
            }
          })
        } else {
          postData.id = data.id
          delete postData.activityDate
          delete postData.activityGoodsIdList
          ActivitiesService.edit(postData).then((res) => {
            if (res.code === '200' || res.code == 200) {
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

  const editGoods = () => {
    setGoodsShowDialog(true)
  }
  const goodsOnClose = () => {
    setGoodsShowDialog(false)
  }
  const goodsOnSuccess = (e) => {
    // console.log(e, '----')
    form.setFieldsValue({
      activityGoodsIdList: e,
    })
    setGoodsRoleList(e)
    setGoodsShowDialog(false)
  }
  const DetailTableSuccess = (e) => {
    form.setFieldsValue({
      activityGoodsIdList: e,
    })
    setGoodsRoleList(e)
  }
  const onChangePicker = (e)=>{
    if((new Date().getTime())>(new Date(e[1]).getTime())){
      message.info('结束时间不能小于当前时间/开始时间')
    }
  }
  return (
    <>
      <Modal title="专题配置" width={800} visible={show} onOk={_handleUpdate} onCancel={_formClose}>
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
          <Row gutter={[10, 0]}>
            <Col span={18} className="table-from-label">
              <Form.Item label="主题名称" name="activityTitle" rules={[{ required: false, message: '请输入活动标题' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="副标题" name="activitySubtitle" rules={[{ required: false, message: '请输入副标题' }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="活动展示时间"
                name="activityDate"
                rules={[{ required: false, message: '请选择活动展示时间' }]}
              >
                <DatePicker.RangePicker
                onChange={onChangePicker}
                  format="YYYY-MM-DD HH:mm:ss"
                  defaultValue={[
                    dayjsFormat(data?.startDate, 'YYYY-MM-DD HH:mm:ss'),
                    dayjsFormat(data?.endDate, 'YYYY-MM-DD HH:mm:ss'),
                  ]}
                  showTime={{
                    hideDisabledOptions: true,
                  }}
                />
              </Form.Item>
              <Form.Item label="状态" name="state" >
                <Radio.Group>
                  {Object.keys(specialState)
                    .sort()
                    .map((item) => {
                      return (
                        <Radio.Button key={item} value={item}>
                          {specialState[item]}
                        </Radio.Button>
                      )
                    })}
                </Radio.Group>
              </Form.Item>

              <Form.Item label="活动关联商品" name="activityGoodsIdList">
                <Button type="primary" onClick={editGoods}>
                  配置商品
                </Button>
              </Form.Item>
              {goodsRoleList.length > 0 ? (
                <ActivityDetailTable onSuccess={DetailTableSuccess} goodsIdList={goodsRoleList}></ActivityDetailTable>
              ) : (
                ''
              )}
            </Col>
            <Col span={6}>
              <Form.Item
                label="活动图片"
                name="activityImg"
                labelCol={{ span: 24, offset: 1 }}
                rules={[{ required: true, message: '请上传图片' }]}
                // getValueFromEvent={normFile}
              >
                <UploadImage />
              </Form.Item>
              <Form.Item
                label="专题页头图"
                labelCol={{ span: 24, offset: 1 }}
                name="activityDetailImg"
                rules={[{ required: true, message: '请输入专题页头图' }]}
              >
                <UploadImage />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <ActivityGoodsTable
        goodsShow={goodsShowDialog}
        onSuccess={goodsOnSuccess}
        goodsIdList={goodsRoleList}
        // data={goodsData}
        onClose={goodsOnClose}
      ></ActivityGoodsTable>
    </>
  )
}

export default AEActivityDialog
