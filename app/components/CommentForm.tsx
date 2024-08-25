"use client";

import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { SubmitButton } from "./SubmitButtons";
import { createComment } from "../actions";
import { useRef } from "react";

interface iAppProps {
  postId: string;
}

export function CommentForm({ postId }: iAppProps) {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      className="mx-5 mb-5"
      action={async (formData) => {
        await createComment(formData);
        ref.current?.reset();
      }}
      ref={ref}
    >
      <input type="hidden" name="postId" value={postId} />
      <Label>Comment right here</Label>
      <Textarea
        placeholder="What are your thoughts?"
        className="min-w-80 mt-1 mb-2 ml"
        name="comment"
      />
      <SubmitButton text="Comment"/>
    </form>
  );
}