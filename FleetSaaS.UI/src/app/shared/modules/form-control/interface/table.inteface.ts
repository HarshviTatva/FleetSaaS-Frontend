import { UserRole } from "../../../utils/enums/common.enum";

export interface TableColumn<T = object> {
  key: Extract<keyof T, string> | 'actions';
  label: string;
  sortable?: boolean;
  canEdit?: (row: T) => boolean;
  canDelete?: (row: T) => boolean;
  canAssignVehicle?:(row:T)=>boolean;
  canCancel?:boolean;
  isLabel?:boolean;
  role?:UserRole[]
}
