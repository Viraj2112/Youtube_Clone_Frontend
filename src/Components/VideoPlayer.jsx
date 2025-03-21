function VideoPlayer({ video, setShowControls, handleTouchStart }) {

    return (
        <div className="flex smooth-transition">
            <iframe 
                className="w-full h-80 sm:h-96 lg:rounded-lg xl:rounded-2xl smooth-transition"
                src={video.videoUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
                // onTouchStart={handleTouchStart} // Mobile Fix
            >
            </iframe>
        </div>
    );
}

export default VideoPlayer;




