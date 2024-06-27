import clsx from 'clsx';
import React from 'react';

interface ViewIconProps {
  className?: string;
  height?: number;
  width?: number;
}

const ViewIcon = ({ className, height, width }: ViewIconProps) => {
  return (
    <span className={clsx(className, 'inline-flex ml-2 items-center justify-center')}>
      <svg width="21" height="18" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.65544 8.24219H1.27014C0.945937 8.24219 0.683594 8.50426 0.683594 8.82813C0.683594 9.152 0.945937 9.41407 1.27014 9.41407H3.65544C3.97965 9.41407 4.24199 9.152 4.24199 8.82813C4.24199 8.50426 3.97965 8.24219 3.65544 8.24219Z" fill="black"/>
        <path d="M18.9057 8.24219H16.5595C16.2353 8.24219 15.973 8.50426 15.973 8.82813C15.973 9.152 16.2353 9.41407 16.5595 9.41407H18.9057C19.2299 9.41407 19.4923 9.152 19.4923 8.82813C19.4923 8.50426 19.2299 8.24219 18.9057 8.24219Z" fill="black"/>
        <path d="M16.7434 2.19913C16.5143 1.97027 16.1431 1.97027 15.914 2.19913L14.2551 3.85624C14.026 4.08511 14.026 4.45593 14.2551 4.6848C14.4842 4.91367 14.8554 4.91367 15.0845 4.6848L16.7434 3.02769C16.9725 2.79882 16.9725 2.428 16.7434 2.19913Z" fill="black"/>
        <path d="M5.95983 3.85624L4.30099 2.19913C4.07188 1.97027 3.70068 1.97027 3.47157 2.19913C3.24246 2.428 3.24246 2.79882 3.47157 3.02769L5.13041 4.6848C5.35951 4.91367 5.73072 4.91367 5.95983 4.6848C6.18893 4.45593 6.18893 4.08511 5.95983 3.85624Z" fill="black"/>
        <path d="M10.1075 0C9.78327 0 9.52093 0.26207 9.52093 0.585938V2.96875C9.52093 3.29262 9.78327 3.55469 10.1075 3.55469C10.4317 3.55469 10.694 3.29262 10.694 2.96875V0.585938C10.694 0.26207 10.4317 0 10.1075 0Z" fill="black"/>
        <path d="M10.0119 12.0133C10.0124 12.0141 10.0131 12.0148 10.0136 12.0156C9.99241 11.9837 9.9928 11.9844 10.0119 12.0133Z" fill="black"/>
        <path d="M10.0119 12.0133C9.77644 11.6759 9.26237 11.6766 9.0283 12.0156L6.45922 15.8828L5.29785 14.3359C5.06323 14.0195 4.59395 14.0195 4.35933 14.3359L0.800938 19.0625C0.671897 19.2382 0.648435 19.4726 0.742283 19.6718C0.847861 19.8711 1.04729 20 1.27018 20H15.3043C15.2307 19.8893 10.3103 12.4656 10.0119 12.0133Z" fill="black"/>
        <path d="M10.1075 4.72656C7.52013 4.72656 5.41509 6.82942 5.41509 9.41407C5.41509 10.7997 6.02369 12.0582 7.01492 12.9271L8.05111 11.3676C8.39249 10.8732 8.93782 10.5888 9.52093 10.5888C9.64129 10.5888 9.75836 10.6082 9.87391 10.6316L11.571 8.08485C11.9004 7.6002 12.4474 7.31637 13.0402 7.31637C13.6331 7.31637 14.1801 7.6002 14.5031 8.07625L14.6503 8.29692C14.1453 6.25262 12.3075 4.72656 10.1075 4.72656Z" fill="black"/>
        <path d="M20.598 19.0859L13.5329 8.73435C13.31 8.40626 12.7704 8.40626 12.5475 8.73435L10.8796 11.2377C11.1218 11.5303 12.5755 13.8065 16.7124 20H20.1169C20.3281 20 20.5275 19.8828 20.6331 19.6953C20.7387 19.4961 20.727 19.2734 20.598 19.0859Z" fill="black"/>
      </svg>
    </span>
  );
};

export default ViewIcon;