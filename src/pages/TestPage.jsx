import {Button, Card, Form, Input, Modal, Upload} from "antd";
import {useState} from "react";
import {UploadOutlined} from "@ant-design/icons";
import client from "../client/client.js";


function TestPage() {
    const [isModalOpen, setModalOpen] = useState(false)
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm()

    function onOk() {
        form.submit()
    }

    function onCancel() {
        setModalOpen(false);
        setFileList([]);
    }

    function onFinish(values) {
        const {versionCode, versionName, updateReason} = values;
        const formData = new FormData();
        formData.append("versionCode", versionCode);
        formData.append("versionName", versionName);
        formData.append("updateReason", updateReason);
        formData.append("file", fileList[0]);
        for (let f of fileList) {
            formData.append("fileList", f)
        }

        client({
            url: '/apk/upload',
            method: 'POST',
            data: formData
        })
    }

    function onFinishFailed() {

    }

    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList
    };

    return (
        <Card className='full-container' title='测试页面-表单测试'>
            <Button type="primary" onClick={() => setModalOpen(true)}>表单上传</Button>
            <Modal title="文件上传" open={isModalOpen} onOk={onOk} onCancel={onCancel}>
                <Form
                    name="basic"
                    form={form}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="版本号"
                        name="versionCode"
                        rules={[
                            {
                                required: true,
                                message: '版本号不能为空',
                            },
                        ]}
                    >
                        <Input  />
                    </Form.Item>

                    <Form.Item
                        label="版本名称"
                        name="versionName"
                        rules={[
                            {
                                required: true,
                                message: '请输入版本名称',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="更新原因"
                        name="updateReason"
                        rules={[
                            {
                                required: true,
                                message: '更新原因不能为空',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="版本名称"
                        name="files"
                        rules={[
                            {
                                required: true,
                                message: '文件不能为空',
                            },
                        ]}
                    >
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>选择 APK</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    )
}


export default TestPage;