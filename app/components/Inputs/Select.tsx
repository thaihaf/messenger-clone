"use client";

import React from "react";
import ReactSelect from "react-select";
interface SelectProps {
  label: string;
  disabled?: boolean;
  value?: Record<string, any>;
  options?: Record<string, any>[];
  onChange: (value: Record<string, any>) => void;
}
export default function Select({
  label,
  disabled,
  options,
  onChange,
  value,
}: SelectProps) {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>

      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          classNames={{ control: () => "text-sm" }}
        />
      </div>
    </div>
  );
}
