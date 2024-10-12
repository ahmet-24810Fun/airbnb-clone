import Image from 'next/image'
import  Link  from "next/link";
import DesktopLogo from "../../public/airbnb-desktop.png";
import MobileLogo from '../../public/airbnb-mobile.webp'
import { UserNav } from './UserNav';
import { SearchModalComponent } from './SearchComponent';


export function Navbar() {
    return (

      <nav className="w-full border-b">
          <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
            <Link href="/">
             
            <Image src={DesktopLogo} alt='Desktop logo' className='hidden lg:block w-32' /> {/* Masaüstü logo: geniş ekranlar için */}
            <Image src={MobileLogo} alt='Mobile logo' className='block lg:hidden w-12' /> {/* Mobil logo: küçük ekranlar için */}


            </Link>

             

             <SearchModalComponent/>

             <UserNav></UserNav>
          </div>
           
      </nav>
    )
}