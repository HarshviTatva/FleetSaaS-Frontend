const SELECT_ALL_OPTION = {
  label: 'Select All',
  value: 0
};

export enum UserRole {
    Admin = 1,
    CompanyOwner = 2,
    Dispatcher = 3,
    Driver = 4
}

export enum TripStatus {
    Planned = 1,
    Assigned = 2,
    Accepted = 3,
    Started = 4,
    Completed = 5,
    Cancelled = 6
}

export enum AuditAction {
    Created = 1,
    Updated = 2,
    Deleted = 3,
    Activated = 4,
    Deactivated = 5,
    Assigned = 6,
    Unassigned = 7
}

export const TripStatusLabelMap: Record<TripStatus, string> = {
  [TripStatus.Planned]: 'Planned',
  [TripStatus.Assigned]: 'Assigned',
  [TripStatus.Accepted]: 'Accepted',
  [TripStatus.Started]: 'Started',
  [TripStatus.Completed]: 'Completed',
  [TripStatus.Cancelled]: 'Cancelled'
};

export const StatusList = [
  SELECT_ALL_OPTION,
  ...Object.values(TripStatus)
    .filter(v => typeof v === 'number')
    .map(status => ({
      label: TripStatusLabelMap[status as TripStatus],
      value: status
    }))
];

export const TripNextStatusMap: Partial<Record<TripStatus, string>> = {
  [TripStatus.Planned]: 'Assign',
  [TripStatus.Assigned]: 'Accept',
  [TripStatus.Accepted]: 'Start',
  [TripStatus.Started]: 'Complete'
};