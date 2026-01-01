export interface TableColumn<T = any> {
  key: Extract<keyof T, string> | 'actions';
  label: string;
  sortable?: boolean;
  canEdit?: (row: T) => boolean;
  canDelete?: (row: T) => boolean;
  canAssignVehicle?:(row:T)=>boolean;
  isLabel?:boolean;
}
