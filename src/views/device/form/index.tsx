import { message } from 'antd'
import { useRef } from 'react'
import type { ActionRefType, InnerRefType } from 'react-admin-kit'
import { ProTable, Button } from 'react-admin-kit'
import { deviceInitRequest, deviceUpdateRequest, deleteRecord, deviceNewRequest,Request, } from './api.ts'

import { getColumns } from './columns.tsx'

import { userStore } from '@/store/user'

export const FORM_TYPE_MAP = {
  new: '新增',
  edit: '编辑',
  read: '查看',
}

function Basic() {
  const innerRef = useRef<InnerRefType>(null)
  const actionRef = useRef<ActionRefType>(null)
  const { token } = userStore()
  return (
    <div>
      <ProTable
        name="设备管理"
        columns={getColumns()}
        // request={mockRequest}
        request={(params, filter) => Request(params, filter)}
        bordered
        innerRef={innerRef}
        actionRef={actionRef}
        toolbar={{
          actions: [
            <Button
              key={1}
              type="primary"
              onClick={() => {
                innerRef.current?.openModal()
              }}
            >
              新增设备
            </Button>,
          ],
        }}
        delFunction={async (selectedIds, record) => {
          // console.log('selectedIds:', selectedIds)
          return await deleteRecord(selectedIds,record,token)
        }}
        // rowSelection={{}}
        onFinish={async (values, formType,formData) => {
          if (formType === 'new') {
            await deviceNewRequest(values,token);
            message.success('新建设备成功!');
            actionRef.current?.reload(); // 新增成功后用 actionRef 重新请求接口
          }
          if (formType === 'edit') {
            await deviceUpdateRequest(values,formData,token);
            message.success('编辑成功!');
            actionRef.current?.reload(); // 编辑成功后用 actionRef 重新请求接口
          }
        }}
      />
    </div>
  )
}

export default Basic
