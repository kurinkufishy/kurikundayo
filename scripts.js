const apiKey = 'AIzaSyCB3a9z6jg25RuBBxhLilyii3sgba4NSQ8'; // ここにYouTube APIキーを挿入
const player = document.getElementById('player');

function searchYouTube() {
    const query = document.getElementById('searchQuery').value;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items.slice(0, 4)); // 最初の4件に限定
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(videos) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    videos.forEach(video => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const thumbnail = video.snippet.thumbnails.default.url;

        const videoElement = document.createElement('div');
        videoElement.classList.add('videoItem');
        videoElement.innerHTML = `
            <img src="${thumbnail}" alt="${title}">
            <p>${title}</p>
            <button onclick="playVideo('${videoId}')">再生</button>
        `;

        resultsDiv.appendChild(videoElement);
    });
}

function playVideo(videoId) {
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}
