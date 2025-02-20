import { likeVideo, dislikeVideo } from "../utils/like_dislike.js";
import { useState, useEffect } from "react";
import { useSignIn } from '../utils/userSignedIn.jsx'

function LikeDislikeSection({ video }) {

    const userToken = localStorage.getItem('token');
    const { user } = useSignIn();
    const [likes, setLikes] = useState(video?.likes?.length);
    const [dislikes, setDislikes] = useState(video?.dislikes?.length);
    const [userLiked, setUserLiked] = useState(video.likes.includes(user._id));
    const [userDisliked, setUserDisliked] = useState(video.dislikes.includes(user._id));

    // Function to Like on a video
    const handleLike = async () => {
        const updatedVideo = await likeVideo(video._id, userToken);
        setLikes(updatedVideo.likes.length);
        setDislikes(updatedVideo.dislikes.length);
        setUserLiked(updatedVideo.likes.includes(user._id));
        setUserDisliked(updatedVideo.dislikes.includes(user._id));
    }

    // Function to Dislike a Video
    const handleDislike = async () => {
        const updatedVideo = await dislikeVideo(video._id, userToken);
        setLikes(updatedVideo.likes.length);
        setDislikes(updatedVideo.dislikes.length);
        setUserLiked(updatedVideo.likes.includes(user._id));
        setUserDisliked(updatedVideo.dislikes.includes(user._id));
    };

    return (
        // Like, Dislike buttons
        <div className="w-fit px-2 py-1 flex gap-2 items-center rounded-2xl shadow-md">
            <IconButton src={`/images/${ userLiked ? 'thumbs-up-blue' : 'like-icon' }.png`} alt="Like button" onClick={handleLike} />
            <p className="border-r border-r-slate-300 pr-2 text-xs">{ likes }</p>
            <IconButton src={`/images/${ userDisliked ? 'thumbs-down-blue' : 'dislike-icon' }.png`} alt="Dislike button" onClick={handleDislike} />
        </div>
    );
}

// Custon Button
function IconButton({ src, alt, onClick }) {
    return (
        <button type="button" onClick={onClick} className="w-5 h-5">
            <img className="max-w-full max-h-full object-contain" src={src} alt={alt} />
        </button>
    );
}

export default LikeDislikeSection;
