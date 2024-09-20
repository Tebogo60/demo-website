jQuery(document).ready(function () {
    const title = $(".title");

    const body = $(".body");
    const playlist = $(".playlist");
    const openPlayList = $(".open_playlist");
    const tracks = $(".tracks");

    const forward = $(".forward");
    const backward = $(".backward");
    const play = $(".play");
    const pause = $(".pause");

    const tracker = $(".tracker");

    let isPlaying = false;
    let audio;

    const getCurrentTrack = () => {
        return tracks.children().eq(6);
    };

    const updateTitle = () => {
        title.text(getCurrentTrack().attr("audiourl"));
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

    tracker.slider({
        range: "min",
        min: 0,
        max: 10,
        start: function (event, ui) {},
        slide: function (event, ui) {
            audio.currentTime = ui.value;
        },
        stop: function (event, ui) {},
    });
});
