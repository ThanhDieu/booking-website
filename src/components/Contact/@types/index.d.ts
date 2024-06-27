export type ContactKey = {
  name: string;
  value: string;
};

export type FormContentProps = {
  onClick?: (value: any) => void;
  contactKey?: ContactKey[];
};
