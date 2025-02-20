import Comment from "./Comment";
import { useSignIn } from "../utils/userSignedIn.jsx";
import { useState, useEffect } from "react";
import  { fetchComments, addComment } from "../utils/manipulateComments.js"
import { updateComment } from "../utils/manipulateComments.js";

function CommentsSection({ video, openOptions, setOpenOptions }) {
    const videoId = video._id;
    const { user } = useSignIn();
    const [text, setText] = useState("");
    const [comments, setComments] = useState([]);
    const [commentBtn, setCommentBtn] = useState(false);
    const [editCommentId, setEditCommentId] = useState("");

    // Change Input Text
    function handleChange(e) {
        setText(e.target.value);
    }

    useEffect(() => {
        if (!videoId) return;
        // Fetch all the Comments
        fetchComments(videoId, setComments);     //Load comments when videoId changes.
    }, [videoId]);


    return (
        <div className="rounded-lg flex flex-col gap-2 px-2 pb-10">
            <h2>Comments</h2>
            <div>   
                {/* Input for Comment */}
                <input 
                    value={text}
                    onFocus={() => setCommentBtn(true)}
                    onChange={(e) => handleChange(e)}
                    className="border-b border-b-slate-300 text-sm w-full focus:outline-none" 
                    type="text" 
                    placeholder="Add a Comment..." 
                />

                <div className={`${ commentBtn ? 'flex' : 'hidden' } text-sm justify-end gap-3 p-1`}>
                    {/* Cancel Button */}
                    <button 
                        onClick={() => {
                            setCommentBtn(false);
                            setText("");
                            setEditCommentId("");
                        }} 
                        className="px-4 py-1.5 rounded-2xl bg-slate-200">Cancel
                    </button>
                    {/* Update/ Submit Button */}
                    <button 
                        onClick={() => {
                                if (editCommentId !== "") {
                                    updateComment(editCommentId, fetchComments, videoId, setComments, text, setText, setEditCommentId, setCommentBtn);
                                } else {
                                    addComment(videoId, user, text, setText, fetchComments, setComments);
                                }
                                }} 
                        className="bg-blue-600 text-white px-4 py-1.5 rounded-2xl">
                            {editCommentId !== "" ? "Update" : "Comment"}
                    </button>
                </div>

            </div>

            {/* List of Comments */}
            {comments.map((comment) => (
                <Comment 
                    key={comment._id} 
                    comment={comment} 
                    setText={setText} 
                    setEditCommentId={setEditCommentId} 
                    videoId={videoId} 
                    openOptions={openOptions} 
                    setOpenOptions={setOpenOptions} 
                    setComments={setComments}
                    setCommentBtn={setCommentBtn}
                />
            ))}
        </div>
    );
}

export default CommentsSection;


