'use server'

import { ILog } from '@/Types';
import {supabase} from './superbaseClient'


export async function storeLog(visitor : ILog){
    const response = await supabase
      .from('logs')
      .insert({
        id_number: visitor.idNumber,
        name: visitor.name,
        reason: visitor.reason,
        finger_print_url: visitor.fingerPrint,
        time_in: visitor.timeIn,
        business_id: visitor.business?.id, 
      });

      return response

}

export async function fetchBusinesses(){
    const { data, error } = await supabase
  .from('businesses')
  .select()
  if(error)
    return 'error fetching businesses'
  return data
}
export async function fetchLogs(){
  const { data, error } = await supabase
  .from("logs")
  .select(`
    id,
    name,
    finger_print_url AS fingerPrint,
    id_number AS idNumber,     
    reason,
    time_in AS timeIn,     
    time_out AS timeOut,    
    
    business:business_id (
      id ,
      name ,
      location 
    )
  `);
  if(error)
    return 'error fetching businesses'
  return data as unknown as ILog[]
}
export async function fetchBusinessLogs(businessId : number){
    const { data, error } = await supabase
  .from('logs')
  .select(`
    id,
    name,
    finger_print_url AS fingerPrint,
    id_number AS idNumber,     
    reason,
    time_in AS timeIn,     
    time_out AS timeOut  
    
   
  `)
  .eq('business_id', businessId)
  if(error)
    return 'error fetching businesses'
  return data as unknown as ILog[]
}




