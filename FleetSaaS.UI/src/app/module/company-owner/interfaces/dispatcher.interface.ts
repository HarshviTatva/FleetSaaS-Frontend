export interface DispatcherResponse {
    dispatcherList:Dispatcher[];
    companyId:string;
    role:string;
}

export interface Dispatcher{
    Id:string;
    UserId:string;
    UserName:string;
    Email:string;
    PhoneNumber:string;
    isActive?:boolean;
    isAct?:string;
}