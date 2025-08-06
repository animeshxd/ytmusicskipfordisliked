
const excludeTitle = [
    /Jhankar/gmi
]

const debounceTime = 1000;

function debounce(func, wait) {
    let timeout;

    return (...args) => {
        try {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        } catch (error) {

        }
    };
}

function getTitle() {
    return document.querySelector(".title.ytmusic-player-bar").title
}

function debug(...args) {
    // console.debug(...args)
}

function overrideVideoDisplayWithImage() {
    try {
        //TODO: make it more specific
        const image = document.querySelector("#song-image.style-scope.ytmusic-player")
        const video = document.querySelector("#song-video.style-scope.ytmusic-player")
        image.style.removeProperty("display");
        video.style.display = "none";
    } catch (error) {

    }
}

function onChange() {
    try {
        overrideVideoDisplayWithImage()
        const nextButton = document.querySelector('yt-icon-button.next-button.style-scope.ytmusic-player-bar');
        const title = getTitle();
        const dislikeButton = document.querySelector("ytmusic-like-button-renderer.ytmusic-player-bar > #button-shape-dislike > button")

        if (!nextButton && !title) return;
        const containsExcluded = title && excludeTitle.some((r) => !!title.match(r))
        const isDisliked = !!document.querySelector('ytmusic-like-button-renderer[like-status="DISLIKE"]');
        debug({ containsExcluded, isDisliked, dislikeButton })
        if (containsExcluded && !isDisliked && !!dislikeButton && getTitle() == title) {
            dislikeButton.click();
            debug("dislikeButton.click()")
            return;
        }
        if (nextButton != null && isDisliked && getTitle() == title) {
            debug("nextButton.click()")
            nextButton.click();
        }
    } catch (err) {
        // console.error(err)
    }
}

var observer = new MutationObserver(debounce(onChange, debounceTime));

observer.observe(document.body, { childList: true, subtree: true });

onChange();