'use client'
import React from 'react'
import {NewPost} from './NewPost'
import { SessionProvider } from 'next-auth/react'
import prisma from '@/app/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/dist/server/api-utils'
import PostComponent from '../Posts/PostComponent'
import PostCreationDialogue from '../Posts/PostCreationDialog'
import { Button } from '../ui/button'
import Link from 'next/link'

type Props = {}

const MiddleComponent = (props: Props) => {
  return (
    <div>
      <SessionProvider>
        <Button className='w-full'>
          <Link href="/r/id/create" className="w-full">Create Post</Link>
        </Button>
      </SessionProvider>
    </div>
  )
}

export default MiddleComponent;