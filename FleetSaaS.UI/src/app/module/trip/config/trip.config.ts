import { TableColumn } from "../../../shared/modules/form-control/interface/table.inteface";
import { UserRole } from "../../../shared/utils/enums/common.enum";
import { Trip } from "../interface/trip.interface";

export const TripTableColumns:TableColumn<Trip>[] = [
    {key: 'name', label: 'Code', sortable: false },
    {key:'origin',label : 'Origin', sortable:true},
    {key:'destination',label:'Destination', sortable:true},
    {key:'description',label:'Description', sortable:false},
    {key:'scheduledAtString',label:'Scheduled At', sortable:false},
    {key:'statusName',label:'Status',sortable:false, isLabel:true},
    {
        key: 'actions', label: 'Actions',
        canEdit: (row: Trip) => true,
        canAssignVehicle:(row: Trip) => true,
        canCancel:true,
        role:[UserRole.Admin,UserRole.CompanyOwner,UserRole.Dispatcher]
    },
    {
        key: 'actions', label: 'Actions',      
        role:[UserRole.Driver]
    }
];