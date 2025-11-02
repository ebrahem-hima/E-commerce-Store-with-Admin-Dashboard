import React from "react";

interface Props {
  options: { optionTitle: string; values: string[] }[];
  getOptions: { optionTitle: string; values: string[] }[];
  setGetOptions: React.Dispatch<
    React.SetStateAction<{ optionTitle: string; values: string[] }[]>
  >;
}

const Options = ({ options, getOptions, setGetOptions }: Props) => {
  const addOptions = (value: string, optionTitle: string) => {
    setGetOptions((prev) => {
      const existing = prev.find((item) => item.optionTitle === optionTitle);
      if (existing) {
        const values = existing.values.includes(value)
          ? existing.values.filter((v) => v !== value)
          : [value];
        if (values.length === 0) {
          return prev.filter((item) => item.optionTitle !== optionTitle);
        }
        return prev.map((item) =>
          item.optionTitle === optionTitle ? { ...item, values } : item
        );
      } else {
        return [...prev, { optionTitle, values: [value] }];
      }
    });
  };
  return (
    <div className="flex flex-col gap-3">
      {options?.map((option, idx) => (
        <div key={idx} className="flex gap-2">
          <span className="font-inter font-normal text-[20px] tracking-[0.03em]">
            {option.optionTitle}:
          </span>
          <div className="flex gap-2">
            {option.values.map((value, idx) => (
              <span
                key={idx}
                className={`${
                  getOptions.some((item) => item.values[0] === value)
                    ? "bg-primary text-white !border-primary"
                    : ""
                } cursor-pointer duration-200 py-0.5 px-3 border border-gray-400 hover:border-primary hover:text-white hover:bg-primary rounded-sm active:bg-primary active:border-primary active:text-white`}
                onClick={() => addOptions(value, option.optionTitle)}
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Options;
