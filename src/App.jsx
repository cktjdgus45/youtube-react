import React, { useEffect, useState } from 'react';
import VideoList from './components/video_list/video_list';
import SearchHeader from './components/search_header/search_header';
import styles from './app.module.css';
import VideoDetail from './components/video_detail/video_detail';



function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState([]);
  const search = query => {
    youtube //
      .search(query)
      .then(videos => {
        setVideos(videos);
      });
  }

  const selectVideo = video => {
    setSelectedVideo(video);
  }

  useEffect(() => {
    youtube //
      .mostPopular()
      .then(videos => setVideos(videos));
  }, [youtube])
  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search}></SearchHeader>
      <section className={styles.content}>
        {
          selectedVideo.id &&
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        }
        <div className={styles.list}>
          <VideoList videos={videos} onVideoClick={selectVideo} display={selectedVideo.id ? 'list' : 'grid'}></VideoList>
        </div>
      </section>
    </div>
  )
}

export default App;
