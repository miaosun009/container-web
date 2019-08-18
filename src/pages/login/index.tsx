import React, { FormEvent } from 'react';
import less from './less/index.less';
import { getToken } from '@/services';
import classNames from 'classnames';
import { Button, Input, Form } from 'antd';
import CSSModules from 'react-css-modules';
import notification from '@/utils/notification';
import Cookie from '@/utils/cookie';
import router from 'umi/router';
const login = (props: any) => {
  Cookie.get('token') && router.push('/');
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
  return (
    <div className="container flex h-full justify-center items-center" styleName='bg'>
      <div className="">
        <Form layout="inline" onSubmit={handleSubmit}>
          <Form.Item hasFeedback help={null}>
            {getFieldDecorator('username', { rules: [{ required: true }] })(<Input placeholder="username" />)}
          </Form.Item>
          <Form.Item hasFeedback help={null}>
            {getFieldDecorator('password', { rules: [{ required: true }] })(<Input placeholder="password" type="password" />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        login(values);
      }
    });
  }

  async function login(data: any) {
    const res: any = await getToken(data);
    if (res.code === 0) {
      Cookie.set('token', res.data.token,60 * 60 * 1000);
      router.push('/');
    } else {
      notification('error', res.message);
    }
  }
};

export default Form.create({})(CSSModules(login, less, { allowMultiple: true }));
