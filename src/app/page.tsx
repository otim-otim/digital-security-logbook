import Image from "next/image";
// import VisitorLogin from "@/components/VisitorLogin";
import VisitorLogs from "@/components/VisitorLogs";
import VisitorLogForm from "@/components/VisitorLogForm";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="w-full md:w-5/6 lg:w-2/3  items-center justify-items-center min-h-screen p-auto pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] border m-auto">
      <main className=" items-center sm:items-start">

      <Tabs defaultValue="logs" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="logs">Logs</TabsTrigger>
        <TabsTrigger value="newLog">Log new Visitor</TabsTrigger>
      </TabsList>
      <TabsContent value="logs">
        <VisitorLogs  />
      </TabsContent>
      <TabsContent value="newLog">
      {/* <VisitorLogin  /> */}
      <VisitorLogForm  />
      </TabsContent>
    </Tabs>

        
        

       
       
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>

    
  );
}
