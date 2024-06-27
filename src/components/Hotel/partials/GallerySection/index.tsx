import { Wrapper } from '@/components/global/Wrapper';
import GallerySlider from './GallerySlider';
import { GalleryIcon } from '@/library';
import RenderSectionHeader from '../SectionHeader';
import ButtonShare from '@/components/global/ButtonShare';
import { GalleryImageType } from '@/types/propertyType.ts/propertyType';

interface IProps {
  title: string;
  subtit: string;
  media: GalleryImageType[];
}

export const GallerySection = ({ title, subtit, media }: IProps) => {
  return (
    <div className="py-[43px]">
      <Wrapper>
        <RenderSectionHeader title={title} desc={subtit} icon={''} />
        <GallerySlider galleryCards={media} />
        <div className="pt-6 flex justify-center">
          <ButtonShare style={'outline'} content={'Go to Media Gallery'} size={'large'} />
        </div>
      </Wrapper>
    </div>
  );
};

export default GallerySection;
