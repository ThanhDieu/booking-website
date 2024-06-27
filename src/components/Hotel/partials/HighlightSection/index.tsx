import { Wrapper } from '@/components/global/Wrapper';
import { BundleType } from '@/types/bundle/bundleType';
import clsx from 'clsx';
import styles from '../../Hotel.module.scss';
import RenderSectionHeader from '../SectionHeader';
import HighlightSliderPrimary, { PrimaryContentType } from './HighlightSliderPrimary';
import HighlightSliderSecondary from './HighlightSliderSecondary';

interface IProps {
  title: string;
  desc: string;
  icon: string;
  highlightSecondaryContent: BundleType[];
  primaryContent: PrimaryContentType[];
}

const HighlightSection = ({
  title,
  desc,
  icon,
  primaryContent,
  highlightSecondaryContent,
}: IProps) => {
  return (
      <Wrapper className={styles.scrollMarginTop} id="highlights">
        <RenderSectionHeader title={title} desc={desc} icon={icon} />
        <div>
          {primaryContent ? <HighlightSliderPrimary cardContent={primaryContent} /> : ''}
          {highlightSecondaryContent ? (
            <HighlightSliderSecondary cardContent={highlightSecondaryContent} />
          ):''}
        </div>
      </Wrapper>
  );
};

export default HighlightSection;
