import type { FormColumnType } from 'react-admin-kit'

export const columns: FormColumnType[] = [
  {
    title: '设备ID',
    dataIndex: 'device_id',
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
    title: '故障描述',
    dataIndex: 'description',
    valueType: 'textarea',
    // initialValue: '请描述设备故障问题',
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
