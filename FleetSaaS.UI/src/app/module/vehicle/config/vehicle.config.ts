import { TableColumn } from "../../../shared/modules/form-control/interface/table.inteface";
import { Vehicle } from "../interface/vehicle.interface";

export const VehicleTableColumns:TableColumn<Vehicle>[] = [
    {key: 'make', label: 'Make', sortable: true },
    {key:'model',label : 'Model', sortable:true},
    {key:'year',label:'Year', sortable:true},
    {key:'vin',label:'Vin', sortable:true},
    {key:'insuranceExpiryDateString',label:'Insurance Expiry',sortable:true},
    {key:'licensePlate',label:'License Plate',sortable:true},
    {key:'isAct',label:'Is Active?',sortable:true},
    {key:'actions',label:'Actions'}
];