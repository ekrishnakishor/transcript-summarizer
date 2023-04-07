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

```
The extractTranscript function takes a response object returned from the YouTube API and extracts the transcript text from it. It does this by accessing the necessary properties of the response object and mapping through the transcript cues to join them together into a single string. If the response object or any of the properties are undefined, the function will return undefined.

The fetchTranscript function takes a YouTube video ID and an optional API key as arguments and fetches the transcript data for the video using the YouTube API. It constructs the request URL with the provided API key and video ID, and sends a POST request with the necessary request parameters to the URL. If the request is successful, it calls the extractTranscript function with the response data and returns the extracted transcript text. If the request fails, it logs the error to the console.

The getVideoId function takes a YouTube video URL and returns the video ID. It does this by using a regular expression to extract the video ID from the URL.

The getTranscript function takes a callback function as an argument and extracts the transcript of the YouTube video on the current web page. It does this by getting the video ID from the URL using the getVideoId function and fetching the transcript data using the fetchTranscript function. It then calls the callback function with the extracted transcript.

The chrome.runtime.onMessage.addListener function listens for messages sent from other parts of the Chrome extension. If it receives a message of type 'getTranscript', it calls the getTranscript function and sends the extracted transcript back as a response using the callback function provided by the sender.


```
