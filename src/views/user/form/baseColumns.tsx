import type { FormColumnType } from 'react-admin-kit';

const getBaseColumns = (): FormColumnType[] => {
    return [
        {
            title: '用户名',
            dataIndex: 'name',
            //colProps: { span: 24 },
            formItemProps: {
                //labelCol: { span: 3 },
                rules: [
                    {
                        required: true,
                        message: '用户名为必填项',
                    },
                ],
            },
        },
        {
            title: '出生日期',
            dataIndex: 'birthdate',
            valueType: 'date',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            valueType: 'radio',
            fieldProps: {
                options: ['男', '女'],
            },
        },
        {
            title: '地址',
            dataIndex: 'address',
            colProps: { span: 21 },
            formItemProps: {
                labelCol: { span: 3 },
                rules: [
                    {
                        message: '用户名为必填项',
                    },
                ],
            },
        },
        // {
        //     valueType: 'dependency',
        //     // 👇这里是一个套嵌数组, 因为valueBaseName是business👇
        //     name: [['business', 'serviceName']],
        //     columns: (values) => {
        //         const serviceName = values?.business?.serviceName;

        //         if (serviceName === '2') {
        //             return [
        //                 {
        //                     title: '身份证号',
        //                     dataIndex: 'idNumber',
        //                     colProps: { span: 16 },
        //                     formItemProps: {
        //                         // 3 / 16 = 0.1875
        //                         labelCol: { flex: '0 0 18.75%' },
        //                     },
        //                 },
        //                 { fieldProps: { style: { display: 'none' } } },
        //             ];
        //         } else {
        //             return [];
        //         }
        //     },
        // },
    ];
};

export default getBaseColumns;
