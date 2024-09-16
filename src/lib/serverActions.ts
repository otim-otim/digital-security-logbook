'use server'

import { ILog } from '@/Types';
import {supabase} from './superbaseClient'
import moment from 'moment'


export async function storeLog(visitor : ILog){
    const response = await supabase
      .from('logs')
      .insert({
        idNumber: visitor.idNumber,
        name: visitor.name,
        reason: visitor.reason,
        fingerPrint: visitor.fingerPrint,
        timeIn: visitor.timeIn,
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
    phone,
     fingerPrint,
    idNumber,     
    reason,
    timeIn,     
    timeOut,    
    
    business:business_id (
      id ,
      name ,
      location 
    )
  `);
  if(error)
    return error.message
  return data as unknown as ILog[]
}
export async function fetchBusinessLogs(businessId : number){
    const { data, error } = await supabase
  .from('logs')
  .select(`
    id,
    name,
    phone,
    fingerPrint,
    idNumber,     
    reason,
    timeIn,     
    timeOut  
    
   
  `)
  .eq('business_id', businessId)
  if(error)
    return 'error fetching businesses'
  return data as unknown as ILog[]
}

export async function logoutVisitor(visitor : ILog, checkout: string){
  const { status, statusText } = await supabase
  .from('logs')
  .update({timeOut: checkout})   
  .eq('id', visitor.id);

  if(status == 204)
    return 'updated'
  return statusText

}




