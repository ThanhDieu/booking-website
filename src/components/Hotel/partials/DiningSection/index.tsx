import RenderSectionHeader from '../SectionHeader';
import DiningSlide from './DiningSlide';
import { SlideType } from './types';
import styles from '../../Hotel.module.scss';
import { Wrapper } from '@/components/global/Wrapper';

interface IProps {
  title?: string;
  desc?: string;
  sliderCardContent?: SlideType[];
  icon: string;
}

const DiningSection = ({ title, desc, sliderCardContent, icon }: IProps) => {
  return (
    <Wrapper id='dining' className={styles.scrollMarginTop}>
      <RenderSectionHeader title={title} desc={desc} icon={icon} />
      <div>
        <DiningSlide cardContent={sliderCardContent} />
      </div>
    </Wrapper>
  );
};

export default DiningSection;
