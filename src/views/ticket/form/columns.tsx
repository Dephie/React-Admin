import type { TableColumnType } from 'react-admin-kit'
import { LinkButton } from 'react-admin-kit'

export function getColumns(): TableColumnType[] {
  return [
    {
      title: '工单ID',
      dataIndex: 'work_order_id',
      hideInForm: true,
      required: true,
      valueType: 'digit',
    },
    {
      title: '故障ID',
      dataIndex: 'fault_id',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true,
      required: true,
      valueType: 'digit',
    },
    {
      title: '维修人员ID',
      dataIndex: 'maintenance_person_id',
      hideInTable: true,
      hideInSearch: true,
      required: true,
      valueType: 'digit',
    },
    {
      title: '维修人',
      dataIndex: 'maintenance_person',
      hideInForm: true,
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
      title: '设备名称',
      dataIndex: 'device_name',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '工单状态',
      dataIndex: 'status',
      valueType: 'radio',
      fieldProps: {
        options: [
          { label: '处理中', value: 1 },
          { label: '已完成', value: 2 },
        ],
      },
      hideInSearch: true,
      required: true,
    },
    {
      title: '创建时间',
      dataIndex: 'maintenance_time',
      valueType: 'dateTime',
      hideInSearch: true,
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
          更新
        </LinkButton>,
      ],
    },
  ]
}
