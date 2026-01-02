import { TableColumn } from "../../../shared/modules/form-control/interface/table.inteface";
import { Dispatcher } from "../interfaces/dispatcher.interface";
import { Driver } from "../interfaces/driver.interface";

export const DriverTableColumns: TableColumn<Driver>[] = [
    { key: 'userName', label: 'UserName', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phoneNumber', label: 'Phone Number', sortable: true },
    { key: 'licenseNumber', label: 'License Number', sortable: true },
    { key: 'licenseExpiryDateString', label: 'License Expiry', sortable: true },
    { key: 'isAvail', label: 'Is Available?', sortable: false },
    { key: 'isAct', label: 'Is User Active?', sortable: false },
    {
        key: 'actions', label: 'Actions',
        canEdit: (row: Driver) => true,
        canDelete: (row: Driver) => true,
        canAssignVehicle:(row: Driver) => true
    }
];

export const DispactherTableColumns: TableColumn<Dispatcher>[] = [
    { key: 'userName', label: 'UserName', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phoneNumber', label: 'Phone Number', sortable: true },
    { key: 'isAct', label: 'IsActive?', sortable: true },
    {
        key: 'actions', label: 'Actions',
        canEdit: (row: Dispatcher) => true,
        canDelete: (row: Dispatcher) => true
    }
];