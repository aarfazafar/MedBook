import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import {LogoutLink} from '@kinde-oss/kinde-auth-nextjs/components'
import { Separator } from "./ui/separator";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface props{
    userImage: string | null;
    username?: string | null;
}
export default async function({userImage, username}: props){
    // const {getUser} = getKindeServerSession();
    // const user = await getUser()
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex gap-x-3 items-center">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5"/>
                    <img 
                        src={userImage ?? "https://th.bing.com/th/id/OIP.PoS7waY4-VeqgNuBSxVUogAAAA?rs=1&pid=ImgDetMain"} 
                        alt="avatar" 
                        className="rounded-full w-8 h-8 hidden lg:block"
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem className="w-full">
                    <Link href="/" className="w-full">{username}</Link>
                </DropdownMenuItem>
                  <Separator className="my-4" />
                <DropdownMenuItem className="w-full">
                    <Link href="/" className="w-full">View Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/" className="w-full">Change Avatar</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/r/create" className="w-full">Create Community</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/r/id/create" className="w-full">Create Post</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/settings" className="w-full">Settings</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <LogoutLink className="w-full">Logout</LogoutLink>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}