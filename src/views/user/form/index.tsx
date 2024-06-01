import { Button, Card } from 'antd';
import { useRef, useState,useEffect } from 'react';
import { ProForm, SchemaForm, SchemaFormInnerRefType } from 'react-admin-kit';
import getBaseColumns from './baseColumns';
import getContactColumns from './contactColumns'

import type { FormInstance } from 'antd';

import { userStore } from '@/store/user';
import FileUpload from '@/components/UploadFiles';

import { http } from '@/utils/http';

interface UserProps{
    base:
    {
        name: string;
        birthdate: string;
        gender: string;
        address: string;
    }
    contact:
    {
        contact: string;
        email: string;
    }
}

const User = () => {
    const formRef = useRef<FormInstance>();
    const innerRef = useRef<SchemaFormInnerRefType>();
    
    const { token, userInfo } = userStore();

    const onFinish = async (values: any) => {
        //console.log({ values, data: innerRef.current?.data });

        const { base, contact } = values;
        try {
            setLoading(true)
            const requestData = {
                ...base,
                ...contact,
                token,
                user_id: userInfo.id,
            }
            //console.log('Sending request with data:', requestData)
            await http.post('/api/account/update', requestData)
            // const CreateReportResponse = await http.post('/api/work_order/create', requestData)
            // const data = CreateReportResponse.data
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    };

    const [readonly, setReadonly] = useState(true);

    const [loading, setLoading] = useState(false);

    // const [user, setUser] = useState<UserProps>({
    //     base: {
    //         name: '',
    //         birthdate: '',
    //         gender: '',
    //         address: '',
    //     },
    //     contact: {
    //         contact: '',
    //         email: '',
    //     },
    // });

    const handleFillData = async () => {
        try {
            setLoading(true)
            const requestData = {
                user_id:userInfo.id,
                token,
            }
            // console.log('Sending request with data:', requestData)
            //await http.post('/api/account/view', requestData)
            const Response = await http.post('/api/user', requestData)
            const data = Response.data.user
            formRef.current?.setFieldsValue({
                base: {
                    name: data.username,
                    //birthdate: data.birthdate,
                    // address: data.address,
                    // gender: data.gender,
                    
                },
                contact: {
                    contact: userInfo.phone_number,
                    email: data.email,
                }
            })
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    };

    // TODO
    const [initialValues, setInitialValues] = useState<UserProps>({
        base: {
            name: '',
            birthdate: '',
            gender: '',
            address: '',
        },
        contact: {
            contact: '',
            email: '',
        },
    });

    useEffect(() => {
        const fetchInitialValues = async () => {
            try {
                setLoading(true)
                const requestData = {
                    user_id: userInfo.id,
                    token,
                }
                const Response = await http.post('/api/user', requestData)
                const data = Response.data.user
                setInitialValues({
                    base: {
                        name: data.username,
                        birthdate: data.birthdate,
                        address: data.address,
                        gender: data.gender,

                    },
                    contact: {
                        contact: data.phone_number,
                        email: data.email,
                    }
                })
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        };

        fetchInitialValues();
    }, []); // 注意这里的空依赖数组，这意味着这个 useEffect 只会在组件挂载后运行一次
    //TODO

    return (
        <div>
            <ProForm
                layout="horizontal"
                onFinish={onFinish}
                submitter={false}
                formRef={formRef}
                innerRef={innerRef}
                readonly={readonly} // 也可以单独设在某个SchemaForm上
                //TODO
                initialValues={initialValues}

            >
                <div className= 'flex'>
                <Card
                    style={{ marginBottom: '24px',marginRight:'24px' ,width: '150px'}}
                    size="small"
                    styles={{
                        header: {
                            background: '#ebebeb',
                        },
                        body: {
                            height: '150px',
                        },
                    }}
                    title="个人头像"
                    >
                    <div className='items-center justify-center'>
                            <FileUpload value={userInfo.avatar} />
                    </div>
                </Card>
                <Card
                    style={{ marginBottom: '24px', width: '150px', flex: '1 1 auto'  }}
                    size="small"
                    styles={{
                        header: {
                            background: '#ebebeb',
                        },
                    }}
                    title="基本信息"
                >
                    <div className='pt-5'>
                        <SchemaForm
                            embed
                            grid={true}
                            rowProps={{ gutter: [0, 0] }}
                            colProps={{ span: 8 }}
                            labelCol={{ span: 9 }}
                            columns={getBaseColumns()}
                            valueBaseName="base"
                        />
                    </div>  
                </Card>
                </div>
                <Card
                    size="small"
                    title="联系方式"
                    styles={{
                        header: { background: '#ebebeb' },

                    }}
                >
                    <div className = 'pt-5'>
                    <SchemaForm
                        embed
                        columns={getContactColumns()}
                        labelCol={{ span: 3 }}
                        valueBaseName="contact"
                        />
                    </div>
                </Card>
            </ProForm>

            <div style={{ marginTop: '10px', textAlign: 'end' }}>
                <Button
                    loading={loading}
                    style={{ marginRight: '20px' }}
                    onClick={handleFillData}
                >
                    回显数据
                </Button>
                <Button
                    style={{ marginRight: '10px' }}
                    onClick={() => formRef.current?.resetFields()}
                >
                    清空
                </Button>
                <Button
                    style={{ marginRight: '10px' }}
                    onClick={() => setReadonly((val) => !val)}
                >
                    编辑
                </Button>
                <Button type="primary" onClick={() => formRef.current?.submit()}>
                    提交
                </Button>
            </div>
        </div>
    );
};

export default User;
