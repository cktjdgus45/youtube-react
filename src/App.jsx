import React, { useEffect, useState } from 'react';
import VideoList from './components/video_list/video_list';
import SearchHeader from './components/search_header/search_header';
import styles from './app.module.css';



function App() {
  const [videos, setVideos] = useState([]);
  const search = query => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&q=${query}&key=AIzaSyBhDQVi2NUEy10Lv1y3NL2H4241A1siiEM`, requestOptions)
      .then(response => response.json())
      .then(result => result.items.map(item => ({ ...item, id: item.id.videoId })))
      .then(items => setVideos(items))
      .catch(error => console.log('error', error));
  }
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&type=video&maxResults=25&key=AIzaSyBhDQVi2NUEy10Lv1y3NL2H4241A1siiEM", requestOptions)
      .then(response => response.json())
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error));
  }, [])
  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search}></SearchHeader>
      <VideoList videos={videos}></VideoList>
    </div>
  )
}

export default App;
