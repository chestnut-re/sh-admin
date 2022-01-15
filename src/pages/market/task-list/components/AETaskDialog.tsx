import { taskService } from '@/service/marketService'
import { Form, Input, Modal, Select, DatePicker, Button, Row, Col, Radio, message } from 'antd'
import React, { FC, useEffect, useState } from 'react'
// import dayjsFormat from 'dayjsFormat'
import { dayjsFormat } from '@/utils/dayFormate'
import UploadImage from '@/components/formItem/UploadImage'
import ActivityGoodsTable from '../../rebate-activity/components/GoodsTable'
import ActivityDetailTable from './TaskDetailTable'
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
      form.setFieldsValue({
        mathFlag: 1,
        taskInventoryGood: [],
        name: '',
      })
      setGoodsRoleList([])
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
        }
        if (mode === 'add') {
          postData.taskInventoryGood = formData.taskInventoryGood.map((res) => {
            return {
              activityId: res.activityId,
              activityName: res.activityName,
              goodsId: res.goodsId,
              goodsName: res.goodsName,
              goodsNickName: res.goodsNickName,
              goodsNo: res.goodsNo,
              promotionalImageUrl: res.promotionalImageUrl,
            }
          })
          taskService.add(postData).then((res) => {
            if (res.code === '200' || res.code == 200) {
              message.success('恭喜您，添加成功')
              setTimeout(() => {
                onSuccess()
              }, 1000)
            }
          })
        } else {
          // postData.id = data.id
          // delete postData.activityDate
          // delete postData.taskInventoryGood
          // taskService.edit(postData).then((res) => {
          //   if (res.code === '200' || res.code == 200) {
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

  const editGoods = () => {

    setGoodsShowDialog(true)
    
  }
  const goodsOnClose = () => {
    setGoodsShowDialog(false)
  }
  const goodsOnSuccess = (e, Row) => {
    if(Row&&Row.length>0){
      form.setFieldsValue({
        taskInventoryGood: Row,
      })
  
      setGoodsRoleList(Row)
    }
  
    setGoodsShowDialog(false)
  }
  const DetailTableSuccess = (e) => {
    form.setFieldsValue({
      taskInventoryGood: e,
    })
    console.log(e, 'xxx')
    setGoodsRoleList(e)
  }
  return (
    <>
      <Modal title="任务清单" width={800} visible={show} onOk={_handleUpdate} onCancel={_formClose}>
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
          <Form.Item label="清单名称" name="name" rules={[{ required: true, message: '请输入活动标题' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="活动关联商品" name="taskInventoryGood" rules={[{ required: true, message: '请输入活动标题' }]}>
            <Button type="primary" onClick={editGoods}>
              配置商品
            </Button>
            {goodsRoleList.length > 0 ? (
              <ActivityDetailTable onSuccess={DetailTableSuccess} goodsIdList={goodsRoleList}></ActivityDetailTable>
            ) : (
              ''
            )}
          </Form.Item>

          <Form.Item label="匹配权重" name="mathFlag" rules={[{ required: true, message: '请输入活动标题' }]}>
            <Radio.Group>
              <Radio.Button key={1} value={1}>
                随机匹配
              </Radio.Button>
              <Radio.Button key={2} value={2}>
                关联地域
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <p>
            优先配置关联商品中的商品始发地与用户历史购买商品的始发地/出行人地址/用户常住地/IP地址一致的商品，若无则随机匹配
          </p>
        </Form>
      </Modal>
      <ActivityGoodsTable
        goodsShow={goodsShowDialog}
        onSuccess={goodsOnSuccess}
        goodsIdList={goodsRoleList.map(res=>res.goodsId)}
        // data={goodsData}
        onClose={goodsOnClose}
      ></ActivityGoodsTable>
    </>
  )
}

export default AEActivityDialog
