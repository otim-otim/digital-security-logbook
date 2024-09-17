'use client'
import { useState, useEffect } from "react";
import { IBusiness, ILog } from "../Types";
import { fetchLogs, fetchBusinessLogs } from "@/lib/serverActions";
import VisitorLog from "./VisitorLog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export default function VisitorLogs() {

    const [logs, setLogs] = useState<ILog[]>([]);
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const role = currentUser?.role


    useEffect(() => {
        const fetch = async () => {
            const data  = role != 'Businessmanager' ? await fetchLogs() : await fetchBusinessLogs(currentUser.businesses[0].id)
            if(Array.isArray(data))
                setLogs(data)
        }
        fetch()
    }, [])


    function mapLogs(logs : ILog[]){
        return logs.map((log, index) => <VisitorLog key={log.id} visitorLog={log} index={index} />)
    }

    return (
        <div>

        <Table className="border  mt-4">
          <TableCaption>A list of your visits</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>ID Number</TableHead>
              { role != 'Businessmanager' ?<TableHead>Business To Visit</TableHead> : null}
              <TableHead>Visit Purpose</TableHead>
              <TableHead>Time In</TableHead>
              <TableHead>Time Out</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, index) => (
              <VisitorLog key={log.id} visitorLog={log} index={index+1} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>Total Visits</TableCell>
              <TableCell className="text-right">{logs.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        </div>
      )

}