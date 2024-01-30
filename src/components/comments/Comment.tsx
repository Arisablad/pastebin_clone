"use client"
import { MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useState } from "react";

const PasteComment = ({ username, commentId, comment, handleCommentChange }: { username: string, commentId: string, comment: string, handleCommentChange: (newComment: string, id: string) => void }) => {
    const { data: session } = useSession();
    const [edit, setEdit] = useState(false)

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
                            <div className="cursor-pointer hover:bg-secondary py-2" onClick={() => { setEdit(true) }}>Edit</div>
                            <div>Remove</div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
            {edit ? (
                <textarea className='' value={comment} onChange={(event) => handleCommentChange(event.target.value, commentId)} onBlur={() => { setEdit(false) }}>

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