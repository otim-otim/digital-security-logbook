'use client'
import { useState, useEffect } from "react";
import { IBusiness, ILog } from "../Types";
import { fetchLogs } from "@/lib/serverActions";
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

    useEffect(() => {
        const fetch = async () => {
            const data  = await fetchLogs()
            if(Array.isArray(data))
                setLogs(data)
        }
        fetch()
    }, [])


    function mapLogs(logs : ILog[]){
        return logs.map((log, index) => <VisitorLog key={log.id} visitorLog={log} index={index} />)
    }

    return (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>ID Number</TableHead>
              <TableHead>Business To Visit</TableHead>
              <TableHead>Visit Purpose</TableHead>
              <TableHead>Time In</TableHead>
              <TableHead>Time Out</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, index) => (
              <VisitorLog key={log.id} visitorLog={log} index={index} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Visits</TableCell>
              <TableCell className="text-right">{logs.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )

}