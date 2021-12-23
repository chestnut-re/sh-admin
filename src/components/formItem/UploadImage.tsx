import data from '@/pages/channel/channel-management/channel-list/data'
import { FileService } from '@/service/FileService'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, FormInstance, Upload } from 'antd'
import React, { useEffect, useState } from 'react'

interface UploadImageProps {
  // label: string
  // name: string
  // form: FormInstance<any>
  value?: string
  onChange?: (value: string) => void
}

/**
 * FromItem 图片上传
 */
const UploadImage: React.FC<UploadImageProps> = ({ onChange, value }) => {
  const [loading, setLoading] = useState(false)
  const [imgObj, setImgObj] = useState<any>({})

  useEffect(() => {
    setImgObj({ imageUrl: value })
  }, [value])

  const customRequest = (info) => {
    setLoading(true)
    FileService.uploadImg(info.file).then((res) => {
      setLoading(false)
      setImgObj({ ...res.data, imageUrl: `${res.data.ossServerUrl}${res.data.fileUrl}` })
      onChange?.(`${res.data.ossServerUrl}${res.data.fileUrl}`)
    })
  }

  /**上传前图片校验 */
  const beforeUpload = (file) => {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    // if (!isJpgOrPng) {
    //   message.error('You can only upload JPG/PNG file!')
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!')
    // }
    // return isJpgOrPng && isLt2M
    return true
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      customRequest={customRequest}
    >
      {imgObj.imageUrl ? <img src={imgObj.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  )

  // return (
  //   <Form.Item
  //     label={label}
  //     name={name}
  //     rules={[{ required: false, message: '请上传图片' }]}
  //     // getValueFromEvent={normFile}
  //   >
  //     <Upload
  //       name="avatar"
  //       listType="picture-card"
  //       className="avatar-uploader"
  //       showUploadList={false}
  //       beforeUpload={beforeUpload}
  //       customRequest={customRequest}
  //     >
  //       {imgObj.imageUrl ? <img src={imgObj.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
  //     </Upload>
  //   </Form.Item>
  // )
}

export default UploadImage
