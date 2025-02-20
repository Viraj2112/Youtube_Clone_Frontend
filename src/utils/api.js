// Fetch all the videos from the Database.
export async function fetchVideosData(jwtToken) {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/videos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Pass the JWT token in the Authorization header
        'Authorization': `Bearer ${jwtToken}`,
      },
    });
  
    // Check if the response is not ok, then throw an error
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Failed to fetch videos');
    }
  
    // Parse and return the JSON data
    const data = await response.json();
    return data;
}

// Fucntion to delete a video
export const deleteVideo = async (videoId, setVideos) => {
  try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/videos/${videoId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })

      if(!response.ok) throw new Error("Failed to Fetch");
      const data = await response.json();
      setVideos(prevVideos => prevVideos.filter(video => video._id !== videoId));
      console.log(data);
  } catch (error) {
      console.log('Fetch was Failed, Video Not deleted');
  }
}

// Fetch all the videos Uploaded by the user on a Specific Channel
export const fetchVideos = async (user, setVideos, setChannel) => {
  if (!user?._id) return;         //Ensure User is Logged In
  try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/videos/by-user/${user._id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      if(!response.ok) throw new Error("Failed to Fetch Videos");

      const data = await response.json();
      setVideos(data.videos);
      setChannel(data.channel);

  } catch (error) {
      console.log("Channel Data was not Fetched", error)
  }
}

// Check if User has a channel
export const checkUserChannel = async (user, setHasChannel) => {
  if (!user?._id) return; // Ensure user is logged in

  try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/checkUserChannel/${user._id}`);
      const data = await response.json();
      setHasChannel(data.hasChannel);
  } catch (error) {
      console.error("Error checking channel:", error);
  }
}