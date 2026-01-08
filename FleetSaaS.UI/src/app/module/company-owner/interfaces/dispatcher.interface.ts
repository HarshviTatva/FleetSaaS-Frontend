export interface DispatcherResponse {
    dispatcherList:Dispatcher[];
    companyId:string;
    role:string;
    totalCount:number;
}

export interface Dispatcher{
    id:string;
    userId:string;
    userName:string;
    email:string;
    phoneNumber:string;
    isActive?:boolean;
    isAct?:string;
}