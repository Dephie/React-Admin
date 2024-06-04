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
        username: string;
        level: number;
    }
    contact:
    {
        phone_number: string;
    }
}

const User = () => {
    const formRef = useRef<FormInstance>();
    const innerRef = useRef<SchemaFormInnerRefType>();
    
    const { token, userInfo,setUserInfo } = userStore();

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
            await http.post('/api/user/update', requestData)
            setUserInfo({
                ...userInfo,
                name: base.username,
                level: base.level,
                phone_number: contact.phone_number,
            })
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

    const handleFillData = async () => {
        try {
            setLoading(true)
            const requestData = {
                params:{
                    user_id:userInfo.id,
                    token,
                }
            }
            // console.log('Sending request with data:', requestData)
            //await http.post('/api/account/view', requestData)
            const Response = await http.get('/api/user', requestData)
            const data = Response.data.user
            formRef.current?.setFieldsValue({
                base: {
                    username: data.name,
                    level:data.level,
                },
                contact: {
                    phone_number: data.phone_number,
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
        base:
        {
            username: '',
            level: 0,
        },
        contact:
        {
            phone_number: '',
        }
    });

    useEffect(() => {
        const fetchInitialValues = async () => {
            try {
                setLoading(true)
                const requestData = {
                    params: {
                        user_id: userInfo.id,
                        token,
                    }
                }
                const Response = await http.get('/api/user', requestData)
                const data = Response.data.user
                setInitialValues({
                    base: {
                        username: data.name,
                        level: data.level,
                    },
                    contact: {
                        phone_number: data.phone_number,
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
                            <FileUpload value={import.meta.env.VITE_APP_API + userInfo.avatar} />
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
