"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useState, useEffect } from "react";
import { IBusiness, ILog } from "../Types";
import { faker } from '@faker-js/faker';
import moment from 'moment';
import {fetchBusinesses, storeLog} from '../lib/serverActions'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


const FormSchema = z.object({
  business: z.string(),
  reason: z.string({
        required_error: "Reason must be at least 2 characters.",
        invalid_type_error: "Reason must be a string",
      }) ,
phone: z.string({
    required_error: "A phone number is required.",
        invalid_type_error: "A valid phone number is required.",
})
  


})

export default  function VisitorLogForm() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [businesses, setBusineses] = useState<IBusiness[]>([])




  useEffect(()=>{
    const updateBusinesses = async () => {
        const data = await fetchBusinesses()
        // console.log("data", data);
        if (Array.isArray(data)) {
            setBusineses(data);
          } else {
            // setBusineses([]);
            // console.error("data error:", data);
          }
   
          
        }
        updateBusinesses()
},[])

  

  async function submitLog(visitor : ILog) {
    const {status, statusText } = await storeLog(visitor)

    console.log('submit status',status)

    if (status == 201) {
      setIsLoggedIn(true);
      form.reset()
    } else {
      console.error("Error submitting log:", statusText);
    }
  }

  

  function showLogDetails(){
    if(isLoggedIn)
    return (
        <div>
            <img src="../../public/images/fingerprintimg.png" />
            
            <h2>Name: visitor.name</h2>
            <h2>ID Number: visitor.idNumber</h2>
            <h2>ID Number: visitor.idNumber</h2>

        </div>
    )

    return null

  }





  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    

    

    const visitor: ILog = {
        idNumber: faker.string.alphanumeric(10),
        name: faker.person.fullName(),
        fingerPrint: faker.internet.url(),
        reason: data.reason,
        timeIn: moment().format('YYYY-MM-DD HH:mm:ss'),
        timeOut: '',
        business: businesses.find(business => business.id === parseInt(data.business)) || {} as IBusiness,
      };

    //   console.log('form data', visitor)

      await submitLog(visitor)
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 m-0 p-2 border border-red-700">
        <div className="border-r p-4  ">

      <h1 className=" m-auto items-centered">Visitor Login</h1>
      
      

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="business"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Establishment</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select The Business Place You are visiting" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {businesses.map((business) => (
            <SelectItem key={business.id} value={business.id.toString()}  >
              {business.name}
            </SelectItem>
          ))}
                  
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>




          )}

          
        />

<FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Visit</FormLabel>
              <FormControl>
                <Input placeholder="Reason" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Contact</FormLabel>
              <FormControl>
                <Input type="phone" placeholder="Reason" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        
        <Button type="submit" className="w-full">place Finger Print/ID face</Button>
      </form>
    </Form>
        </div>
    </div>
  )
}
