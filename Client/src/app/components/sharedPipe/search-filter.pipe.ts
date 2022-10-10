import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], filterString:string, name:string): any[] {
    const result:any=[]
   if(!value || filterString=="" || name==""){
    return value
  }
  value.forEach((item:any)=>{
    if(item[name].trim().toLowerCase().includes(filterString)){
      result.push(item)
    }
   })
   return result
 }

}
