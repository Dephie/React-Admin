import { message } from 'antd'
import { useRef } from 'react'
import type { ActionRefType, InnerRefType } from 'react-admin-kit'
import { ProTable } from 'react-admin-kit'
import { reportInitRequest,reportUpdateRequest, Request } from './api.ts'
// import { deleteRecord } from './api.ts'
import { getColumns } from './columns.tsx'

export const FORM_TYPE_MAP = {
  new: '新增',
  edit: '编辑',
  read: '查看',
}

function Basic() {
  const innerRef = useRef<InnerRefType>(null)
  const actionRef = useRef<ActionRefType>(null)
  return (
    <div>
      <ProTable
        name="故障报修"
        columns={getColumns()}
        // request={mockRequest}
        request={(params, filter) => reportInitRequest(params, filter)}
        bordered
        innerRef={innerRef}
        actionRef={actionRef}
        // toolbar={{
        //   actions: [
        //     <Button
        //       key={1}
        //       type="primary"
        //       onClick={() => {
        //         innerRef.current?.openModal()
        //       }}
        //     >
        //       新增
        //     </Button>,
        //   ],
        // }}
        rowSelection={{}}
        // delFunction={deleteRecord}
        onFinish={async (values, formType,formData) => {
          // if (formType === 'new') {
          //   await reportRequest(values);
          //   message.success('新建成功!');
          //   actionRef.current?.reload(); // 新增成功后用 actionRef 重新请求接口
          // }
          if (formType === 'edit') {
            await reportUpdateRequest(values,formData);
            message.success('编辑成功!');
            actionRef.current?.reload(); // 编辑成功后用 actionRef 重新请求接口
          }
        }}
      />
    </div>
  )
}

export default Basic
