let settings = {
    songRefreshRate: {
        value: 2,
        min: 0.5,
        max: 10,
        title: "Music Refresh Rate",
        desc: "How frequently the track refreshes to stay in sync with the visuals\nHigh values will cause more obvious cuts in the track, low values can lag game"
    },

    musicVolume: {
        value: 0.3,
        min: 0,
        max: 1,
        title: "Music Volume",
        desc: "How loud the music is. This includes stage music, menu music, and any other background tracks"
    },

    soundEffectVolume: {
        value: 0.2,
        min: 0,
        max: 1,
        title: "Sound Effect Volume",
        desc: "How loud sound effects are. This includes hover/click noises, hit/graze noises, and any other short sound effect clips"
    },
}