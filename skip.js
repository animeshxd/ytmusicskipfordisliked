function handleDislike() {
    console.log("Content Changed");
    const nextButton = document.querySelector('tp-yt-paper-icon-button.next-button');
    const isDisliked = document.querySelector('ytmusic-like-button-renderer[like-status="DISLIKE"]');

    if (nextButton != null && isDisliked != null) {
        nextButton.click();
    }
}

const observer = new MutationObserver(handleDislike);

observer.observe(document.body, { childList: true, subtree: false });

handleDislike();


