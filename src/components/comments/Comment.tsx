const PasteComment = ({ username, comment }: { username: string, comment: string }) => {
    return (
        <div className='bg-secondary flex flex-col rounded-md px-2 py-4 shadow-md'>
            <div className=' flex gap-4 py-2'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-user"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></svg>
                </div>
                <p>{username}</p>
            </div>
            <div className=''>
                {comment}
            </div>
        </div>
    )
}

export default PasteComment