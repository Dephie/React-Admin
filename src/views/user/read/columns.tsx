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
      hideInSearch: true,
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      hideInSearch: true,
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
