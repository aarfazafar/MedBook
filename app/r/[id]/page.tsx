import { updateCommunityDescription } from "@/app/actions";
import {CommunityDescForm} from "@/app/components/CommunityDescForm";
import { SaveButton, SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { Textarea } from "@/app/components/ui/textarea";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function getData(name: string) {
  const data = await prisma.subreddit.findUnique({
    where: {
      name: name,
    },
    select: {
      name: true,
      createdAt: true,
      description: true,
      userId: true,
    },
  });
  return data;
}

export default async function communityRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
      <div className="w-[65%] flex flex-col gap-y-5">
        <h1>Community Page</h1>
      </div>
      <div className="w-[35%]">
        <Card>
          <div className="bg-muted p-4 font-semibold">About Community</div>
          <div className="p-4">
            <div className="flex items-center gap-x-3">
              <Image
                src={user?.picture}
                alt="Community image"
                width={60}
                height={60}
                className="rounded-full w-16 h-16"
              />
              <Link href={`r/${data?.name}`} className="font-medium">
                r/{data?.name}
              </Link>
            </div>
            {user?.id === data?.userId ? (
              <CommunityDescForm
                description={data?.description}
                subName={params.id}
              />
            ) : (
              <p className="text-sm font-normal text-secondary-foreground mt-2">
                {data?.description}
              </p>
            )}
            <div className="flex items-baseline gap-x-2 mt-4">
                <p className="text-muted-foreground font-medium">
                    Created:{' '}
                    {new Date(data?.createdAt as Date).toLocaleDateString("en-us", {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </p>
            </div>
            <Separator className="my-5"/>
            <Button asChild className="rounded-full w-full">
                <Link href={user?.id ? `/r/${data?.name}/create` : '/api/auth/login'}>Create Post</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
