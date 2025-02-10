import * as React from 'react';

interface MultiSelectDropdownProps {
  options: { value: string; label: string }[];
  values: string[];
  onChange: (value: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  values,
  onChange,
}) => {
  const handleChange = (selectedValue: string) => {
    if (values && values.length > 0) {
      if (values.includes(selectedValue)) {
        onChange(values.filter((item) => item !== selectedValue));
      } else {
        onChange([...values, selectedValue]);
      }
    }
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type='checkbox'
            checked={values && values.length > 0 && values.includes(option.value)}
            onChange={() => handleChange(option.value)}
          />
          <label>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default MultiSelectDropdown;

