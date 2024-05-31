
import { Controller } from 'react-hook-form';
import './radioButtonSelect.css';
import React from 'react';

interface RadioButtonSelectProps  {
  name: string;
  options: string[],
  checkedValue: string,
  changeValue: (name: string) => Promise<void>;
  control?: any;
};

const RadioButtonSelect:React.FC<RadioButtonSelectProps> = ({
  name,
  options,
  checkedValue,
  control,
  changeValue

}) => {

return (
  <Controller
    control={control}
    name={name}
    render={({ field }) => {
      const { onChange } = field;
      return (
        <div className="container">
          <div className="tabs">
              {options.map((item:string, index) => 
                  { return (
                    <>
                        <input type="radio"
                          key={index}
                          onChange={ (event) =>  {
                            onChange(event.target.defaultValue);
                            changeValue(name)
                          }}
                          id={`radio-${index}`}
                          name='tabs'
                          checked={item===checkedValue}
                          value={item}
                        />
                        <label key={index+1} className="tab" htmlFor={`radio-${index}`}>{item}</label>
                    </>
                  )}
              )}
            <span className="glider" ></span>
          </div>
        </div>
      )}}
  />
)}

export default RadioButtonSelect;


