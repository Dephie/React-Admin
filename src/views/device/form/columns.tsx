import type { TableColumnType } from 'react-admin-kit'
import { LinkButton } from 'react-admin-kit'

export function getColumns(): TableColumnType[] {
  return [
    {
      title: '设备ID',
      dataIndex: 'device_id',
      hideInForm: true,
      required: true,
      valueType: 'digit',
    },
    {
      title: '用户ID',
      dataIndex: 'user_id',
      hideInTable: true,
      hideInSearch: true,
      required: true,
      valueType: 'digit',
    },
    {
      title: '设备所有人',
      dataIndex: 'owner',
      hideInForm: true,
    },
    {
      title: '详细地址',
      dataIndex: 'address',
      hideInForm: true,
    },
    {
      title: '手机号码',
      dataIndex: 'phone_number',
      hideInForm: true,
    },
    {
      title: '设备名称',
      dataIndex: 'device_name',
      required: true,
    },
    {
      title: '设备状态',
      dataIndex: 'device_status',
      valueType: 'radio',
      fieldProps: {
        options: [
          { label: '正常', value: 1 },
          { label: '维修中', value: 2 },
        ],
      },
      required: true,
    },
    {
      title: '操作',
      valueType: 'option',
      enableDelete: () => ({
        disabled: false,
        visible: true,
        danger: true,
        btnText: '删除'
      }),
      render: (text, record, index, actionRef, innerRef) => [
        <LinkButton
          key={1}
          onClick={() => innerRef.current?.openModal('edit', record)}
        >
          编辑
        </LinkButton>,
      ],
    },
  ]
}
