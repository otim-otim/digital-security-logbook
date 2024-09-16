'use client'
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




export default function VisitorLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<IBusiness | null>(null);
  const [businesses, setBusineses] = useState<IBusiness[]>([])

  const [visitor, setVisitor] = useState<ILog>({
    id: 0,
    phone:'',
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

  return (
    <div>
      <h1>Visitor Login</h1>
      <div className=" col-lg-7 col-md-6 bg-red-500">
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

      {/* <VisitorLogForm /> */}
    </div>
  );
}
