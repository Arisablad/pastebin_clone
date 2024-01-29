import { Fragment, use, useState } from "react"
import { Button } from "../ui/button"
import PasteComment from "./Comment"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "../ui/use-toast"
import { useSession } from "next-auth/react"

const PasteCommentsList = ({ pasteId }: { pasteId: string }) => {


    const CmntList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]


    const [currentCommentsPage, setCurrentCommentsPage] = useState(1);
    const [commentsPerPage, setCommentsPerPage] = useState(4);
    const [amountOfPages, setAmountOfPages] = useState(Math.ceil(CmntList.length) / commentsPerPage)
    const [comments, setComments] = useState([]);
    const { data: session } = useSession();

    const [comment, setComment] = useState({
        user: session?.user.name || "anonymous",
        message: "",
    });


    const { toast } = useToast();
    const lastPostIndex = currentCommentsPage * commentsPerPage
    const firstPostIndex = lastPostIndex - commentsPerPage


    const currentComments = CmntList.slice(firstPostIndex, lastPostIndex)


    const handleSendComment = () => {
        if (comment.message.trim().length > 5) {
            fetch(`${`${process.env.NEXT_PUBLIC_API_URL}/paste/${pasteId}`}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            })
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



                {currentComments.map(cmnt =>
                    <Fragment key={cmnt}>
                        <PasteComment />
                    </Fragment>

                )}


            </div>



            {/* PAGINATION */}
            <div className="text-green-500 flex justify-center gap-4 mt-12">
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


            {/*WRITE YOUR COMMENT HERE*/}
            < div className='flex items-center gap-4 mt-12' >
                <textarea onChange={(event) => {
                    setComment(prev => ({
                        ...prev,
                        message: event.target.value
                    }))
                }} className='w-full p-4' placeholder='write your comment here'></textarea>
                <Button onClick={handleSendComment} variant={'default'} className='bg-card-foreground text-secondary'>Send</Button>
            </div>

        </div>
    )
}



export default PasteCommentsList