import textLogo from '../assets/textLogo.svg'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { ThemeToggle } from './ThemeToggle'
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { teardownHeapProfiler } from 'next/dist/build/swc'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import UserDropdown from './UserDropdown'
import { redirect } from 'next/navigation'
import prisma from '../lib/db'
async function getData(userId: string) {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
        userName: ''
      },
      select: {
        userName: true,
      }
    })
    return data
  }

export async function Navbar(){
    const {getUser} = getKindeServerSession();
    const user = await getUser()
    if(!user) {
        return redirect("/api/auth/login")
    }
    const data = await getData(user?.id)
    console.log(data?.userName)
    return(
        <nav className="h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between">
            <Link href="/" className='flex gap-x-4 items-center'>
                {/* <Image src={logo} alt="logo" className='h-10 w-fit'/> */}
                <Image src={textLogo} alt='logo' className='h-9 w-fit mt-4'/>
            </Link>
            <div className="flex items-center gap-4">
                <ThemeToggle/>
                {user ? (
                    // <Button>Logout</Button>
                    <UserDropdown userImage={user?.picture} username={data?.userName}/>
                ) : (
                    <div className="flex items-center gap-x-4">
                        <Button variant="secondary" asChild>
                        <RegisterLink>Sign up</RegisterLink>
                        </Button>
                        <Button asChild>
                            <LoginLink>Login</LoginLink>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    )
}