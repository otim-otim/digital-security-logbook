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
                { visitorLog.business ? <TableCell>{`${visitorLog.business?.name} ${visitorLog.business?.location}`}</TableCell> : null }
                <TableCell>{visitorLog.reason}</TableCell>
                <TableCell>{moment(visitorLog.timeIn).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                <TableCell>{checkout ? moment(checkout).format('YYYY-MM-DD HH:mm:ss') : '' }</TableCell>
                <TableCell className="text-right">

                    {
                        !checkout ? 
                        <Button variant="outline" size="sm" className="w-24 bg-red-900 text-white" onClick={checkOutVisitor}>
                            <span >sign out visitor</span>       
                        </Button>
                        :
                        null
                    }


                </TableCell>
              </TableRow>
    )


}