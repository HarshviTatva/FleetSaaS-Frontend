import { NgModule } from "@angular/core";
import { ButtonComponent } from "./form-control/components/button/button.component";
import { InputComponent } from "./form-control/components/input/input.component";
import { SelectComponent } from "./form-control/components/select/select.component";
import { DynamicTableComponent } from "./form-control/components/dynamic-table/dynamic-table.component";
import { ErrorComponent } from "./form-control/components/error/error.component";

@NgModule({
  declarations: [],
  providers:[],
  imports: [
   ButtonComponent,
   InputComponent,
   SelectComponent,
   DynamicTableComponent,
   ErrorComponent
  ],
  exports:[
   ButtonComponent,
   InputComponent,
   SelectComponent,
   DynamicTableComponent,
   ErrorComponent
  ]
})
export class SharedModule { }