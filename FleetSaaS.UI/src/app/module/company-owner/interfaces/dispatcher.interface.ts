export interface DispatcherResponse {
    dispatcherList:Dispatcher[];
    companyId:string;
    role:string;
}

export interface Dispatcher{
    Id:string;
    userId:string;
    userName:string;
    email:string;
    phoneNumber:string;
    isActive?:boolean;
    isAct?:string;
}