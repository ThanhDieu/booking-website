import { EmptyImage } from '@/constants/imageUrl';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { ImageBoxProps } from '../@types';
import styles from '../Room.module.scss';
import clsx from 'clsx';

const gap = 20;
const itemNum = 5;

const ImageBox = ({ data, size = [408, 306] }: ImageBoxProps) => {
  const [width, height] = size;
  const [selected, setSelected] = useState<string>('');
  const [pointer, setPointer] = useState<number>(0);

  const itemSize = (width - (itemNum - 1) * gap) / itemNum;

  const handleSelect = (imgSrc: string) => setSelected(imgSrc);

  useEffect(() => {
    data && data?.length && setSelected(data[0]);
  }, [data]);
  const handleScrollRight = () => setPointer(pointer - itemSize - gap);

  const handleScrollLeft = () => setPointer(pointer + itemSize + gap);

  const allowScrollLeft = useMemo<boolean>(() => pointer < 0, [pointer]);

  const allowScrollRight = useMemo<boolean>(() => {
    return (
      pointer > -1 * ((data?.length - itemNum) * itemSize + (data?.length - itemNum - 1) * gap)
    );
  }, [pointer, itemSize, data]);

  return (
    <div className={clsx(styles['image-box-container'], 'overflow-hidden')} style={{ width }}>
      <div className={clsx(styles['image-overview rounded-lg'], 'overflow-hidden')}>
        <Image
          className="rounded-lg object-cover overflow-hidden"
          src={selected || EmptyImage}
          width={width}
          height={height}
          alt="overview"
          loading="lazy"
        />
      </div>
      <div className={styles['image-list']} style={{ height: itemSize }}>
        {allowScrollLeft && (
          <div
            role="button"
            className={styles['image-list__chevron-left']}
            onClick={handleScrollLeft}
          >
            <ChevronLeftIcon className="text-[white]" />
          </div>
        )}
        {allowScrollRight && (
          <div
            role="button"
            className={styles['image-list__chevron-right']}
            onClick={handleScrollRight}
          >
            <ChevronRightIcon className="text-[white]" />
          </div>
        )}
        <div className={styles['image-list__container']} style={{ left: pointer }}>
          {data?.map((image, index) => (
            <Image
              className="cursor-pointer rounded-lg"
              onClick={() => handleSelect(image)}
              key={index}
              src={image || EmptyImage}
              height={itemSize}
              width={itemSize}
              alt="item"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageBox;
