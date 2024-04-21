import './App.css';

const topSongs = [
  {
    id: 1,
    name: 'Marea (we\'ve lost dancing)',
    viewer: '310,790,748',
    duration: '4:45',
  },
  {
    id: 2,
    name: 'Turn On The Lights again.. (feat. Future',
    viewer: '177,550,875',
    duration: '4:27',
  },
  {
    id: 3,
    name: 'Delilah (pull me out of this)',
    viewer: '151,616,610',
    duration: '4:10',
  },
  {
    id: 4,
    name: 'Rumble',
    viewer: '124,906,696',
    duration: '2:26',
  },
  {
    id: 5,
    name: 'Jungle',
    viewer: '124,244,633',
    duration: '3:18',
  }
]

const concerts = [
  {
    id: 1,
    location: 'Bonnaroo',
    date: 'June 16, 2024',
    city: 'Manchester',
  },
  {
    id: 2,
    location: 'Syd For Solen',
    date: 'August 8, 2024',
    city: 'Copenhagen',
  },
  {
    id: 3,
    location: 'Flow Festival',
    date: 'August 8, 2024',
    city: 'Helsinki',
  } 
]

function FredInfo() {
  return (
    <div>
      <h1>Fred Again</h1>
      <p>Frederick John Philip Gibson as known as Fred again is a producer, songwriter and a DJ who is taking the electroni/house music world by storm. He born on July 19, 1993 in London, England. The reason why Fred Again has made such a splash is that he approaches music in a very creative and innovative way. He finds unique voice memos and video clips and integrates them into his music. Below we have listed some of Fred Again's most popular songs and his upcoming concerts for you.</p>
    </div>
  );
}

function TopSongs() {
  const listSongs = topSongs.map(song =>
    <li key={song.id}>
      {song.name} - 
      {/* condition to change the viewer color to red if it is larger than 150,000,000 */}
      <span style={{ color: parseInt(song.viewer.replace(/,/g, '')) > 150000000 ? 'red' : 'white' }}>
        {song.viewer}
      </span> 
      - {song.duration}
    </li>
  );
  return (
    <div>
      <h2>Top Songs</h2>
      <ul>{listSongs}</ul>
    </div>
  )
}


function Concerts() {
  const listConcerts = concerts.map(concert =>
    <li key={concert.id}>
      {concert.date} - {concert.location} - {concert.city}
    </li>
  );
  return (
    <div>
      <h2>Upcoming Concerts</h2>
      <ul>{listConcerts}</ul>
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FredInfo/>
        <TopSongs/>
        <Concerts/>
      </header>
    </div>
  );
}

export default App;
