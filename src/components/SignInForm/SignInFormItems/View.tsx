import { SignInFormItemsViewProps, SignInFormTypes } from '.';
import Link from 'next/link';
import { ChangeProps } from './types';
import { EmailIcon, LockIcon, UserIcon } from '@/library';
import { Form, Select, Input, Checkbox } from 'antd';
import { useIbeTranslation } from '@/hooks';
import regexModel from '@/constants/regex';

interface ViewProps {
  model: SignInFormItemsViewProps;
  onFieldChange: (change: ChangeProps) => void;
  onClickResetPassword: () => void;
  setIsCheckedPolicy: (value: boolean) => void;
}

const View = (props: ViewProps) => {
  const {
    model: { fields, type, isCheckedPolicy },
    onFieldChange,
    onClickResetPassword,
    setIsCheckedPolicy,
  } = props;

  const errorMessage = useIbeTranslation('general.message');
  const accountPage = useIbeTranslation('accountPage');

  switch (type) {
    case SignInFormTypes.LOGIN:
      return (
        <div className="grid grid-cols-12 gap-4">
          {'username' in fields && (
            <Form.Item
              initialValue={fields.username}
              className="col-span-12 !mb-0"
              name="username"
              rules={[
                {
                  required: true,
                  message: errorMessage?.required,
                },
                {
                  type: 'email',
                  message: errorMessage?.format,
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<EmailIcon className="opacity-50 mr-2" />}
                type="email"
                size="large"
                placeholder={accountPage?.profile?.general?.information?.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onFieldChange({ field: 'username', value: e?.target?.value })
                }
              />
            </Form.Item>
          )}

          <Form.Item
            initialValue={fields.password}
            className="col-span-12 !mb-0"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockIcon className="opacity-50 mr-2" />}
              type="password"
              size="large"
              placeholder={accountPage?.profile?.tabTitlePassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onFieldChange({ field: 'password', value: e?.target?.value })
              }
            />
          </Form.Item>

          {/* <span 
            onClick={onClickResetPassword}
            className=" font-semibold cursor-pointer hover:text-Blue w-max"
          >
            Reset password
          </span> */}
        </div>
      );

    case SignInFormTypes.REGISTER:
      return (
        <div className="flex flex-col justify-between mt-6 gap-y-4">
          {'email' in fields && (
            <Form.Item
              initialValue={fields.email}
              className="col-span-12 !mb-0"
              name="email"
              rules={[
                {
                  required: true,
                  message: errorMessage?.required,
                },
                {
                  type: 'email',
                  message: errorMessage?.format,
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<EmailIcon className="opacity-50 mr-2" />}
                type="email"
                size="large"
                placeholder={accountPage?.profile?.general?.information?.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onFieldChange({ field: 'username', value: e?.target?.value })
                }
              />
            </Form.Item>
          )}

          {'firstName' in fields && (
            <Form.Item
              initialValue={fields.firstName}
              className="!mb-0"
              name="firstName"
              hasFeedback
              rules={[
                { required: true, message: errorMessage?.required },
                {
                  type: 'string',
                  message: 'first name must be a string!',
                },
              ]}
            >
              <Input
                prefix={<UserIcon className="opacity-50 mr-2" />}
                placeholder={accountPage?.profile?.general?.guestsTogether?.firstName}
                size="large"
              />
            </Form.Item>
          )}

          {'lastName' in fields && (
            <Form.Item
              initialValue={fields.lastName}
              className="!mb-0"
              rules={[
                { required: true, message: 'last name is required' },
                {
                  type: 'string',
                  message: 'last name must be a string!',
                },
              ]}
              name="lastName"
              hasFeedback
            >
              <Input
                prefix={<UserIcon className="opacity-50 mr-2" />}
                placeholder={accountPage?.profile?.general?.guestsTogether?.lastName}
                size="large"
              />
            </Form.Item>
          )}

          {'password' in fields && (
            <Form.Item
              className="!mb-0"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  pattern: new RegExp(regexModel.password_regex),
                  min: 8,
                  message:
                    'Password must be have UpperCase letter. LowerCase letter. Number. Symbol and Minimun length 8.',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockIcon className="opacity-50 mr-2" />}
                type="password"
                size="large"
                placeholder={accountPage?.profile?.tabTitlePassword}
              />
            </Form.Item>
          )}

          {'confirmPassword' in fields && (
            <Form.Item
              className="!mb-0"
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The new password that you entered do not match!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockIcon className="opacity-50 mr-2" />}
                type="password"
                size="large"
                placeholder={accountPage?.profile?.general?.password?.confirmPassword}
              />
            </Form.Item>
          )}
          <Form.Item className="!mb-4">
            <Checkbox
              checked={isCheckedPolicy}
              onChange={(e) => {
                setIsCheckedPolicy(e.target.checked);
              }}
            >
              <p className="flex flex-wrap gap-1">
                {accountPage?.register?.acceptText}
                <Link href={''} className="text-PrimaryBlue hover:text-MidGrey">
                  {accountPage?.register?.acceptLink}
                </Link>
              </p>
            </Checkbox>
          </Form.Item>
        </div>
      );

    default:
      return null;
  }
};

export default View;
