const apiKey = 'AIzaSyCB3a9z6jg25RuBBxhLilyii3sgba4NSQ8'; // ここにYouTube APIキーを挿入
const player = document.getElementById('player');
let nextPageToken = null; // 次ページ用のトークン
let query = ''; // 現在の検索クエリ

function searchYouTube() {
    query = document.getElementById('searchQuery').value;
    nextPageToken = null; // 新しい検索を開始するためトークンをリセット
    fetchYouTubeData();
}

function fetchYouTubeData() {
    const maxResults = 10; // 一度に取得する最大件数
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&pageToken=${nextPageToken || ''}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            nextPageToken = data.nextPageToken || null; // 次ページトークンを更新
            displayResults(data.items);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(videos) {
    const resultsDiv = document.getElementById('results');

    // 新しい検索時に以前の結果をクリア
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

    const controlsDiv = document.getElementById('controls');
    controlsDiv.style.display = nextPageToken ? 'block' : 'none'; // 次ページがある場合のみ表示
}

function playVideo(videoId) {
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

function loadMore() {
    fetchYouTubeData(); // 次のページを読み込む
}
