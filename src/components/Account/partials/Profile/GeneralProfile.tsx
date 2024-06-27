/* eslint-disable react-hooks/exhaustive-deps */
import ButtonShare from '@/components/global/ButtonShare';
import { Avatar, Form, Input, Modal, Select, message } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './../../Account.module.scss';
import { ProfileUpdatePayload } from '@/types/userSliceType/userSlice';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { asyncThunkFetchProfile, asyncThunkUpdateProfile } from '@/store/slice/userSlice';
import dayjs from 'dayjs';
import UploadAvatar from '@/components/global/UploadAvatar';
import { LocationGlobalType } from '@/types/commonSliceType/commonSliceType';
import { EmptyImage } from '@/constants/imageUrl';
import { useIbeTranslation } from '@/hooks';
import PhoneInput from 'react-phone-input-2';
import { useLocale } from '@m0-0a/next-intl';
import regexModel from '@/constants/regex';
import 'react-phone-input-2/lib/style.css';
import statusCode from '@/constants/statusCode';
import { backend_UpdateUser } from '@/service/userService';
import { ThemeType } from '@/store/slice/themeSlice';
import { MenuDropDownIcon } from '@/library';
import useTopCountries from '@/hooks/useTopCountries';

type GeneralProfileProps = {
  profile?: Partial<ProfileUpdatePayload>;
};

const GeneralProfile = ({ profile }: GeneralProfileProps) => {
  const { selected } = useAppSelector((state) => state.themeSlice);
  const [customePhoneNumber, setCustomePhoneNumber] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);
  const [openModalUpload, setOpenModalUpload] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { locale } = useLocale();
  // Render prefered country name on top
  const modifiedCountries = useTopCountries();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      avatar: profile?.avatar || EmptyImage,
      title: profile?.title || undefined,
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      phoneNumber: profile?.phoneNumber || '',
      addressLine1: profile?.addressLine1 || '',
      postalCode: profile?.postalCode || '',
      country: profile?.country || undefined,
      countryCode: profile?.countryCode || '',
      location: profile?.location || '',
      email: profile?.email || '',
    },

    onSubmit: async (value: backend_UpdateUser) => {
      try {
        const newValue = {
          ...value,
          lastname: value.lastName,
          gender: value.title === 'mr' ? 'male' : value.title === 'other' ? 'other' : 'female',
        };

        const res = await dispatch(asyncThunkUpdateProfile(newValue));
        if (res?.payload?.code === statusCode.SUCCESS) {
          await dispatch(asyncThunkFetchProfile());
          message.success(
            accountPage?.general?.message?.updateProfileSuccess ?? 'update profile success'
          );
          setEdit(false);
        }
      } catch (err) {
        message.error(accountPage?.general?.message?.updateProfileFaild ?? 'update profile fail!');
      } finally {
        setEdit(false);
      }
    },
  });

  /** set Phone number format**/

  const handlePhoneChange = (
    value: string,
    country: any,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
    const formattedPhoneNumber: string = `+(${country.dialCode})${formattedValue
      .replace(`+${country.dialCode}`, '')
      .replace('(', '')
      .replace(')', '')}`;
    setCustomePhoneNumber(formattedPhoneNumber);
    formik.setFieldValue('phoneNumber', customePhoneNumber);
  };
  const renderLocationOptions = useMemo(() => {
    return modifiedCountries?.map((country: LocationGlobalType) => ({
      value: country.countryCode,
      label: country.countryName,
    }));
  }, [modifiedCountries]);
  // get avatar bs64 and dispatch avatar profile
  const handleGetAvatar = () => {
    setOpenModalUpload(!openModalUpload);
  };

  useEffect(() => {
    openModalUpload && form.setFieldsValue(formik?.initialValues);
  }, [formik?.initialValues]);

  const message = useIbeTranslation('general.message');
  const button = useIbeTranslation('general.button');
  const accountPage = useIbeTranslation('accountPage');

  const classPhoneInputCustom =
    selected === ThemeType.dark ? `!bg-[#1D1F20]  text-[#fff]  !border-0` : '';
  return (
    <>
      {edit ? (
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-row gap-2">
            <div className="relative h-[100px] w-[100px]">
              <Image
                src={formik?.values?.avatar ?? EmptyImage}
                className="w-full h-full rounded-[50%]"
                alt={''}
                width={0}
                height={0}
              />
            </div>
            <div className="mt-auto">
              <ButtonShare
                onClick={() => setOpenModalUpload(true)}
                className={styles.textBtn}
                size="medium"
                content={accountPage?.profile?.general?.information?.buttonName?.editAvatar}
              />
            </div>
          </div>
          <Form
            name="form"
            form={form}
            onSubmitCapture={formik.handleSubmit}
            className="flex flex-col gap-y-8 form-account"
            initialValues={formik?.initialValues}
          >
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 capitalize">
                <p className={styles.bundleTitle}>
                  {accountPage?.profile?.general?.information?.title}
                </p>
              </div>
              <div className="col-span-2">
                <Form.Item className="mb-0" name="title">
                  <Select
                    suffixIcon={<MenuDropDownIcon />}
                    onChange={(value) => {
                      formik.setFieldValue('title', value);
                    }}
                    value={formik?.values?.title}
                    size="large"
                    placeholder="Title"
                    options={[
                      { value: 'mr', label: 'Mr' },
                      { value: 'ms', label: 'Ms' },
                      { value: 'other', label: 'Other' },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="col-span-5">
                <Form.Item className="mb-0" name="firstName">
                  <Input
                    onChange={(e) => formik.setFieldValue('firstName', e.target.value)}
                    value={formik?.values?.firstName}
                    size="large"
                    placeholder={accountPage?.profile?.general?.information?.firstName}
                  />
                </Form.Item>
              </div>
              <div className="col-span-5">
                <Form.Item className="mb-0" name="lastName">
                  <Input
                    onChange={(e) => formik.setFieldValue('lastName', e.target.value)}
                    value={formik?.values?.lastName}
                    size="large"
                    placeholder={accountPage?.profile?.general?.information?.lastName}
                  />
                </Form.Item>
              </div>

              <div className="col-span-5 col-start-3">
                <Form.Item
                  rules={[
                    { pattern: regexModel.validateNumber, message: message?.number },
                    { min: 10, message: `${message?.min} 10` },
                  ]}
                  name="phoneNumber"
                  className="col-span-5 col-start-3 "
                >
                  <PhoneInput
                    preferredCountries={['de']}
                    buttonClass={classPhoneInputCustom}
                    dropdownClass={clsx('!bg-[rgb(40,46,54)]', classPhoneInputCustom)}
                    inputClass={clsx(classPhoneInputCustom, '!h-10')}
                    country={'de'}
                    value={customePhoneNumber}
                    onChange={handlePhoneChange}
                    placeholder={accountPage?.profile?.general?.information?.phoneNumber || ''}
                  />
                </Form.Item>
              </div>
              <div className="col-span-5">
                <Form.Item
                  className="mb-0"
                  name="email"
                  rules={[
                    { required: true, message: message?.required },
                    { type: 'email', message: message?.format },
                  ]}
                >
                  <Input
                    onChange={formik.handleChange}
                    disabled={true}
                    size="large"
                    value={formik.values.email}
                    placeholder={accountPage?.profile?.general?.information?.email}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <p className={styles.bundleTitle}>
                  {accountPage?.profile?.general?.information?.address}
                </p>
              </div>
              <div className="col-span-12">
                <Form.Item className="mb-0" name="addressLine1">
                  <Input
                    name="addressLine1"
                    onChange={formik.handleChange}
                    value={formik.values.addressLine1}
                    size="large"
                    placeholder={accountPage?.profile?.general?.information?.street}
                  />
                </Form.Item>
              </div>
              <div className="col-span-2">
                <Form.Item className="mb-0" name="postalCode">
                  <Input
                    name="postalCode"
                    onChange={formik.handleChange}
                    value={formik.values.postalCode}
                    size="large"
                    placeholder={accountPage?.profile?.general?.information?.postCode}
                  />
                </Form.Item>
              </div>
              <div className="col-span-5">
                <Form.Item className="mb-0" name="country">
                  <Select
                    suffixIcon={<MenuDropDownIcon />}
                    value={formik.values.countryCode}
                    onChange={(value) => {
                      const find = modifiedCountries.find(
                        (ele: LocationGlobalType) => ele.countryCode === value
                      );
                      if (find) {
                        formik.setFieldValue('countryCode', find.countryCode);
                        formik.setFieldValue('country', find.countryName);
                      }
                    }}
                    showSearch
                    filterOption={(input, option: any) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    className="w-full"
                    size="large"
                    placeholder={accountPage?.profile?.general?.information?.selectCountry}
                    options={renderLocationOptions}
                  />
                </Form.Item>
              </div>
              <div className="col-span-5">
                <Form.Item className="mb-0" name="location">
                  <Input
                    name="location"
                    onChange={formik.handleChange}
                    value={formik.values.location}
                    size="large"
                    placeholder={accountPage?.profile?.general?.information?.location}
                  />
                </Form.Item>
              </div>
              <div className="col-span-12 gap-4 flex pt-4">
                <Form.Item className="mb-0">
                  <ButtonShare
                    className={clsx(styles.textBtn)}
                    style={'dark'}
                    size="medium"
                    content={accountPage?.profile?.general?.information?.buttonName?.save}
                    htmlType="submit"
                  />
                </Form.Item>
                <Form.Item className="mb-0">
                  <ButtonShare
                    htmlType="button"
                    onClick={() => {
                      form.setFieldsValue(formik?.initialValues);
                    }}
                    style="surface"
                    className={clsx(styles.textBtn)}
                    size="medium"
                    content={accountPage?.profile?.general?.information?.buttonName?.discard}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      ) : (
        <div className="rounded-2xl bg-primary-switch p-6">
          <div className="grid grid-cols-3 gap-4 ">
            <Image
              src={formik.values.avatar ?? EmptyImage}
              className="w-[100px] h-[100px] rounded-[50%]"
              alt={''}
              width={0}
              height={0}
            />
            <div className="lg:col-span-3 col-span-3">
              <p className={styles.bundleTitle}>
                {accountPage?.profile?.general?.information?.title}
              </p>
            </div>

            <div className="lg:col-span-1 col-span-2">
              <p className={clsx(styles.textGuestTile, 'text-secondary-switch')}>
                {accountPage?.profile?.general?.information?.fullName}
              </p>
              <p className={clsx(styles.textBtn, 'capitalize')}>
                {profile?.title} {profile?.firstName} {profile?.lastName}
              </p>
            </div>
            <div className="lg:col-span-1 col-span-2">
              <p className={clsx(styles.textGuestTile, 'text-secondary-switch')}>
                {accountPage?.profile?.general?.information?.phoneNumber}
              </p>
              <p className={clsx(styles.textBtn)}>{profile?.phoneNumber}</p>
            </div>
            <div className="xl:col-span-1 col-span-3">
              <p className={clsx(styles.textGuestTile, 'text-secondary-switch')}>
                {accountPage?.profile?.general?.information?.email}
              </p>
              <p className={clsx(styles.textBtn)}>{profile?.email}</p>
            </div>
            <div className="col-span-3">
              <p className={styles.bundleTitle}>
                {accountPage?.profile?.general?.information?.address}
              </p>
            </div>

            <div className="lg:col-span-1 col-span-3">
              <p className={clsx(styles.textGuestTile, 'text-secondary-switch')}>
                {accountPage?.profile?.general?.information?.street}
              </p>
              <p className={clsx(styles.textBtn, 'capitalize')}>{profile?.addressLine1}</p>
            </div>
            <div className="lg:col-span-1 col-span-3">
              <p className={clsx(styles.textGuestTile, 'text-secondary-switch')}>
                {accountPage?.profile?.general?.information?.country}
              </p>
              <p className={clsx(styles.textBtn)}>{profile?.country}</p>
            </div>
            <div className="lg:col-span-1 col-span-3">
              <p className={clsx(styles.textGuestTile, 'text-secondary-switch')}>
                {accountPage?.profile?.general?.information?.location}
              </p>
              <p className={clsx(styles.textBtn)}>
                {profile?.postalCode} {profile?.location}
              </p>
            </div>
            <div className="col-span-3 pt-4">
              <ButtonShare
                content={accountPage?.profile?.general?.information?.buttonName?.edit}
                style="dark"
                onClick={() => {
                  setEdit(!edit);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/*  modal upload avatar */}
      <Modal
        title="Basic Modal"
        open={openModalUpload}
        footer={
          <div className="flex gap-4 justify-end">
            <ButtonShare
              style="surface"
              content={button.cancel}
              onClick={() => setOpenModalUpload(false)}
            />
            <ButtonShare style="dark" content={'Ok'} onClick={handleGetAvatar} />
          </div>
        }
      >
        <UploadAvatar
          onClick={(value: string) => {
            formik.setFieldValue('avatar', value);
          }}
        />
      </Modal>
    </>
  );
};

export default GeneralProfile;
