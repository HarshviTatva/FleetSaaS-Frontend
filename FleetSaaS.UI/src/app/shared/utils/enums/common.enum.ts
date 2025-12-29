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