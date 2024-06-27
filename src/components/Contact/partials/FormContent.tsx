import {
  LocationPayloadType,
  LocationRenderChildrenType,
  LocationRenderType,
} from '@/components/Booking/partials/Locations/Locations';
import ButtonShare from '@/components/global/ButtonShare';
import { useIbeTranslation } from '@/hooks';
import { useLocation } from '@/hooks/useLocation';
import { PlusIcon, SubtractIcon } from '@/library';
import { useTranslation } from '@m0-0a/next-intl';
import { DatePicker, Form, Input, Modal, TreeSelect, App } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FormContentProps } from '../@types';

const FormContentCopy = ({ onClick, contactKey }: FormContentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationData, setLocationData] = useState<LocationRenderType[]>();
  const [isTrue, setIsTrue] = useState<boolean>(false);

  const message = useIbeTranslation('general.message');
  const [form] = Form.useForm();
  const contactPage = useIbeTranslation('contactPage');
  const { data } = useLocation();
  const { message: messageAntd } = App.useApp();
  const handleClick = (value: string) => {
    if (value && value.includes('@')) {
      return {
        countryCode: value.split('@')[0],
        propertyId: '',
      };
    } else {
      return {
        countryCode: value && value.split('$')[1],
        propertyId: value && value.split('#')[0],
      };
    }
  };
  useEffect(() => {
    const res = data?.data?.data?.map((location: LocationPayloadType) => {
      const title = location.countryName;
      const value = `${location.countryCode}@${location.countryName}`;
      const children = location.properties?.map((child: any) => {
        const title = child.name;
        const value = `${child.propertyId}#${child.name}$${location.countryCode}`;
        return { value, title };
      });

      return { title, value, children };
    });
    return setLocationData(res);
  }, [data?.data, isTrue]);
  const { t } = useTranslation();

  const locationDataRender = locationData?.map((location: LocationRenderType, index) => {
    const title = (
      <span className="font-[Inter] text-primary-switch font-medium">
        {t(`country${index + 1}_title`)}
      </span>
    );
    const value = location.value;
    const children = location.children.map((child: LocationRenderChildrenType) => {
      const title = `${child.title}`;
      const value = child.value;
      return { value, title };
    });

    return { title, value, children };
  });
  const handleChoose = (value: string) => {
    onClick && onClick(handleClick(value));
    setIsTrue((current) => !current);
  };

  //** Get hotel name function**//
  function extractText(inputString: string) {
    const startIndex = inputString.indexOf('#') + 1;
    const endIndex = inputString.indexOf('$');

    if (startIndex !== -1 && endIndex !== -1) {
      return inputString.substring(startIndex, endIndex);
    } else {
      return '';
    }
  }
  //** End of Get hotel name function**//
  const settingKey = contactKey?.filter((item) => item.name === 'CONTACT_EMAIL_FORM');

  const baseUrl = settingKey && settingKey?.length ? settingKey[0]?.value : '';

  const handleSubmitForm = async (formData: any) => {
    const travelDataFormat = formData?.travelData?.map((item: any) => ({
      selectedHotel: extractText(item?.selectedHotel) ?? '',
      guest: item?.guest ?? '',
      arrivalDate: dayjs(item?.arrivalDate).format('DD.MM.YYYY') ?? '',
      departureDate: dayjs(item?.departureDate).format('DD.MM.YYYY') ?? '',
    }));
    const payload = {
      fullName: formData.fullName ?? '',
      email: formData.email ?? '',
      message: formData.message ?? '',
      travelData: travelDataFormat,
    };
    await axios
      .post(baseUrl, payload)
      .then(() => setIsModalOpen(true))
      .catch(() => messageAntd.error(contactPage?.contactForm?.popupFailure?.title));
    form.resetFields();
  };

  const initValue = {
    fullName: '',
    email: '',
    message: '',
    travelData: [
      {
        selectedHotel: undefined,
        guest: '',
        arrivalDate: '',
        departureDate: '',
      },
    ],
  };
  return (
    <Form
      form={form}
      initialValues={initValue}
      name="Form"
      onFinish={handleSubmitForm}
      className="p-6 bg-primary-switch rounded-2xl flex flex-col gap-8 col-span-10 md:col-span-7"
    >
      <div className="gap-4 flex flex-col">
        <p className="font-[Lora] text-xl font-medium leading-[26px]">
          {contactPage?.contactForm?.personalInfo}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Form.Item
            className="md:w-1/2 w-3/4 !mb-0"
            name="fullName"
            rules={[{ required: true, message: message?.required }]}
          >
            <Input placeholder={contactPage?.contactForm?.placeholder?.name} size="large" />
          </Form.Item>
          <Form.Item
            className="md:w-1/2 w-3/4 !mb-0"
            name="email"
            rules={[
              { required: true, message: message?.required },
              { type: 'email', message: message?.format },
            ]}
          >
            <Input placeholder={contactPage?.contactForm?.placeholder?.email} size="large" />
          </Form.Item>
        </div>
      </div>
      <div className="grid gap-y-4">
        <p className="font-[Lora] text-xl  font-medium leading-[26px]">
          {contactPage?.contactForm?.travelData}
        </p>
        <Form.List name="travelData">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key}>
                  <div className="flex items-center justify-between pb-4">
                    <p className="">
                      {contactPage?.contactForm?.sunHotel || 'Sun hotel'} <span>{key + 1}</span>
                    </p>

                    <button
                      onClick={() => remove(name)}
                      className="w-fit !p-0 bg-TransParent outline-none border-0 cursor-pointer  text-PrimaryWhite dark:text-PrimaryBlack"
                    >
                      <SubtractIcon />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      {...restField}
                      className="!mb-0"
                      name={[name, `selectedHotel`]}
                      rules={[{ required: true, message: message?.required }]}
                    >
                      <TreeSelect
                        size="large"
                        allowClear={true}
                        showSearch
                        treeDefaultExpandAll
                        placeholder={contactPage?.contactForm?.placeholder?.hotel}
                        treeData={locationDataRender}
                        onChange={(value: any) => {
                          handleChoose(value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item className="!mb-0" name={[name, `guest`]} {...restField}>
                      <Input
                        size="large"
                        placeholder={contactPage?.contactForm?.placeholder?.guest}
                      />
                    </Form.Item>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Form.Item className="!mb-0" name={[name, `arrivalDate`]}>
                      <DatePicker
                        format={'DD.MM.YYYY'}
                        size="large"
                        placeholder={contactPage?.contactForm?.placeholder?.arriveDate}
                        className="w-full"
                      />
                    </Form.Item>
                    <Form.Item className="!mb-0" name={[name, `departureDate`]}>
                      <DatePicker
                        format={'DD.MM.YYYY'}
                        size="large"
                        placeholder={contactPage?.contactForm?.placeholder?.departureDate}
                        className="w-full"
                      />
                    </Form.Item>
                  </div>
                </div>
              ))}
              <Form.Item className="!mb-0">
                <ButtonShare
                  onClick={() => add()}
                  content={
                    <div className="flex gap-2 items-center justify-center">
                      <PlusIcon /> {contactPage?.contactForm?.buttonText?.addHotel}
                    </div>
                  }
                  size="medium"
                  style="surface"
                  className="w-full"
                />
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
      <div className="">
        <p className="pb-4  font-[Lora] text-xl font-medium leading-[26px]">
          {contactPage?.contactForm?.note}
        </p>
        <Form.Item className="w-full !mb-0" name="message">
          <Input.TextArea />
        </Form.Item>
      </div>
      <Form.Item className="w-full !mb-0" name="button">
        <ButtonShare
          style="dark"
          content={contactPage?.contactForm?.buttonText?.submit}
          className="w-full"
          htmlType="submit"
        />
      </Form.Item>
      <Modal
        onCancel={() => setIsModalOpen(false)}
        footer={
          <ButtonShare
            content="OK"
            onClick={() => {
              setIsModalOpen(false);
            }}
            size="small"
          />
        }
        title={contactPage?.contactForm?.popupSuccess?.title || 'Your form has been submitted'}
        open={isModalOpen}
      >
        {contactPage?.contactForm?.popupSuccess?.description ||
          'We will get in touch with you soon!'}
      </Modal>
    </Form>
  );
};

export default FormContentCopy;
