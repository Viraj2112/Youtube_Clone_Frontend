// Like a Video
export async function likeVideo(videoId, token) {
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/like/${videoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;                        //Returning Data
        
    } catch (error) {
        console.log("Fetch was not Done", error)
    }
}

// Dislike a Video
export async function dislikeVideo(videoId, token) {
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/dislike/${videoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        const data = await response.json();
        // console.log(data);
        return data;                            //Returning Data

    } catch (error) {
        console.log("Fetch was not Done", error)
    }
}