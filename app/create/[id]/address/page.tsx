"use client"
import { useState } from "react";
import { CreatioBottomBar } from "@/app/components/CreationBottomBar";
import { useCountries } from "@/app/lib/getCountries";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { createLocation } from "@/app/actions";



export default function AddressRoute({ params }: { params: { id: string } }) {

    const {getAllCountries} = useCountries()
    const [locationValue, setLocationValue] = useState("");

    const LazyMap = dynamic(() => import("@/app/components/Map"), {
      ssr: false,
      loading: () => <Skeleton className="h-[50vh] w-full" />,
    });
    return(
        <>
        <div className="w-3/5 mx-auto">
             <h1 className="text-3xl font-semibold tracking-tight transition-colors mb-10"> 
                where is your home located?</h1>
        </div>

       <form action={createLocation}>
         <input type="hidden" name="homeId" value={params.id}/>
         <input type="hidden" name="countryValue" value={locationValue}/>
          <div className="w-3/5 mx-auto mb-36">
             <div className="mb-5">
                  <Select required onValueChange={(value) => setLocationValue(value)}>
                     <SelectTrigger className="w-full">
                       <SelectValue placeholder="select a country" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                            <SelectLabel>countries</SelectLabel>
                            {getAllCountries().map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                   {item.flag} {item.label} / {item.region}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                     </SelectContent>
                  </Select>
             </div>
             <LazyMap locationValue={locationValue}></LazyMap>
          </div>
          <CreatioBottomBar></CreatioBottomBar>
       </form>

        </>
    )
}


