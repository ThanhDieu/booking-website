import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import Image from 'next/image';
type UploadAvatarProps={
  onClick: (value:string) =>void
}
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadAvatar = ({onClick}:UploadAvatarProps) => {
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    
  ]);

  const handlePreview = async (file: UploadFile) => {
   
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {

    setFileList(newFileList);
    if(newFileList&&newFileList[0]) {
      handlePreview(newFileList[0]);
    onClick(previewImage)
    }
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
    {previewImage && <div>
    <Image className='w-full h-full' alt="example" width={0} height={0} src={previewImage} />
    </div>}
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList?.length >= 1 ? null : uploadButton}
      </Upload>
      
    </>
  );
};

export default UploadAvatar;