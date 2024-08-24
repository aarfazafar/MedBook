'use client'
import React from 'react'
import {NewPost} from './NewPost'
import { SessionProvider } from 'next-auth/react'
import prisma from '@/app/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/dist/server/api-utils'

type Props = {}

const MiddleComponent = (props: Props) => {
  return (
    <div>
      <SessionProvider>
        <NewPost/>
      </SessionProvider>
    </div>
  )
}

export default MiddleComponent;