import { FileService } from '@/service/FileService'
import { DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import React, { useEffect, useState } from 'react'

interface UploadImageProps {
  value?: string
  onChange?: (value: string | undefined) => void
}

/**
 * FromItem 图片上传
 */
const UploadImage: React.FC<UploadImageProps> = ({ onChange, value }) => {
  const [loading, setLoading] = useState(false)
  const [imgObj, setImgObj] = useState<any>({})
  const [fullUrl, setFullUrl] = useState<string>()

  useEffect(() => {
    if (value && !value?.startsWith('https')) {
      FileService.getFileDownloadUrl(value).then((res) => {
        setFullUrl(res.data)
      })
    }
    setImgObj({ imageUrl: value })
  }, [value])

  const customRequest = (info) => {
    setLoading(true)
    FileService.uploadImg(info.file).then((res) => {
      setLoading(false)
      setImgObj({ ...res.data, imageUrl: `${res.data.privateUrl}` })
      onChange?.(`${res.data.fileUrl}`)
      setFullUrl(res.data.privateUrl)
    })
  }

  /**上传前图片校验 */
  const beforeUpload = (file) => {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    // if (!isJpgOrPng) {
    //   message.error('You can only upload JPG/PNG file!')
    // }
    const isLt2M = file.size / 1024 / 1024 < 3
    if (!isLt2M) {
      message.error('图片不能大于3M')
    }
    // return isJpgOrPng && isLt2M
    return isLt2M
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  )

  const delButton = (
    <div
      style={{ width: '30px', height: '30px', position: 'absolute', right: 0, top: 0 }}
      onClick={(e) => {
        console.log('删除')
        e.preventDefault()
        setImgObj({})
        setFullUrl(undefined)
        onChange?.(undefined)
      }}
    >
      <DeleteOutlined style={{ color: 'white', padding: '8px 8px' }} />
    </div>
  )

  let imgUrl
  if (imgObj.imageUrl && imgObj.imageUrl.startsWith('http')) {
    imgUrl = imgObj.imageUrl
  } else {
    imgUrl = fullUrl
  }

  return (
    <>
      {imgUrl ? (
        <div className="ant-upload ant-upload-select ant-upload-select-picture-card" style={{ position: 'relative' }}>
          <img src={imgUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          {delButton}
        </div>
      ) : (
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          style={{}}
          showUploadList={false}
          beforeUpload={beforeUpload}
          customRequest={customRequest}
        >
          {uploadButton}
        </Upload>
      )}
    </>
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
