import { TableColumn } from "../../../shared/modules/form-control/interface/table.inteface";
import { Trip } from "../interface/trip.interface";

export const TripTableColumns:TableColumn<Trip>[] = [
    {key: 'name', label: 'Name', sortable: false },
    {key:'origin',label : 'Origin', sortable:true},
    {key:'destination',label:'Destination', sortable:true},
    {key:'description',label:'Description', sortable:true},
    {key:'scheduledAtString',label:'Scheduled At', sortable:false},
    {key:'statusName',label:'Status',sortable:true, isLabel:true},
    {
        key: 'actions', label: 'Actions',
        canEdit: (row: Trip) => true,
        canDelete: (row: Trip) => false
    }
];