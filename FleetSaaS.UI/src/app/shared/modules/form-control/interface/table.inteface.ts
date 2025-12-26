export interface TableColumn<T = any> {
  key: Extract<keyof T, string> | 'actions';
  label: string;
  sortable?: boolean;
}
