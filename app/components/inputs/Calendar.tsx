'use client'

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { RangeKeyDict, Range, DateRange } from "react-date-range";

interface ICalendarProps{
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const Calendar:React.FC<ICalendarProps> = ({disabledDates,onChange,value}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction='vertical'
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
}
 
export default Calendar;