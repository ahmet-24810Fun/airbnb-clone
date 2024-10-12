import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db"
import { redirect } from "next/dist/client/components/redirect";
import { NoItems } from "../components/NoItem";
import { ListingCard } from "../components/ListingCard";
import {unstable_noStore as noStore} from "next/cache"


async function getData(userId : string) {
    noStore()
    const data = await prisma.favorite.findMany({
        where: {
            userId: userId
        },
        select: {
            Home: {
                select: {
                   photo: true,
                   id: true,
                   Favorite: true,
                   price: true,
                   country: true,
                   description: true
                }
            }
        }
    })
    return data;
}


export default async function FavoriteRoute() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if (!user)   return redirect("/")
    
    const data = await getData(user.id)

    return (
        <section className="container mx-auto px-5 lg:px-10 mt-10">
           <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>

           {data.length === 0 ? (
            <NoItems title={"you do not have any favorites"} description={"please add favorites there"}/>
           ) : (
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
                {data.map((item) => (
                   <ListingCard 
                   key={item.Home?.id}
                   imagePath={item.Home?.photo as string} 
                   description={item.Home?.description as string} 
                   location={item.Home?.country as string} 
                   price={item.Home?.price as number} 
                   userId={user.id} 
                   isInFavoriteList={item.Home?.Favorite.length as number > 0 ? true : false} 
                   favoriteId={item.Home?.Favorite[0].id as string} 
                   homeId={item.Home?.id as string} 
                   pathName="/favorites"/>
                ))}
            </div>
           )}
        </section>
    )
}