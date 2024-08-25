import { Card } from "./components/ui/card";
import Image from "next/image";
// import Banner from "../public/banner.png";
import image from './assets/image.png'

import HelloImage from "./assets/image.png";
import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";
import Link from "next/link";
// import { CreatePostCard } from "./components/CreatePostCard";
import prisma from "./lib/db";
import { PostCard } from "./components/PostCard";
import { Suspense } from "react";
import { SuspenseCard } from "./components/SuspenseCard";
import Pagination from "./components/Pagination";
import { unstable_noStore as noStore } from "next/cache";
import MiddleComponent from "./components/Middle/MiddleComponent";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

async function getData(searchParam: string) {
  noStore();
  const [count, data] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({
      take: 10,
      skip: searchParam ? (Number(searchParam) - 1) * 10 : 0,
      select: {
        title: true,
        createdAt: true,
        textContent: true,
        id: true,
        imageString: true,
        comments: {
          select: {
            id: true,
          },
        },
        User: {
          select: {
            userName: true,
          },
        },
        subName: true,
        votes: {
          select: {
            userId: true,
            voteType: true,
            postId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return { data, count };
}

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10">
      <div className="w-[65%] flex flex-col gap-y-5">
        <MiddleComponent/>
        <Suspense fallback={<SuspenseCard />} key={searchParams.page}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>
      <div className="w-[35%]">
        <Card>
          <div className="p-2">
            <div className="flex items-center justify-center gap-3">
              <Image src={image} alt="Banner" className=" h-14 w-14 rounded-full"/>
              {/* <Image
                src={HelloImage}
                alt="Hello Image"
                className="w-10 h-1 -mt-6"
              /> */}
              <h1 className="font-medium">Medbook</h1>
            </div>
            <p className="text-sm text-muted-foreground pt-2 mx-7">
              Welcome to Your Home Page. Come here to check in with your
              favorite communities!
            </p>
            <Separator className="my-5" />

            <div className="flex flex-col gap-y-3">
              <Button asChild variant="secondary">
                <Link href="/r/fourth/create">Create Post</Link>
              </Button>
              <Button asChild>
                <Link href="/r/create">Create Community</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

async function ShowItems({ searchParams }: { searchParams: { page: string } }) {
  const { count, data } = await getData(searchParams.page);
  return (
    <>
      {data.map((post) => (
        <PostCard
          id={post.id}
          imageString={post.imageString}
          jsonContent={post.textContent}
          subName={post.subName as string}
          title={post.title}
          key={post.id}
          commentAmount={post.comments.length}
          userName={post.User?.userName as string}
          voteCount={post.votes.reduce((acc, vote) => {
            if (vote.voteType === "UP") return acc + 1;
            if (vote.voteType === "DOWN") return acc - 1;

            return acc;
          }, 0)}
        />
      ))}

      <Pagination totalPages={Math.ceil(count / 10)} />
    </>
  );
}
// export async function Page( ) {
//   const session = await getSession();

//   return {
//     props: {
//       session, // Pass session to the page component as a prop
//     },
// }
// }

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      props: {
        session
      }
    </SessionProvider>
  );
}