import React, { useEffect } from 'react';
import CSSModules from 'react-css-modules';
import { Modal, Form, Input, InputNumber } from 'antd';

interface Interface {
  visible: boolean;
  confirmLoading:boolean,
  onCancel?: () => void;
  onOk?: (data: any) => void;
  form?: any;
}

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const Create = ({ visible=false,confirmLoading, onCancel, onOk, form: { getFieldDecorator, validateFieldsAndScroll, resetFields } }: Interface): any => {
  useEffect(() => {
    if (visible == false) {
      resetFields();
    }
  }, [visible]);

  function handelOk() {
    validateFieldsAndScroll((errors: any, values: any) => {
      if (errors) {
        console.info(errors)
        return;
      };
      onOk && onOk(values);
    });
  }

  function handelCancel() {
    onCancel && onCancel();
  }

  return (
    <Modal centered={true} title="Basic Modal" visible={visible} okText='Confirm' onCancel={handelCancel} onOk={handelOk} wrapClassName="dark" confirmLoading={confirmLoading}>
      <Form {...formItemLayout} className="dark">
        <Form.Item label="CID" help={null}>
          {getFieldDecorator('cid', { rules: [{ required: true, message: null }] })(<Input placeholder="Please enter CID" />)}
        </Form.Item>
        <Form.Item label="Longitude" help={null}>
          {getFieldDecorator('lng', { rules: [{ required: true }] })(<InputNumber style={{ width: '100%' }} placeholder="Please enter Longitude" />)}
        </Form.Item>
        <Form.Item label="Latitude" help={null}>
          {getFieldDecorator('lat', { rules: [{ required: true }] })(<InputNumber style={{ width: '100%' }} placeholder="Please enter Latitude" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<any>({})(Create);
