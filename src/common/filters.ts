import { FilterFunc } from '@/features/Filter';
import { DateRange } from './commonTypes';

export const filterByDateRange = <T extends { date: Date }>(range: DateRange): FilterFunc<T> => {
  return item => {
    const itemTime = item.date.getTime();
    if (range.from && itemTime < range.from.getTime()) return false;
    if (range.to && itemTime >= range.to.getTime()) return false;
    return true;
  };
};

// export const unitfilter: FilterFunc<Incident, 'unit'> = (incident, value) => {
//   return value ? incident.unit === value.trim() : true;
// };

// export const typeFilter: FilterFunc<Incident, 'type'> = (incident, value) => {
//   return value ? incident.type === value : true;
// };

// export const statusFilter: FilterFunc<Incident, 'status'> = (incident, value) => {
//   return value ? incident.status === value : true;
// };

// export const descriptionFilter: FilterFunc<Incident, 'description'> = (incident, value) => {
//   return value ? incident.description.toLowerCase().includes(value.trim().toLowerCase()) : true;
// };
