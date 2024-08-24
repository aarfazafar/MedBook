"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import { Card, CardContent } from '../ui/card'
// import Image from 'next/image'
// import { useSession } from 'next-auth/react'
// import { Input } from '../ui/input'
// import { BookImage, Loader2, Plus, UploadCloud, Video } from 'lucide-react'
// import ContentArea from '../Editor/ContentArea'
// import { TypePost } from '@prisma/client'
// import { useToast } from '../ui/use-toast'
// import { useRouter } from 'next/router'
// import { Button } from '../ui/button'
// import axios from 'axios'
// import { upload } from '@/actions/clodinaryUpload'
// import { Textarea } from '../ui/textarea'
// import { TypePost } from '@prisma/client'

import React, {useState} from 'react'
import { Session } from 'next-auth'
import Image from "next/image"
import { SessionProvider, useSession } from "next-auth/react"
import { Input } from "../ui/input"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import prisma from "@/app/lib/db"

type Props = {}


export function NewPost (props: Props) {
  const {data: Session} = useSession();
  return (
    <div className="w-2/4 py-5 rounded-md mx-4 px-4">
      <Card className="p-4">
        <div className="flex items-center space-x-5">
          <Image src={Session?.user?.image ? Session.user?.image : '/'} alt='Image' width={40} height={40} className="rounded-full h-[40px] object-cover object-top"/>
          <Dialog>
            <DialogTrigger className="w-full">
              <Input className="w-full" type="text" placeholder="Write a post..."/>
            </DialogTrigger>
            <DialogContent className="max-w-[800px] max-h-[600px] min-h-[200px] overflow-auto">
                <DialogHeader>
                  <DialogTitle className="my-2 text-xl"></DialogTitle>
                </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  )
}

