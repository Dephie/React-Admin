import type { UploadFile } from 'antd'
import { Image, Upload, message, Avatar } from 'antd';
import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import './index.scss'

import { userStore } from '@/store/user'

import { http } from '@/utils/http'

function validFileType(url = '') {
  const fileSuffix = url.split('.').pop()?.toLocaleLowerCase() || ''
  if (['png', 'jpg', 'jpeg', 'bmp', 'gif'].includes(fileSuffix))
    return 'image'
  if (['mp4', 'm2v', 'mkv', 'mov', '3gp'].includes(fileSuffix))
    return 'video'
  else return ''
}

interface UploadFileProps {
  maxCount?: number // 上传文件数量
  value?: string // 文件 url string
  fileSize?: number // 文件大小 5G
  accept?: 'image/*' | 'video/*' | 'image/*,video/*' // 图片类型
  width?: number // 宽度 120
  height?: number // 高度 120
  title?: string // 标题 点击上传
  borderRadius?: number // 默认 8
  onChange?: (url: string) => void
}

const UploadFiles: React.FC<UploadFileProps> = (props) => {
  const {
    maxCount = 1,
    value = '',
    fileSize = 1024 * 5,
    accept = 'image/*',
    title = '点击上传',
    width = 120,
    height = 120,
    borderRadius = 8,
    onChange = () => ({}),
  } = props

  const list: UploadFile[] = (value || '').split(',').filter(item => item).map((item) => {
    return {
      uid: item,
      name: item,
      status: 'done',
      url: item,
    }
  })

  const [fileList, setFileList] = useState<UploadFile[]>(list)

  const [mount, setMount] = useState(false)

  const { token, userInfo } = userStore()
  const { setUserInfo } = userStore()


  useEffect(() => {
    if (mount)
      onChange(fileList.map(item => item.url).join(','))
    else setMount(true)
  }, [fileList, mount, onChange])

  async function customRequest(options: any) {
    // console.log("options",options)
    // console.log("file", options.file)

    const avatarFile = options.file
    const formData = new FormData()
    formData.append('token', token)
    formData.append('user_id', userInfo.id)
    formData.append('file', avatarFile)
    const reponse = await http.post('/api/image', formData)
    const url = reponse.data.avatar
    const currentUrl = import.meta.env.VITE_APP_API + url
    // const { url } = await Promise.resolve({
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // })
    

    // const file = options.file;
    // const ReportResponse = await http.post('/api/user/avatar', {
    //   file: file,
    //   token: token,
    //   user_id : userInfo.id
    // )
    // const data = ReportResponse.data
    // const { url } = data.avatar

    setUserInfo({ ...userInfo, avatar: url })
    setFileList(prevState => ([...prevState, { uid: currentUrl, name: currentUrl, status: 'done', currentUrl }]))
  }

  function beforeUpload(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const { size, type } = file
      // 文件大小
      if ((size / 1024 / 1024) > fileSize) {
        message.error(`上传图片大小不能超过 ${fileSize}M！`)
        reject(new Error(`上传图片大小不能超过 ${fileSize}M！`))
      }
      // 文件类型
      const flag = (accept === 'image/*' && type.toLocaleLowerCase().includes('image'))
        || (accept === 'video/*' && type.toLocaleLowerCase().includes('video'))
        || (accept === 'image/*,video/*' && (type.toLocaleLowerCase().includes('image') || type.toLocaleLowerCase().includes('video')))
      if (!flag) {
        message.error('上传文件不符合所需的格式！')
        reject(new Error('上传文件不符合所需的格式！'))
      }
      resolve(file)
    })
  }

  function onRemove(url?: string) {
   // setFileList(fileList.filter(item => item.url !== url))
    setFileList(prevFileList => prevFileList.filter(item => item.url !== url))
  }

  const uploadPrpos = {
    customRequest,
    beforeUpload,
    fileList,
    multiple: false,
    maxCount,
    accept,
    listType: 'picture-card' as any,
    itemRender: (_originNode: ReactElement, file: UploadFile) => {
      return (
        <div className="file-wrapper">
          {validFileType(file.url) === 'video'
            ? (
              <video
                controls
                style={{ borderRadius }}
                width={width}
                height={height}
              >
                <source src={file.url} type="video/mp4" />
                <source src={file.url}type="video/ogg" />
                您的浏览器不支持Video标签。
              </video>
              )
            : (
              <Image
                style={{ borderRadius }}
                width={width}
                height={height}
                src={file.url}
              />
              )}
          <svg className="remove-icon" onClick={() => onRemove(file.url)} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
            <path fill="currentColor" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
          </svg>
        </div>
      )
    },
  }
  return (
    <Upload {...uploadPrpos} className="upload-files">
      {fileList.length === maxCount
        ? null
        : (
          <div style={{
            width,
            height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <span>{ title }</span>
          </div>
          )}
    </Upload>
  )
}

export default UploadFiles
