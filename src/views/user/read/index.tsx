import { useRef } from 'react'
import type { ActionRefType, InnerRefType } from 'react-admin-kit'
import { ProTable} from 'react-admin-kit'
import { Request, userInitRequest } from './api.ts'

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
        name="用户管理"
        columns={getColumns()}
        // request={mockRequest}
        request={(params) => userInitRequest(params,token)}
        bordered
        innerRef={innerRef}
        actionRef={actionRef}
      />
    </div>
  )
}

export default Basic
