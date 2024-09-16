'use client'
import {useState, useEffect} from 'react'
import {ILog}  from '../Types'
import {
    TableCell,
    TableRow,
    
  } from "@/components/ui/table"

  import { Button} from "@/components/ui/button"
  import { logoutVisitor } from '../lib/serverActions'
import moment from 'moment'

interface props {
    visitorLog : ILog,
    index: number
}

export default function VisitorLog({visitorLog, index}: props) {
    const [checkout, setCheckout] = useState(visitorLog.timeOut)


    useEffect(() => {
        const updateCheckout = async () => {
            await logoutVisitor(visitorLog, checkout)
            
        }
        updateCheckout()
    }, [checkout])

    function checkOutVisitor() {
        setCheckout(moment().format('YYYY-MM-DD HH:mm:ss'))
    }

    return (
        <TableRow >
                <TableCell className="font-medium">{index}</TableCell>
                <TableCell>{visitorLog.name}</TableCell>
                <TableCell>{visitorLog.idNumber}</TableCell>
                <TableCell>{`${visitorLog.business?.name} ${visitorLog.business.location}`}</TableCell> 
                <TableCell>{visitorLog.reason}</TableCell>
                <TableCell>{visitorLog.timeIn}</TableCell>
                <TableCell>{checkout}</TableCell>
                <TableCell className="text-right">

                    {
                        !checkout ? 
                        <Button variant="outline" size="sm" className="w-24 bg-red-700" onClick={checkOutVisitor}>
                            <span>sign out visitor</span>       
                        </Button>
                        :
                        null
                    }


                </TableCell>
              </TableRow>
    )


}