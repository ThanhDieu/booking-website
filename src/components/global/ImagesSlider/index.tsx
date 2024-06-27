import clsx from 'clsx';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronNextIcon, ChevronPrevIcon } from '@/library';
import { ImageSliderProps, ImagesPosition } from './@types';
import { EmptyImage } from '@/constants/imageUrl';

export interface ImageType {
  src: string;
}

const ImageSlider = ({ images, position, className }: ImageSliderProps) => {
  const [selected, setSelected] = useState<string>(images ? images[0] : EmptyImage);

  const handleSelect = (src: string) => setSelected(src);

  const handleIncrement = () => {
    const islLastItem = images?.length - 1;
    for (let i = 0; i < images?.length; i++) {
      if (i === islLastItem) {
        setSelected(images[0]);
        return;
      } else {
        if (images[i] === selected) {
          setSelected(images[++i]);
          return;
        }
      }
    }
  };

  const handleDecrement = () => {
    for (let i = 0; i < images?.length; i++) {
      if (images[i] === selected) {
        if (i === 0) {
          setSelected(images[images?.length - 1]);
          return;
        } else if (i > 0) {
          setSelected(images[i - 1]);
          return;
        }
      }
    }
  };

  useEffect(() => {
    images && setSelected(images[0]);
  }, [images]);

  return (
    <div className={clsx(' overflow-hidden relative', className)}>
      <Image
        alt={'hotel room'}
        unoptimized
        width={0}
        height={0}
        src={selected ? selected : EmptyImage}
        className="w-full h-full object-cover scaleImage"
        quality={80}
      />
      <div
        onClick={handleDecrement}
        className="absolute top-1/2 -translate-y-1/2 left-5 cursor-pointer"
      >
        <ChevronPrevIcon />
      </div>
      <div
        onClick={handleIncrement}
        className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
      >
        <ChevronNextIcon />
      </div>
      <div
        className={clsx(
          ImagesPosition.outside === position
            ? 'w-full bg-primary-switch mt-4'
            : 'absolute  bottom-6 left-6',
          `flex gap-4 h-14 w-14`
        )}
      >
        {images &&
          images?.map((img, index) => (
            <Image
              key={index}
              alt={'hotel room'}
              unoptimized
              width={0}
              height={0}
              src={img}
              className={clsx(
                `cursor-pointer h-14 w-14 rounded-md`,
                img?.includes(selected) && '!border-PrimaryBlue border-2 border-solid'
              )}
              onClick={() => handleSelect(img)}
            />
          ))}
      </div>
    </div>
  );
};

export default ImageSlider;
