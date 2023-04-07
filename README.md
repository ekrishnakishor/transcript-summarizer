# Youtube-Caption-Viewer

![](https://img.shields.io/badge/Chrome-Extension-blue.svg) ![](https://img.shields.io/badge/Version-1.0.0-green.svg)


A really simple chrome extension to display captions (transcript) from youtube videos for people who are lazy to even watch a video.
Does not need any backend server, just a simple chrome extension.

##For Learning

# My Awesome Project

Welcome to my awesome project! This project does something really cool and amazing.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository
2. Install the dependencies
3. Run the project

## Code Explanation

<details>
  <summary>Click to expand</summary>

  ```javascript
  const extractTranscript = response => {
      const transcript =
          response?.actions[0]?.updateEngagementPanelAction?.content?.transcriptRenderer?.body?.transcriptBodyRenderer?.cueGroups
              .map(cueGroup =>
                  cueGroup.transcriptCueGroupRenderer.cues
                      .map(cue => cue.transcriptCueRenderer.cue.simpleText.trim())
                      .join(' ')
              )
              .join(' ');
  
      return transcript;
  };
  
  const fetchTranscript = async (videoId, key) => {
      key = key || 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';
      if (!videoId) {
          throw Error('Video Id is not provided');
          return;
      }
  
      const transcriptUrl = `https://www.youtube.com/youtubei/v1/get_transcript?key=${key}`;
  
      const requestOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              context: {
                  client: {
                      clientName: 'WEB',
                      clientVersion: '2.9999099',
                  },
              },
              params: btoa(`\n\x0b${videoId}`),
          }),
      };
  
      try {
          const response = await fetch(transcriptUrl, requestOptions);
          const data = await response.json();
          return extractTranscript(data);
      } catch (error) {
          console.log(error);
      }
  };
  
  const getVideoId = url => {
      let regExp =
          /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      let match = url.match(regExp);
      if (match && match[2].length == 11) {
          return match[2];
      }
  };
  
  const getTranscript = async sendResponse => {
      const url = window.location.href;
      const videoId = getVideoId(url);
  
      const transcript = await fetchTranscript(videoId);
      sendResponse({ transcript });
  };
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type === 'getTranscript') {
          getTranscript(sendResponse);
          return true;
      }
  });

<details>
  <summary><a href="#">Theory</a></summary>
  <p>
    This code provides a set of functions that work together to fetch the transcript of a YouTube video and return it to the caller. The getTranscript function takes a sendResponse callback function as an argument, which it calls with the transcript data when it's ready.

    The fetchTranscript function is responsible for making a network request to the YouTube API to fetch the transcript data. It takes a videoId and an optional key parameter, which defaults to a hardcoded value if not provided.

    The extractTranscript function takes the raw response data from the YouTube API and extracts the transcript text from it. It uses a chain of optional chaining (?.) and nullish coalescing (??) operators to safely navigate through the response object and handle any missing or undefined values.

    The getVideoId function extracts the video ID from a YouTube video URL using a regular expression.

    Finally, the chrome.runtime.onMessage.addListener function listens for a message with type 'getTranscript' and calls the getTranscript function with a callback function to send the transcript data back to the caller.
  </p>
</details>
