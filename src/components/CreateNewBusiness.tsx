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
import { IBusiness,  } from "../Types";
import { faker } from '@faker-js/faker';
import moment from 'moment';
import { storeBusiness} from '../lib/serverActions'
import { Input } from "@/components/ui/input"


const FormSchema = z.object({
  name: z.string({
        required_error: "Reason must be at least 2 characters.",
        invalid_type_error: "Reason must be a string",
      }) ,
  location: z.string({
        required_error: "The location of the business in the building is required",
        invalid_type_error: "location must be a string",
      }) ,

  


})

const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const role =  currentUser?.role



export default  function CreateNewBusiness() {


    const [business, setBusiness] = useState({})

  const { toast } = useToast()









useEffect(() => {
  const submitNewBusiness = async () => {
    await submitBusiness();
  };

  // Ensure visitor is valid before submitting
  if (business) { 
    submitNewBusiness();
  }
}, [business]);

  

  async function submitBusiness() {
    const {status, statusText } = await storeBusiness(busines)


    if (status == 201) {
      form.reset()
      toast({
      title: "Success",
      description: "Business successfully created",
    })
    } else {
      console.error("Error submitting log:", statusText);
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) { 


      setBusiness({
        name: data.name,
        location: data.location,
        user_id: currentUser.id,
      })

      
    
  }

  return (
    <div className="grid grid-cols-1  m-0 p-2 ">
       
            
        <div className=" p-4  ">

      

      <Card className="w-3/4 m-auto ">
      <CardHeader>
        <CardTitle>Create New Business</CardTitle>
        {/* <CardDescription>Log New Vistor</CardDescription> */}
      </CardHeader>
      <CardContent>
        
      
      

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Names</FormLabel>
              <FormControl>
                <Input placeholder="Names" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Building Location</FormLabel>
              <FormControl>
                <Input  {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        
        <Button type="submit" className="w-full">Create</Button>
      </form>
    </Form>
    </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
        </div>
        

       
    </div>
  )
}
