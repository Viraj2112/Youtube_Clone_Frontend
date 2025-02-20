import { useEffect, useState } from "react";
import { deleteComment, fetchComments, handleEditComment } from "../utils/manipulateComments.js";
import { useSignIn } from "../utils/userSignedIn.jsx";

// Show Comment Section
function Comment({ comment, setText, setEditCommentId, setCommentBtn,  videoId, openOptions, setOpenOptions, setComments }) {

    const { user } = useSignIn();           //Get hold of User info

    return (
        <div className="flex justify-between relative">
            <div>
                {/* Comment Details */}
                <div className="flex gap-2 text-xs font-semibold text-gray-400">
                    <span>{comment.username}</span>
                    <span>•</span>
                    <span>{comment.createdAt.split('T')[0]}</span>
                </div>
                <p className="text-sm">{comment.text}</p>
            </div>

            { user._id === comment.userId && (
                <div>
                {/* 3 Dot Button */}
                <button 
                    onClick={() => setOpenOptions(prev => prev === comment._id ? null : comment._id)}
                    className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-100"
                >
                    <img className="w-4 h-4 rounded-full" src="/images/ellipsis-icon.png" alt="options" />
                </button>

                {/* Options Tab */}
                {openOptions === comment._id && (
                    <div className="px-2 py-1 z-20 text-sm absolute mt-2 right-0 bg-white rounded-md w-20 shadow-md border">
                        {/* Edit Comment Button */}
                        <button 
                            onClick={() => {
                                handleEditComment(comment._id, setText, setEditCommentId, setCommentBtn);
                                setOpenOptions(prev => prev === comment._id ? null : comment._id);
                            }} 
                            className="cursor-pointer hover:bg-gray-100 px-2 py-1">
                                Edit
                        </button>
                        {/* Delete Comment Button */}
                        <button 
                            onClick={() => {
                                deleteComment(comment, fetchComments, setComments, videoId);
                                setOpenOptions(prev => prev === comment._id ? null : comment._id);
                            }} 
                            className="cursor-pointer hover:bg-gray-100 px-2 py-1">
                                Delete
                        </button>
                    </div>
                )}
            </div>
            ) }

        </div>
    );
}

export default Comment;
