import { Card } from "../components/ui/card";
import image from '../assets/image.png'
import { ArrowDown, ArrowUp, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CopyLink } from "./CopyLink";
import { handleVote } from "../actions";
import { DownVote, UpVote } from "./SubmitButtons";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { RenderToJson } from "./RendertoJson";

interface iAppProps {
  title: string;
  jsonContent: any;
  id: string;
  subName: string;
  userName: string;
  imageString: string | null;
  voteCount: number;
  commentAmount: number;
}

export async function PostCard({
  id,
  imageString,
  jsonContent,
  subName,
  title,
  userName,
  voteCount,
  commentAmount,
}: iAppProps) {
  const {getUser} = getKindeServerSession();
  const user = await getUser();

  return (
    <Card className="flex relative overflow-hidden">
      <div className="flex flex-col items-center gap-y-2 bg-muted p-2">
        <form action={handleVote}>
          <input type="hidden" name="voteDirection" value="UP" />
          <input type="hidden" name="postId" value={id} />
          <UpVote />
        </form>
        {voteCount}
        <form action={handleVote}>
          <input type="hidden" name="voteDirection" value="DOWN" />
          <input type="hidden" name="postId" value={id} />
          <DownVote />
        </form>
      </div>

      <div>
        <div className="flex items-center gap-x-2 p-2">
          <Link className="font-semibold text-xs" href={`/r/${subName}`}>
            r/{subName}
          </Link>
          <p className="text-xs text-muted-foreground">
            Posted by: <span className="hover:text-primary">{`/u${user?.given_name}`}</span>
          </p>
        </div>

        <div className="px-2">
          <Link href={`/post/${id}`}>
            <h1 className="font-medium mt-1 text-lg">{title}</h1>
          </Link>
        </div>

        <div className="max-h-[300px] overflow-hidden">
          {/* {imageString ? ( */}
          {imageString? (
            <Image
              src={imageString || image}
              // src={image}
              alt="Post Image"
              width={600}
              height={300}
              className="w-full h-full"
            />
          ) :
          undefined}
          {/* )  */}
          {/* : (
            <RenderToJson data={jsonContent} />
          )} */}
        </div>

        <div className="m-3 flex items-center gap-x-5">
          <div className="flex items-center gap-x-1">
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
            <p className="text-muted-foreground font-medium text-xs">
              {commentAmount} Comments
            </p>
          </div>

          <CopyLink id={id} />
        </div>
      </div>
    </Card>
  );
}