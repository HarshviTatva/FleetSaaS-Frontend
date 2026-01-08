import { TableColumn } from "../../../shared/modules/form-control/interface/table.inteface";
import { TripStatus, UserRole } from "../../../shared/utils/enums/common.enum";
import { Trip } from "../interface/trip.interface";

export const TripTableColumns:TableColumn<Trip>[] = [
    {key: 'name', label: 'Code', sortable: false },
    {key:'origin',label : 'Origin', sortable:true},
    {key:'destination',label:'Destination', sortable:true},
    {key:'description',label:'Description', sortable:false},
    {key:'scheduledAtString',label:'Scheduled At', sortable:false},
    {key:'statusName',label:'Status',sortable:false, isLabel:true},
    {key:'distanceCovered',label:'Distance Covered(In Kms.)', sortable:false},
    {
        key: 'actions', label: 'Actions',
        canEdit: (row: Trip) => (row.status!==TripStatus.Started) && !(row.status===TripStatus.Completed),
        canAssignVehicle:(row: Trip) => !(row.status>TripStatus.Accepted),
        canCancel:(row: Trip) => (row.status!==TripStatus.Started) && !(row.status===TripStatus.Completed),
        canDownload:(row:Trip) => ( row.status===TripStatus.Completed),
        roles:[UserRole.Admin,UserRole.CompanyOwner,UserRole.Dispatcher]
    },
     {
        key: 'actions', label: 'Actions',
        canAccept:(row: Trip)=>(row.status===TripStatus.Assigned),
        canStart:(row: Trip)=>(row.status===TripStatus.Accepted),
        canComplete:(row: Trip)=>(row.status===TripStatus.Started),
        roles:[UserRole.Driver]
    },
];

export const TripHistoryTableColumns:TableColumn<Trip>[] = [
    {key: 'name', label: 'Code', sortable: false },
    {key:'origin',label : 'Origin', sortable:true},
    {key:'destination',label:'Destination', sortable:true},
    {key:'description',label:'Description', sortable:false},
    {key:'scheduledAtString',label:'Scheduled At', sortable:false},
    {key:'statusName',label:'Status',sortable:false, isLabel:true},
    {key:'distanceCovered',label:'Distance Covered(In Kms.)', sortable:false},
     {
        key: 'actions', label: 'Actions',
        canDownload:(row:Trip) => (row.status===TripStatus.Cancelled || row.status===TripStatus.Completed),
        roles:[UserRole.Driver]
    },
];

