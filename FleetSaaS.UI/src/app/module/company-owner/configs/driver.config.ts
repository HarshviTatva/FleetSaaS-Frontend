import { TableColumn } from "../../../shared/modules/form-control/interface/table.inteface";
import { Dispatcher } from "../interfaces/dispatcher.interface";
import { Driver } from "../interfaces/driver.interface";
import { UserRequest } from "../interfaces/user-account.interface";

export const DriverTableColumns: TableColumn<any>[] = [
    { key: 'userName', label: 'UserName', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phoneNumber', label: 'Phone Number', sortable: true },
    { key: 'licenseNumber', label: 'License Number', sortable: true },
    { key: 'licenseExpiryDateString', label: 'License Expiry', sortable: true },
    { key: 'isAvail', label: 'Is Available?', sortable: true },
    { key: 'isAct', label: 'Is User Active?', sortable: true },
    {
        key: 'actions', label: 'Actions',
        canEdit: (row: Driver) => true,
        canDelete: (row: Driver) => true,
        canAssignVehicle:(row: Driver) => true
    }
];

export const DispactherTableColumns: TableColumn<any>[] = [
    { key: 'userName', label: 'UserName', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phoneNumber', label: 'Phone Number', sortable: true },
    { key: 'isActive', label: 'IsActive?', sortable: true },
    {
        key: 'actions', label: 'Actions',
        canEdit: (row: Dispatcher) => true,
        canDelete: (row: Dispatcher) => true
    }
];