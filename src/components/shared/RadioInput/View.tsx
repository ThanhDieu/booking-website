import { RadioInputViewProps, OptionProps } from '.';

interface ViewProps {
  model: RadioInputViewProps;
  onClickValue: (selected: string) => void;
}

const View = (props: ViewProps) => {
  const {
    model: { name, title, subTitle, selectedValue, options },
    onClickValue,
  } = props;

  return (
    <fieldset className="flex flex-col items-center gap-3 isolate w-full border-0">
      <legend className="text-xl mb-3 font-[lora]">{title}</legend>
      {subTitle && <p className="self-start font-[Inter] text-Deactive">{subTitle}</p>}
      {options.map((option: any) => (
        <div className="w-full flex items-center justify-start" key={option.value}>
          <input
            className="w-6 h-6 accent-PrimaryBlue"
            type="radio"
            id={option.value}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onClickValue(option.value)}
          />
          <label className="ml-4 text-base" htmlFor={option.value}>
            {option.label}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default View;
