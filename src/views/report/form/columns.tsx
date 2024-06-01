import type { TableColumnType } from 'react-admin-kit'
import { LinkButton } from 'react-admin-kit'

export function getColumns(): TableColumnType[] {
  return [
    {
      title: '报修记录ID',
      dataIndex: 'fault_id',
      hideInSearch: true,
      hideInForm: true,
      required: true,
      valueType: 'digit',
    },
    {
      title: '设备ID',
      dataIndex: 'device_id',
      hideInForm: true,
      required: true,
      valueType: 'digit',
    },
    {
      title: '报修人',
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
      hideInForm: true,
    },
    {
      title: '派单状态',
      dataIndex: 'status',
      valueType: 'radio',
      fieldProps: {
        options: [
          { label: '未处理', value: 1 },
          { label: '已派单', value: 2 },
        ],
      },
      required: true,
    },
    {
      title: '故障描述',
      dataIndex: 'description',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
      required: true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      hideInSearch: true,
      required: true,
    },
    // {
    //   title: '时间范围',
    //   dataIndex: 'time',
    //   valueType: 'dateRange',
    //   transform: (vals) => {
    //     return {
    //       startTime: vals[0],
    //       endTime: vals[1],
    //     }
    //   },
    // },
    {
      title: '操作',
      valueType: 'option',
      enableDelete: false,
      // enableDelete: true,
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
