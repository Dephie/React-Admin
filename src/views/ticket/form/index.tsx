import { message } from 'antd'
import { useRef } from 'react'
import type { ActionRefType, InnerRefType } from 'react-admin-kit'
import { ProTable} from 'react-admin-kit'
import { ticketInitRequest, ticketUpdateRequest, deleteRecord,Request } from './api.ts'

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
        name="工单管理"
        columns={getColumns()}
        // request={mockRequest}
        request={(params, filter) => Request(params, filter)}
        bordered
        innerRef={innerRef}
        actionRef={actionRef}
        delFunction={async (selectedIds, record) => {
          // console.log('selectedIds:', selectedIds)
          return await deleteRecord(selectedIds,record,token)
        }}
        // rowSelection={{}}
        onFinish={async (values, formType,formData) => {
          if (formType === 'edit') {
            await ticketUpdateRequest(values,formData,token);
            message.success('编辑成功!');
            actionRef.current?.reload(); // 编辑成功后用 actionRef 重新请求接口
          }
        }}
      />
    </div>
  )
}

export default Basic
