export default interface CardItemProps {
    image?: string;
    height?: string;
    title?: string | React.ReactNode;
    content?: string | React.ReactNode;
    icon?: string ;
    onClick?: () => void;
};