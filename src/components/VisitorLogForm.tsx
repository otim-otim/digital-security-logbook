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
  FormDescription,
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
import { useState, useEffect } from "react";
import { IBusiness, ILog } from "../Types";
import { faker } from '@faker-js/faker';
import moment from 'moment';
import {fetchBusinesses, storeLog} from '../lib/serverActions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
})

export default  function VisitorLogForm() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<IBusiness | null>(null);
  const [businesses, setBusineses] = useState<IBusiness[]>([])

  const [visitor, setVisitor] = useState<ILog>({
    id: 0,
    idNumber: '',
    name: '',
    fingerPrint: '',
    reason: '',
    timeIn: '',
    timeOut: '',
    business: {} as IBusiness,
  });


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

  function getFingerprintOrIDFace() {
    setVisitor((prevVisitor) => ({
      ...prevVisitor,
      idNumber: faker.string.alphanumeric(10),
      name: faker.person.fullName(),
      fingerPrint: faker.internet.url(),
      reason: 'visit',
      timeIn: moment().format('YYYY-MM-DD HH:mm:ss'),
      business: selectedBusiness || {} as IBusiness, // Set the selected business
    }));
  }

  async function submitLog() {
    const {status, statusText } = await storeLog(visitor)

    if (status == 201) {
      setIsLoggedIn(true);
    } else {
      console.error("Error submitting log:", statusText);
    }
  }

  function populateBusinesses() {
    return (
      <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger className="btn btn-primary">
          Select a Business
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {businesses.map((business) => (
            <DropdownMenuItem key={business.id} onClick={() => setSelectedBusiness(business)}>
              {business.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      

          

      </div>
    )
  }

  function showLogDetails(){
    if(visitor && isLoggedIn)
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 m-0 p-2 border border-red-700">
        <div className="border-r pr-4">

      <h1>Visitor Login</h1>
      <div className="  bg-red-500">
        {/* Conditional Rendering */}
        {!selectedBusiness  ? (
          populateBusinesses() // Render this if no business is selected
        ) : (
          <button
            className="btn btn-primary"
            onMouseOver={getFingerprintOrIDFace}
            onMouseOut={submitLog}
          >
            Put Fingerprint or ID Face
          </button>
        )}
      </div>
      {isLoggedIn && <p>Visitor has been logged in successfully!</p>}

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {

                    }
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
        </div>
    </div>
  )
}
