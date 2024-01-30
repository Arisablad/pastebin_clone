import { Fragment, use, useMemo, useState } from "react"
import { Button } from "../ui/button"
import PasteComment from "./Comment"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "../ui/use-toast"
import { useSession } from "next-auth/react"


type PasteCommentsProps = {
    pasteId: string;
    pasteComments: PasteCommentType[];
}

type PasteCommentType = {
    user: string,
    comment: string
    _id: string
}


const PasteCommentsList = (PasteProps: PasteCommentsProps) => {



    const [currentCommentsPage, setCurrentCommentsPage] = useState(1);
    const [commentsPerPage, setCommentsPerPage] = useState(4);
    const [comments, setComments] = useState(PasteProps.pasteComments || []);
    const [amountOfPages, setAmountOfPages] = useState(0)
    const { data: session } = useSession();

    const [comment, setComment] = useState({
        user: session?.user.name || "anonymous",
        comment: "",
    });


    const { toast } = useToast();
    const lastPostIndex = currentCommentsPage * commentsPerPage
    const firstPostIndex = lastPostIndex - commentsPerPage


    const computePageAmount = useMemo(() => {
        setAmountOfPages(Math.ceil(comments.length / commentsPerPage));
    }, [comments])


    const currentComments = comments.slice(firstPostIndex, lastPostIndex)

    const handleCommentChange = (newComment: string, id: string) => {
        console.log("newComment", newComment)
        const IdOfCommentToChange = comments.find(cmnt => cmnt._id == id)?._id
        setComments(prev => prev.map(element => {
            if (element._id === IdOfCommentToChange) {
                element.comment = newComment
            }
            return element
        }))
    }


    const handleSendComment = async () => {
        if (comment.comment.trim().length > 5) {
            const response = await fetch(`${`${process.env.NEXT_PUBLIC_API_URL}/paste/${PasteProps.pasteId}`}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            })
            if (response.ok && response.status === 201) {
                toast({
                    variant: "default",
                    title: "Success",
                    description: "Comment Successfully added.",
                })
                setComments([...comments, { ...comment, _id: "asaeghahaehahahaeh" }])
                setComment({
                    user: session?.user.name || "anonymous",
                    comment: "",
                })
            }
        }
        else {
            toast(
                {
                    variant: "destructive",
                    title: "Upss something went wrong",
                    description: "Comment need to have at least 5 characters."
                }
            )
        }
    }


    return (
        <div className='rounded-md mt-8 lg:col-span-8 flex flex-col py-2'>
            <h1 className='text-2xl text-center py-4'>Comments</h1>
            {/* COMMENTS LIST */}
            <div className='flex flex-col px-4 gap-2'>


                {currentComments.length > 0 ? currentComments.map((cmnt, _id) =>
                    <Fragment key={_id}>
                        <PasteComment username={cmnt.user} commentId={cmnt._id} comment={cmnt.comment} handleCommentChange={handleCommentChange} />
                    </Fragment>

                ) : <p className="text-secondary/90">No comments yet... Be the first comment</p>}



            </div>



            {/* PAGINATION */}

            {currentComments.length > 0 &&
                <div className="text-green-500 flex flex-col items-center justify-center gap-4 mt-12">
                    <div className="flex">
                        <ChevronLeft className="hover:text-gray-500 cursor-pointer" onClick={() => {
                            if (currentCommentsPage > 1) {
                                setCurrentCommentsPage(prev => prev += -1)
                            }
                        }} />
                        {currentCommentsPage}
                        <ChevronRight className="hover:text-gray-500 cursor-pointer" onClick={() => {
                            if (currentCommentsPage < amountOfPages) {
                                setCurrentCommentsPage(prev => prev += 1)
                            }
                        }} />
                    </div>
                    <div className="">Number of Pages: {amountOfPages}</div>
                </div>
            }



            {/*WRITE YOUR COMMENT HERE*/}
            < div className='flex items-center gap-4 mt-12' >
                <textarea value={comment.comment} onChange={(event) => {
                    setComment(prev => ({
                        ...prev,
                        comment: event.target.value
                    }))
                }} className='w-full p-4 rounded-md' placeholder='write your comment here'></textarea>
                <Button onClick={handleSendComment} variant={'default'} className='bg-card-foreground text-secondary'>Send</Button>
            </div>

        </div>
    )
}



export default PasteCommentsList