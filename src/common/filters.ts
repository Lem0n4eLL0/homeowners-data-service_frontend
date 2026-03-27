import { FilterFunc } from '@/features/Filter';
import { DateRange, Meter, MeterType, Propertie, ServiceStatus } from './commonTypes';
import { ApplicationFull, ApplicationStatus } from '@/api/apiTypes';

export const filterByDateRange = (range: DateRange): FilterFunc<{ createdAt: string }> => {
  return item => {
    const itemTime = new Date(item.createdAt).getTime();
    if (range.from && itemTime <= range.from.getTime()) return false;
    if (range.to && itemTime >= range.to.getTime()) return false;
    return true;
  };
};

export const filterByMeterType = (type: MeterType): FilterFunc<{ type: MeterType }> => {
  return item => {
    return type === item.type;
  };
};

export const filterByPropertyID = <T extends { id: string }>(
  value: T
): FilterFunc<{ property: Propertie }> => {
  return item => {
    return item.property.id === value.id;
  };
};

export const filterByMeterID = <T extends { id: string }>(
  value: T
): FilterFunc<{ meter: Meter }> => {
  return item => {
    return item.meter.id === value.id;
  };
};

export const filterApplicationByStatus = (
  status: ApplicationStatus
): FilterFunc<ApplicationFull> => {
  return item => {
    return item.status === status;
  };
};

export const filterServiceByStatus = (
  status: ServiceStatus
): FilterFunc<{ status: ServiceStatus }> => {
  return item => {
    return item.status === status;
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
