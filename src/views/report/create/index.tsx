import { useRef, useState } from 'react'
import { Button } from 'antd'

import { SchemaForm } from 'react-admin-kit'
import type { FormInstance } from 'antd'
import { columns } from './columns.tsx'

import { http } from '@/utils/http'
import { userStore } from '@/store/user'

function CreateReport() {
  const formRef = useRef<FormInstance>()

  const { token } = userStore()
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      const requestData = {
        ...values,
        token,
      }
      // console.log('Sending request with data:', requestData)
      await http.post('/api/fault/add', requestData)
      // const CreateReportResponse = await http.post('/api/fault/add', requestData)
      // const data = CreateReportResponse.data
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <SchemaForm
        layout="horizontal"
        labelCol={{ span: 3 }}
        onFinish={onFinish}
        formRef={formRef}
        columns={columns}
        autoFocusFirstInput={false}
      />

      <div style={{ textAlign: 'end' }}>
        <Button
          style={{ marginRight: '10px' }}

          onClick={() => formRef.current?.resetFields()}
        >
          重置
        </Button>
        <Button
          type="primary"
          onClick={() => formRef.current?.submit()}
          loading={loading}
        >
          提交
        </Button>
      </div>
    </div>
  )
}

export default CreateReport
