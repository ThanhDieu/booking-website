import { Form } from 'antd';
import React, { useState, useReducer, useEffect } from 'react';
import clsx from 'clsx';
import styles from './SigninForm.module.scss';
import ButtonShare from '../global/ButtonShare';
import { useIbeTranslation } from '@/hooks';
import SignInFormItems, { SignInFormTypes } from './SignInFormItems';
import signInFormRducer from './SignInFormItems/signInFormReducer';
import { changeField, changeType } from './SignInFormItems/signInFormActions';
import { ChangeProps } from './SignInFormItems/types';
import { useAuth } from '@/context/auth/authContext';
import { initialRegisterField, initialSignInField } from './constant';
import { useAppSelector } from '@/store/hooks';
import { usePlausible } from 'next-plausible';
import { PlausibleEvents } from '@/types/plausible';

type IProps = {};

const SignInForm = ({}: IProps) => {
  const { login, register, isFormLoading, error } = useAuth();
  const { loading } = useAppSelector((state) => state.userSlice);
  const [handleLoading, setHandleLoading] = useState(true);
  const plausible = usePlausible<PlausibleEvents>();
  useEffect(() => {
    if (loading === 'pending' || isFormLoading === true) {
      setHandleLoading(true);
    } else {
      setHandleLoading (false)
    }
  }, [loading, isFormLoading]);

  const onFinish = (values: any) => {
    plausible("click", {
      props: {
        id: String(`form_submit_${signInData.type}`).toLowerCase()
      }
    })
    if (signInData.type === SignInFormTypes.LOGIN) {
      login(values);
    }
    if (signInData.type === SignInFormTypes.REGISTER) {
      register(values);
    }
  };

  const [isCheckedPolicy, setIsCheckedPolicy] = useState(true);

  const accountPage = useIbeTranslation('accountPage');
  const initialSignInData = {
    fields: initialSignInField,
    type: SignInFormTypes.LOGIN,
    isCheckedPolicy,
  };

  const [signInData, dispatchSignInData] = useReducer(signInFormRducer, initialSignInData);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
  }, [signInData.type]);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const handleSignInFormChange = (change: ChangeProps) => {
    dispatchSignInData(changeField(change));
  };

  const handleFormTypeChange = () => {
    if (signInData.type === SignInFormTypes.LOGIN) {
      dispatchSignInData(
        changeType({ type: SignInFormTypes.REGISTER, fields: initialRegisterField })
      );
    }
    if (signInData.type === SignInFormTypes.REGISTER) {
      dispatchSignInData(changeType({ type: SignInFormTypes.LOGIN, fields: initialSignInField }));
    }
  };

  const { profile } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    if (!profile) {
      dispatchSignInData(changeType({ type: SignInFormTypes.LOGIN, fields: initialSignInField }));
    }
  }, [profile]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (signInData.type === SignInFormTypes.LOGIN) {
      form.setFieldsValue(initialSignInField)
    }
    if (signInData.type === SignInFormTypes.REGISTER) {
      form.setFieldsValue(initialRegisterField)
    }
    form.resetFields();
   }, [form, signInData.type])

  return (
    <>
      <h2 className=" text-2xl font-normal font-[lora] mb-8">
        {signInData.type === SignInFormTypes.REGISTER
          ? accountPage?.register?.title
          : accountPage?.login?.title}
      </h2>

      <Form form={form} onFinish={onFinish}>
        <SignInFormItems
          data={signInData}
          handleFieldChange={handleSignInFormChange}
          setIsCheckedPolicy={setIsCheckedPolicy}
        />

        <div className={clsx(styles.formBorder, 'py-4')}>
          <ButtonShare
            spin={handleLoading}
            disable={handleLoading}
            htmlType="submit"
            className="w-full"
            size="large"
            style="outline"
            content={
              <div className="flex items-center justify-center gap-2">
                <span className="text-[16px] font-medium leading-5">
                  {signInData.type === SignInFormTypes.LOGIN
                    ? accountPage?.register?.signIn
                    : accountPage?.register?.signUp}
                </span>
              </div>
            }
          />

          {errorMessage && <p className="mt-4 !text-[#ff4d4f] text-center">{errorMessage}</p>}
        </div>
      </Form>

      {/*  pending login social */}
      {/* <div className="flex justify-between gap-2 py-6">
        <Button size="large" className="w-1/2 bg-[#F8F9FA]">
          <div className="flex content-center justify-center gap-2">
            <SocialGoogleIcon />
            <span>Google</span>
          </div>
        </Button>
        <Button size="large" className="w-1/2 bg-Surface">
          <div className="flex content-center justify-center gap-2">
            <SocialFacebookIcon />
            <span>Facebook</span>
          </div>
        </Button>
      </div> */}
      <p className="mx-auto text-center text-base mt-4">
        {signInData.type === SignInFormTypes.REGISTER
          ? accountPage?.register?.signInText
          : accountPage?.login?.signUpTitle}{' '}
        <span
          onClick={handleFormTypeChange}
          className=" font-semibold cursor-pointer hover:text-PrimaryBlue"
        >
          {signInData.type === SignInFormTypes.REGISTER
            ? accountPage?.register?.signIn
            : accountPage?.register?.signUp}
        </span>
      </p>
    </>
  );
};

export default SignInForm;
