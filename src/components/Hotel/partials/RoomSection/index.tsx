import clsx from 'clsx';
import styles from '../../Hotel.module.scss';
import RenderSectionHeader from '../SectionHeader';
import RoomsSlider from './RoomsSlider';
import { RoomCardType } from './roomCardType';
import { Wrapper } from '@/components/global/Wrapper';

interface IProps {
  title: string;
  subtitle: string;
  icon: string;
  sliderCard: RoomCardType[];
}

const RoomSection = ({ title, subtitle, sliderCard, icon }: IProps) => {
  return (
      <Wrapper id="rooms" className={styles.scrollMarginTop}>
        <RenderSectionHeader title={title} desc={subtitle} icon={icon} />
        <div>
          <RoomsSlider cardContent={sliderCard} />
        </div>
      </Wrapper>
  );
};

export default RoomSection;
