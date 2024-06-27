import { useIbeTranslation } from '@/hooks';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import ButtonShare from '../global/ButtonShare';
import styles from './Error.module.scss';

type IProps = {
  statusCode: string;
  errorMessage: string;
};

const Error = () => {
  const router = useRouter();
  // translate
  const errorPage = useIbeTranslation('errorPage');
  const generalButton = useIbeTranslation('general.button');
  const errorData = {
    statusCode: 404,
    errorType: errorPage?.notFound?.type || 'Not Found',
    errorMessage:
      errorPage?.notFound?.message || 'The page you are looking for is not found on Sonnenhotels',
  };

  return (
    <>
      <div className="px-20 py-10 flex flex-col items-center justify-between gap-5">
        <h1
          className={clsx(
            'text-PlaceHolderGrey dark:text-PlaceHolderDarkGrey text-9xl leading-[98px]'
          )}
        >
          {errorData.statusCode}
        </h1>
        <h3
          className={clsx(
            'text-PlaceHolderGrey dark:text-PlaceHolderDarkGrey text-4xl font-normal'
          )}
        >
          {errorData.errorType}
        </h3>
        <p className="font-normal">{errorData.errorMessage}</p>
        <div className="flex justify-between gap-6 py-2">
          <ButtonShare
            content={generalButton?.home || 'Go home'}
            style="dark"
            size="medium"
            onClick={() => {
              router.push('/');
            }}
          />
          <ButtonShare
            content={generalButton?.contact || 'Contact us'}
            style="outline"
            size="medium"
            onClick={() => router.push('/contact')}
          />
        </div>
      </div>
    </>
  );
};

export default Error;
