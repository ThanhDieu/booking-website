import ButtonShare from '@/components/global/ButtonShare';
import clsx from 'clsx';
import ReactMarkdown from "react-markdown";
import styles from '../../Hotel.module.scss';

interface IProps {
  title?: string;
  desc?: string;
  items?: {
    title?: string
    description?: string
  }[];
  link?: {
    link?: string;
    title?: string;
  }
}

const DiningFooter = ({ title, desc, link, items }: IProps) => {
  return (
    <div className="lg:px-7 lg:py-[25px] p-4">
      <div className="flex flex-col lg:flex-row gap-y-2">
        <div
          className='lg:w-1/2 lg:border-solid lg:border-switch lg:border-r-[1px] lg:border-l-0 lg:border-y-0 pr-4'>
          <h3 className='font-[Lora] pb-2 lg:text-2xl text-xl'>{title}</h3>
          <ReactMarkdown className='overflow-hidden'>
            {desc || ''}
          </ReactMarkdown>
        </div>
        <div className="lg:w-1/2 lg:ml-4 justify-between">
          {(items && items?.length > 0) ?
            items?.map((item, idx) => (
              <div key={`${idx}${item?.title}`} className="flex flex-col lg:gap-y-2 gap-y-1 first:pt-0 py-4 first:border-solid first:border-switch first:border-b-[1px] first:border-t-0 first:border-x-0">
                <span className="text-[16px] text-MidGrey">{item?.title || ''}</span>
                <ReactMarkdown className='overflow-hidden'>{item?.description || ''}</ReactMarkdown>
              </div>
            ))
            : ''
          }
          {
          link?.title ?
           <ButtonShare
           content={link?.title || ''}
           onClick={() => link?.link || ''} />
           :''
          }
        </div>

      </div>
    </div>
  );
};

export default DiningFooter;
