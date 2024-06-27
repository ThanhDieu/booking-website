import clsx from 'clsx';
import styles from '../Hotel.module.scss';
import Image from 'next/image';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

interface IProps {
  title?: string;
  desc?: string;
  icon: string;
}

const RenderSectionHeader = ({ title, desc, icon }: IProps) => {
  return (
    <div className="mb-7 ">
      <div className="flex mb-3">
        {icon && (
          <div className="min-w-[44px] w-11 h-11 rounded-[50%] bg-PrimaryBlue flex items-center justify-center">
            <Image className="w-6 h-6" src={icon} alt="icon" width={0} height={0} />
          </div>
        )}
        {title && (
          <h2 className={clsx(styles.sectionTitle, 'font-[lora] ml-3 my-auto')}>{title}</h2>
        )}
      </div>
      {desc && (
        <div>
          <ReactMarkdown className={clsx(styles.sectionSubtit)}>{desc || ''}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default RenderSectionHeader;
