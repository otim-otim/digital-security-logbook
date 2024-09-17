"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
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

export default  function CreateNewBusiness() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [businesses, setBusineses] = useState<IBusiness[]>([])
  const [visitor, setVisitor] = useState<ILog>({
    id: 0,
    idNumber: '',
    phone: '',
    name: '',
    fingerPrint: '',
    reason: '',
    timeIn: '',
    timeOut: '',
    business: {} as IBusiness,
  });

  const { toast } = useToast()




  useEffect(()=>{
    const updateBusinesses = async () => {
        const data = await fetchBusinesses()
        // console.log("data", data);
        if (Array.isArray(data)) {
            setBusineses(data);
          } else {
            // todo:handle this error appropriately
          }
   
          
        }
        updateBusinesses()
},[])

useEffect(() => {
  const submitVisitorLog = async () => {
    await submitLog();
  };

  // Ensure visitor is valid before submitting
  if (visitor) { 
    submitVisitorLog();
  }
}, [visitor]);

  

  async function submitLog() {
    const {status, statusText } = await storeLog(visitor)

    console.log('submit status',status)

    if (status == 201) {
      setIsLoggedIn(true);
      form.reset()
      toast({
      title: "Visit successfully logged",
      description: "Visit successfully logged",
    })
    } else {
      console.error("Error submitting log:", statusText);
    }
  }

  

  function showLogDetails(){
    if(isLoggedIn)
    return (
        <div>
             <Card className="w-full md:w-3/4 m-auto items-centered">
      <CardHeader>
        <CardTitle>Visit Logged</CardTitle>
        {/* <CardDescription>Log New Vistor</CardDescription> */}
      </CardHeader>
      <CardContent>
            <img src="../images/fingerprintimg.png" className="w-32" alt="finger print"/>
            
            <h2>Name: {visitor.name}</h2>
            <h2>ID Number: {visitor.idNumber}</h2>
            <h2>Office Name: {`${visitor.business.name}, ${visitor.business.location}`}</h2>
            <h2>purpose of visit reason: {`${visitor.reason}`}</h2>
            <h2>phone: {`${visitor.phone}`}</h2>
            <h2>timeIn: {`${visitor.timeIn}`}</h2>

            </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>

        </div>
    )

    return null

  }





  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) { 


      setVisitor({
        idNumber: faker.string.alphanumeric(10),
        name: faker.person.fullName(),
        phone: data.phone,
        fingerPrint: faker.internet.url(),
        reason: data.reason,
        timeIn: moment().format('YYYY-MM-DD HH:mm:ss'),
        timeOut: '',
        business: businesses.find(business => business.id === parseInt(data.business)) || {} as IBusiness,
      })

      
    
  }

  return (
    <div className="grid grid-cols-1  m-0 p-2 ">
        {
            isLoggedIn ? showLogDetails() 
            : 
            
        <div className=" p-4  ">

      

      <Card className="w-3/4 m-auto ">
      <CardHeader>
        <CardTitle>Visitor Login</CardTitle>
        {/* <CardDescription>Log New Vistor</CardDescription> */}
      </CardHeader>
      <CardContent>
        
      
      

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="business"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Establishment</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value ?? ''}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select The Business Place You are visiting" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {businesses.map((business) => (
            <SelectItem key={business.id!} value={business.id!.toString()}  >
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
                <Input placeholder="Reason" {...field} value={field.value ?? ''} />
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
                <Input type="phone" placeholder="Reason" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        
        <Button type="submit" className="w-full">place Finger Print/ID face</Button>
      </form>
    </Form>
    </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
        </div>
        }

       
    </div>
  )
}
