import { Wrapper } from '@/components/global/Wrapper';
import React from 'react';
import ServiceCard, { ServiceCardProps } from './ServiceCard';
import RenderSectionHeader from '../SectionHeader';
import clsx from 'clsx';
import styles from '../../Hotel.module.scss';

interface ServiceSectionProps {
  title: string;
  icon: string;
  text: string;
  services: ServiceCardProps[];
}

const ServicesSection = ({ title, icon, text, services }: ServiceSectionProps) => {
  return (
      <Wrapper id="services" className={styles.scrollMarginTop}>
        <RenderSectionHeader title={title} desc={text} icon={icon} />
        <div className="flex flex-col gap-y-8">
          {services?.map((data, index) => (
            <ServiceCard key={`service_title_${index}`} {...data} />
            ))}
        </div>
      </Wrapper>
  );
};

export default ServicesSection;
