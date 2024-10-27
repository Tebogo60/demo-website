jQuery(document).ready(function () {
    const title = $(".title");

    const tracks = $(".tracks");

    const forward = $(".forward");
    const backward = $(".backward");
    const play = $(".play");
    const pause = $(".pause");

    const tracker = $(".track-tracker");
    const volume = $(".volume");

    let isPlaying = false;
    let audio;

    const getCurrentTrack = () => {
        return tracks.children().eq(6);
    };

    const updateTitle = () => {
        title.text(getCurrentTrack().attr("audiourl"));
    };

    const updateTracker = () => {
        const duration = audio.duration;
        const currentTime = audio.currentTime;

        // find percentage of (currentTime/duration * 100) Every Sec!
        const currentPosition = (currentTime / duration) * 100;
        tracker.css("width", currentPosition + "%");
        console.log("duration :>> ", duration);

        if (currentTime === duration) {
            nextTrack();
            updateTitle();
            continuePlaying();
        }
    };

    // initialize audio obj
    const initializeTrack = (url) => {
        audio = new Audio("audio/" + url);
    };

    updateTitle();
    initializeTrack(getCurrentTrack().attr("audiourl"));

    // for playing the active track
    const playTrack = () => {
        pause.addClass("play-active");
        play.removeClass("play-active");

        audio.play();
        isPlaying = true;

        audio.addEventListener("timeupdate", updateTracker);
    };

    // for pausing the active track
    const pauseTrack = () => {
        play.addClass("play-active");
        pause.removeClass("play-active");

        audio.pause();
        isPlaying = false;
    };

    play.click(function (e) {
        e.preventDefault();
        playTrack();
    });

    pause.click(function (e) {
        e.preventDefault();
        pauseTrack();
    });

    // for selecting next track
    const nextTrack = () => {
        tracks.append(tracks.children().eq(0));
    };

    // for selecting previous track
    const previousTrack = () => {
        tracks.prepend(tracks.children().last());
    };

    // play song automatically when back/forward is clicked
    const continuePlaying = () => {
        let wasPlaying = false;
        if (isPlaying) {
            wasPlaying = true;
            pauseTrack();
        }
        initializeTrack(getCurrentTrack().attr("audiourl"));

        if (wasPlaying) {
            playTrack();
        }

        tracker.css("width", "0");
    };

    forward.click(function (e) {
        e.preventDefault();

        nextTrack();
        updateTitle();
        continuePlaying();
    });

    backward.click(function (e) {
        e.preventDefault();

        previousTrack();
        updateTitle();
        continuePlaying();
    });

    const increaseVolume = () => {
        audio.volume += 0.1;
        audio.volume = parseFloat(audio.volume.toFixed(1));
        updateVolumeTracker(audio.volume);
    };

    const decreaseVolume = () => {
        audio.volume -= 0.1;
        audio.volume = parseFloat(audio.volume.toFixed(1));
        updateVolumeTracker(audio.volume);
    };

    const updateVolumeTracker = (volumeValue) => {
        volume.css("height", volumeValue * 100 + "%");
    };

    window.addEventListener("keydown", (e) => {
        const keys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];

        if (keys.includes(e.key)) {
            if (e.key === "ArrowRight") {
                nextTrack();
                updateTitle();
                continuePlaying();
            } else if (e.key === "ArrowLeft") {
                previousTrack();
                updateTitle();
                continuePlaying();
            } else if (e.key === "ArrowUp" && audio.volume < 1) {
                increaseVolume();
            } else if (e.key === "ArrowDown" && audio.volume > 0) {
                decreaseVolume();
            }
        }
    });

    window.addEventListener("wheel", function (e) {
        e.preventDefault();
        if (e.deltaY < 0) {
            increaseVolume();
        } else {
            decreaseVolume();
        }
    });
});
