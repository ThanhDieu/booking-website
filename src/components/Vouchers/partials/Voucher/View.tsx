import Link from 'next/link';
import getImagePath from '@/util/getImagePath';

interface ViewProps {
  model: {
    id: string;
    title: string;
    value: number;
    currency: string;
    photo: string;
  };
}

const View = (props: ViewProps) => {
  const {
    model: { id, title, value, currency, photo },
  } = props;

  return (
    <Link
      href={`/vouchers/${id}`}
      style={{
        backgroundImage: `url(${getImagePath(photo)})`,
      }}
      className="h-72 w-full flex flex-col justify-end rounded-lg overflow-auto cursor-pointer bg-cover"
    >
      <div className="flex flex-row justify-between w-full text-PrimaryWhite">
        <div className="m-2 p-1">{title}</div>
        <div className="m-2 p-1 border-solid border-sm border-2 border-PrimaryWhite rounded-md">{`${currency} ${value}`}</div>
      </div>
    </Link>
  );
};

export default View;
