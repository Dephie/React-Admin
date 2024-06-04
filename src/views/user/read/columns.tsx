import type { TableColumnType } from 'react-admin-kit'
import { LinkButton } from 'react-admin-kit'

export function getColumns(): TableColumnType[] {
  return [
    {
      title: '用户ID',
      dataIndex: 'user_id',
      required: true,
      valueType: 'digit',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户角色',
      dataIndex: 'level',
      valueType: 'radio',
      fieldProps: {
        options: [
          { label: '用户', value: 0 },
          { label: '维修人员', value: 1 },
          { label: '管理者', value: 2 },
        ],
      },
      hideInSearch: true,
    },
    {
      title: '手机号码',
      dataIndex: 'phone_number',
    },
    {
    title: '操作',
    valueType: 'option',
    enableDelete: true,
    render: (text, record, index, actionRef, innerRef) => [
      <LinkButton
        key={1}
        onClick={() => innerRef.current?.openModal('read', record)}
      >
        查看
      </LinkButton>,
    ],
  },
  ]
}
