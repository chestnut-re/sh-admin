import axios from '@/request'
import { AxiosResponse } from 'axios'

/**
 * 文件接口
 */
export class FileService {
  /**
   * 上传图片
   */
  static uploadImg(file: File): Promise<AxiosResponse<any>> {
    const formData = new FormData()
    formData.append('fileType', '1')
    formData.append('file', file, file.name)
    return axios.post('/api/third/oss/uploadFile', formData)
  }

  /**
   * 获取图片可访问地址
   */
  static getFileDownloadUrl(saveUrl: string): Promise<AxiosResponse<any>> {
    return axios.get('/api//third/oss/getFileDownloadUrl', {
      params: {
        saveUrl,
      },
    })
  }
}
