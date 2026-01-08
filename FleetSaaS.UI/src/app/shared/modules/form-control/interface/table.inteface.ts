import { UserRole } from "../../../utils/enums/common.enum";

export interface TableColumn<T = object> {
  key: Extract<keyof T, string> | 'actions';
  label: string;
  sortable?: boolean;
  canEdit?: (row: T) => boolean;
  canDelete?: (row: T) => boolean;
  canAssignVehicle?:(row:T)=>boolean;
  canCancel?:(row:T)=>boolean;
  canAccept?:(row:T)=>boolean;
  canStart?:(row:T)=>boolean;
  canComplete?:(row:T)=>boolean;
  canDownload?:(row:T)=>boolean;
  isLabel?:boolean;
  roles?:UserRole[];
}
