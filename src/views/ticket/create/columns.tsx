import type { FormColumnType } from 'react-admin-kit'

export const columns: FormColumnType[] = [
  {
    title: '维护人员ID',
    dataIndex: 'maintenance_person_id',
    valueType: 'digit',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '用户名为必填项',
        },
      ],
    },
  },
  {
    title: '故障ID',
    dataIndex: 'fault_id',
    valueType: 'digit',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '用户名为必填项',
        },
      ],
    },
  },
]
