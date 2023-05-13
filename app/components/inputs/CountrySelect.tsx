'use client'

import useCountries from "@/app/hooks/useCountries";

import Select from 'react-select'

//type de um país
export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

interface ICountrySelectProps{
  value?: CountrySelectValue;
  onChange: (values: CountrySelectValue) => void;

}

const CountrySelect:React.FC<ICountrySelectProps> = ({onChange,value}) => {

  const {getAll} = useCountries();

  return (
    <div>
      <Select
        placeholder='Anywhere'
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}

        //formatando as opções
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label}, 
              <span className="text-neutral-300 ml-1">
                {option.region}
              </span>
            </div>
          </div>
        )}

        //customização do próprio select
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  );
}
 
export default CountrySelect;