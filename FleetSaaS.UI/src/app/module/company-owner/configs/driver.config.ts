import { TableColumn } from "../../../shared/modules/form-control/interface/table.inteface";

export const DriverTableColumns:TableColumn<any>[] = [
    {key: 'userName', label: 'UserName', sortable: true },
    {key:'email',label : 'Email', sortable:true},
    {key:'phoneNumber',label:'Phone Number', sortable:true},
    {key:'licenseNumber',label:'License Number', sortable:true},
    {key:'licenseExpiryDateString',label:'License Expiry',sortable:true},
    {key:'isAvail',label:'Is Available?',sortable:true},
    {key:'isAct',label:'Is User Active?',sortable:true},
    {key:'actions',label:'Actions'}
];

export const DispactherTableColumns:TableColumn<any>[] = [
    {key: 'userName', label: 'UserName', sortable: true },
    {key:'email',label : 'Email', sortable:true},
    {key:'phoneNumber',label:'Phone Number', sortable:true},
    {key:'isActive',label:'IsActive?',sortable:true},
    {key:'actions',label:'Actions'}
];