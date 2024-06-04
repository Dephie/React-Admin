import type { FormColumnType } from 'react-admin-kit';

const getBaseColumns = (): FormColumnType[] => {
    return [
        {
            title: '用户名',
            dataIndex: 'username',
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
            title: '用户角色',
            dataIndex: 'level',
            valueType: 'radio',
            colProps: { span: 15 },
            fieldProps: {
                labelCol: { span: 6 },
                options: [
                    { label: '用户', value: 0 },
                    { label: '维修人员', value: 1 },
                    { label: '管理者', value: 2 },
                ],
                rules: [
                    {
                        required: true,
                        message: '用户角色为必填项',
                    },
                ],
                disabled: true,
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
