const transcriptBody = document.querySelector('.transcript');

const isYouTubeUrl = url => {
    const regex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm;

    return regex.test(url);
};

const getTranscriptFromContentScript = async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
    });

    if (!isYouTubeUrl(tab.url)) {
        transcriptBody.textContent =
            'Please visit a YouTube video to get the transcript.';
        return;
    }

    const response = await chrome.tabs.sendMessage(tab.id, {
        type: 'getTranscript',
    });

    transcriptBody.textContent = response.transcript;
    console.log(response);
};

getTranscriptFromContentScript();
