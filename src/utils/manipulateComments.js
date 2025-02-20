// Function to Get all comments
export const fetchComments = async (videoId, setComments) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/comment/${videoId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(!response.ok) {
            throw new Error('Failed to Fetch Comments');
        }

        const data = await response.json();
        setComments(data.comments);
        // console.log('Response fetched', data);

    } catch (error) {
        console.log("Something Bad Happened while fetching the Comments", error);
    }
}

// Add Comment
export const addComment = async (videoId, user, text, setText, fetchComments, setComments) =>  {
    try {
        if (!videoId || !user?._id || !user?.username || !text) {
            console.error("Missing required fields for adding a comment.");
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/comment`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                videoId: videoId, 
                userId: user._id, 
                username: user.username, 
                text: text 
            })
        })

        if(!response.ok) {
            throw new Error('Failed to Add Comment');
        }

        const data = await response.json();
        setText("");
        fetchComments(videoId, setComments);
        console.log(data.message);
    } catch (error) {
        console.log('Something Bad Happened', error);
    }
}

// Delete Comment
export const deleteComment = async (comment, fetchComments, setComments, videoId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/comment/${comment._id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(!response.ok) {
            throw new Error("Data not Fetched");
        }
        const data = await response.json();
        fetchComments(videoId, setComments)
        console.log('Fetched Data', data);
    } catch (error) {
        console.log('Something Bad Happened');
    }
}


// Function to fetch a single comment's data and Change the editing state
export const handleEditComment = async (commentId, setText, setEditCommentId, setCommentBtn) => {
    setEditCommentId(commentId); // Save the id for later PUT request
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/singlecomment/${commentId}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch comment");
        }

        const data = await response.json();
        // Set the text input to the comment's text so the user can edit it
        setText(data.comment.text);
        // Optionally, you can open the comment input section if it's hidden
        setCommentBtn(true);
    } catch (error) {
        console.log("Something Bad Happened", error);
    }
};

// Using Put request to update comment
export const updateComment = async (editCommentId, fetchComments, videoId, setComments, text, setText, setEditCommentId, setCommentBtn) => {

    if (!editCommentId) {
        console.log("No comment selected for editing");
        return;
    }

    if (text.trim().length === 0) {
        console.log("Comment cannot be empty or whitespace");
        return;
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/comment/${editCommentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({updatedText: text.trim()})
        })

        if(!response.ok) {
            throw new Error('Error while Fetching Data');
        }

        const data = await response.json();
        fetchComments(videoId, setComments);
        setText("");
        setEditCommentId("");
        setCommentBtn(false);
        console.log('Comment Updated');
    } catch (error) {
        console.log("Something Bad Happened while updating Comment", error);
    }
}
