"use client";

import { useFormState } from "react-dom";
import { updateCommunityDescription } from "../actions";
import { SaveButton } from "./SubmitButtons";
import { Textarea } from "./ui/textarea";
import { useEffect } from "react";
import { useToast } from "./ui/use-toast";

interface iAppProps{
    subName: string,
    description: string | null | undefined;
}
const initialState = {
    message: '',
    status: ''
}
export function CommunityDescForm({description, subName}: iAppProps) {
  const [state, formAction] = useFormState(updateCommunityDescription, initialState);
  const {toast} = useToast();
  useEffect(() => {
    if(state.status === 'green'){
        toast({
            title: "Success",
            description: state.message
        })
    } else if(state.status === 'error'){
        toast({
            title: "Failed",
            description: state.message,
            variant: 'destructive'
        })
    }
  }, [state, toast])
  return(
    <form action={formAction} className="mt-3">
    <input type="hidden" name="subName" value={subName} />
    <Textarea
      placeholder="Add a description to your community"
      maxLength={100}
      name="description"
      defaultValue={description ?? undefined}
    />
    <SaveButton />
    </form>
  )
}
