export default interface TagNameProps {
    content: string  | React.ReactNode;
    className?: string;
    style?: string;
    cb?: () => void;
};