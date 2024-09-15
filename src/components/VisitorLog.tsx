import {ILog}  from '../Types'
import {
    TableCell,
    TableRow,
    
  } from "@/components/ui/table"

  import { Button} from "@/components/ui/button"

interface props {
    visitorLog : ILog,
    index: number
}

export default function VisitorLog({visitorLog, index}: props) {

    return (
        <TableRow >
                <TableCell className="font-medium">{index}</TableCell>
                <TableCell>{visitorLog.name}</TableCell>
                <TableCell>{visitorLog.idNumber}</TableCell>
                <TableCell>{`${visitorLog.business?.name} ${visitorLog.business.location}`}</TableCell> 
                <TableCell>{visitorLog.reason}</TableCell>
                <TableCell>{visitorLog.timeIn}</TableCell>
                <TableCell>{visitorLog.timeOut}</TableCell>
                <TableCell className="text-right">

                    <Button variant="outline" size="sm" className="w-24">
                        <span>sign out visitor</span>       
                        </Button>

                </TableCell>
              </TableRow>
    )


}