"use client"
import Image from "next/image";
import logo from "../../../assets/textLogo.svg";
import { Card, CardFooter, CardHeader } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import Link from "next/link";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Text, Video } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Tiptap } from "@/app/components/Tiptap";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/components/UploadThing";
import { useState } from "react";
import { JSONContent } from "@tiptap/react";
import { createPostAction } from "@/app/actions";

const rules = [
  {
    id: 1,
    text: "Adhere to community guidelines",
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    id: 3,
    text: "Lorem ipsum dolor",
  },
  {
    id: 4,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing",
  },
  {
    id: 5,
    text: "Lorem ipsum dolor sit amet",
  },
];
const CreatePost = function ({ params }: { params: { id: string }}) {
  const [imageUrl, setImageUrl] = useState<null | string>(null)
  const [json, setJson] = useState<null | JSONContent>(null)
  const [title, setTitle] = useState<null | string>(null)

  const createPostFunction = createPostAction.bind(null, {
    jsonContent: json,
  })
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
      <div className="w-[65%] flex flex-col gap-y-5">
        <h1>
          Community:{" "}
          <Link href={`/r/${params.id}`} className="text-primary">
            {params.id}
          </Link>
        </h1>{" "}
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="post">
              <Text className="h-4 w-4 mr-2" />
              Post
            </TabsTrigger>
            <TabsTrigger value="image">
              <Video className="h-4 w-4 mr-2" />
              Image & Video
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <Card>
              <form action={createPostFunction}>
                <input type="hidden" value={imageUrl ?? undefined} name="imageUrl"/>
                <input type="hidden" name="subName" value={params.id}/>
                <input type="hidden" name="id" value={params.id}/>
                <CardHeader>
                  <Input required placeholder="Title" name="title" value={title ?? undefined} onChange={(e) => setTitle(e.target.value)}/>
                  <Tiptap setJson={setJson} json={json}/>
                </CardHeader>
                <CardFooter>
                  <SubmitButton text="Create Post" />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="image">
            <Card>
              <CardHeader>
                <UploadDropzone
                  className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary ut-button:ut-uploading:border-primary"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    alert("Successful")
                    console.log(res)
                    setImageUrl(res[0].url)
                  }}
                  onUploadError={(error: Error) => {
                    alert("Something went wrong");
                  }}
                />
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-[35%]">
        Guidelines
        <Card className="flex flex-col p-4">
          <div className="flex items-center gap-x-1">
            <Image className="h-6 w-6" src={logo} alt="pfp" />
            <h4 className="font-sm">Posting to Medbook</h4>
          </div>
          <Separator />
          <div className="flex flex-col gap-y-5 mt-5">
            {rules.map((item) => (
              <div key={item.id}>
                <p className="text-sm font-medium">
                  {item.id}. {item.text}
                </p>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CreatePost
// // import next from "../../../../public/next.svg";
// // import logo from '../../../assets/textLogo.svg'
// import logo from '../../../assets/image.png'
// // import logo from '../../../assets/logo.svg'
// import { Separator } from "@/app/components/ui/separator";
// import prisma from "@/app/lib/db";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { redirect } from "next/navigation";
// import { SubmitButton } from "@/app/components/SubmitButtons";
// import PostComponent from "@/app/components/Posts/PostComponent";
// import { getSession } from "next-auth/react";

// async function getData(userId: string) {
//   const data = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//     select: {
//       userName: true,
//     }
//   })
//   return data
// }
// const createPost = () => {
//   console.log("");

// }
// export default async function CreatePostRoute({params} : {params: {id: string}}) {
//   const { getUser } = getKindeServerSession()
//   const user = await getUser()

//   if (!user) {
//     return redirect("/api/auth/login")
//   }
//   const data = await getData(user?.id)
//   return (

//     <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
//       <div className="w-[65%] flex flex-col gap-y-5">
//         <h4 className="font-semibold px-4">
//           Subreddit:{" "}
//           {/* <Link href="/" className="w-full">{username}</Link> */}
//           {data?.userName}
//         </h4>

//         <PostComponent initialUser={data} />

//       </div>
//       <div className="w-[35%]">Guidelines

//         <Card className="flex flex-col p-4">
//           <div className="flex items-center gap-x-2">
//             <Image className="h-11 w-11" src={logo} alt="pfp" />
//             <h4 className="font-sm">Posting to Medbook</h4>

//           </div>
//           <Separator />
//           <div className="flex flex-col gap-y-5 mt-5">
//             {rules.map((item) => (
//               <div key={item.id}>
//                 <p className="text-sm font-medium">
//                   {item.id}. {item.text}
//                 </p>
//                 <Separator className="mt-2" />
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export async function Page() {
//   const session = await getSession();

//   return {
//     props: {
//       session, // Pass session to the page component as a prop
//     },
//   }
// }
