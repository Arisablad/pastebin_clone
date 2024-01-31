"use client"
import { MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useState } from "react";



type CommentProps = {
    username: string;
    commentId: string;
    comment: string;
    pasteId: string;
    handleCommentChange: (newComment: string, id: string) => void
}

const PasteComment = ({ username, commentId, comment, pasteId, handleCommentChange }: CommentProps) => {
    const { data: session } = useSession();
    const [edit, setEdit] = useState(false)


    const handleOnBlur = async (editedComment: string, commentId: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paste/${pasteId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: editedComment,
                commentId: commentId
            })
        })
        setEdit(false)
    }

    return (
        <div className='bg-secondary flex flex-col rounded-md px-2 py-4 shadow-md relative'>
            <div className="flex justify-between">
                <div className=' flex gap-4 py-2'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-user"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></svg>
                    </div>
                    <p>{username}</p>
                </div>
                {session?.user.name === username &&
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Options</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel></DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="cursor-pointer hover:bg-secondary py-2 px-2" onClick={() => { setEdit(true) }}>Edit</div>
                            {/* <div className="cursor-pointer hover:bg-secondary py-2 px-2">Remove</div> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
            {edit ? (
                <textarea className='mt-2 p-2' value={comment} onChange={(event) => handleCommentChange(event.target.value, commentId)} onBlur={(event) => handleOnBlur(event?.target.value, commentId)}>

                </textarea>
            ) :
                <div className=''>
                    {comment}
                </div>
            }

        </div>
    )
}

export default PasteComment