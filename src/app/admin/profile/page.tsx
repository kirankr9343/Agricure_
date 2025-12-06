
'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

  
  export default function Page() {

    return (
      <div>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div className="font-bold text-2xl">Profile and Settings</div>
          </div>
          <div
            className="rounded-lg border shadow-sm p-5 w-1/2"
            x-chunk="dashboard-01-chunk-4"
          >
            <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
                <img src="https://github.com/shadcn.png" className="w-20 h-20 rounded-full"/>
                <div>
                    <Label>Profile Picture</Label>
                    <div className="flex gap-5 mt-2">
                    <Input type="file"/>
                    <Button>Upload</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label>Name</Label>
                <Input defaultValue={'Ram'}/>
            </div>
            <div className="flex flex-col gap-2">
                <Label>Email</Label>
                <Input defaultValue={'ram@gmail.com'}/>
            </div>
            <div className="flex flex-col gap-2">
                <Label>Phone Number</Label>
                <Input defaultValue={'9876543210'}/>
            </div>
            <Button className="w-fit">Save</Button>
            </div>
          </div>
        </main>
    </div>
    )}

