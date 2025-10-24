import React, { useState } from "react";

const SCREENS = [
  {
    id: 1,
    time: "10:00am",
    seats: [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
    movie: {}, // initialize to prevent undefined
  },
  {
    id: 2,
    time: "02:00pm",
    seats: [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0],
    movie: {},
  },
  {
    id: 3,
    time: "06:00pm",
    seats: [1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
    movie: {},
  },
];

const MOVIES = [
  {
    id: 1,
    title: "Dude",
    image: "https://static.moviecrow.com/gallery/20250511/246272-dude.jpeg",
  },
  {
    id: 2,
    title: "Bison",
    image: "https://static.moviecrow.com/gallery/20250307/243431-bison.jpeg",
  },
  {
    id: 3,
    title: "Demon Slayer Infinite ARC",
    image: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2025/03/06/3759097964.jpg",
  },
];

export default function MovieBooking() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (index, screen) => {
    if (screen.id !== selectedScreen?.id) {
      setSelectedSeats([index]);
      setSelectedScreen(screen);
      return;
    }

    if (selectedSeats.includes(index)) {
      setSelectedSeats(selectedSeats.filter((i) => i !== index));
	  if(selectedSeats.filter((i) => i !== index).length < 1 ){
		setSelectedScreen(null);
	  }
    } else {
      setSelectedSeats((prev) => [...prev, index]);
    }
  };

  // Fixed handleBooking function
  const handleBooking = () => {
    alert(`Booking confirmed for Screen ${selectedScreen.id} at ${selectedScreen.time}.\nSeats: ${selectedSeats.map(i => i+1).join(", ")} booked for ${selectedScreen.movie?.title || selectedMovie?.title} at ${selectedScreen.time}`);

    // create a local updated copy of screens to avoid const reassignment
    const updatedScreens = SCREENS.map(screen => {
      if(screen.id === selectedScreen?.id){
        let seats = [...screen.seats];
        selectedSeats.forEach((seat) => seats[seat] = 0);
        return {...screen, seats};
      }
      return screen;
    });

    setSelectedMovie(null);
    setSelectedScreen(null);
    setSelectedSeats([]);
  };

  return (
    <div>
      <h1>Movie Booking App</h1>
      <h2>Choose your movie:</h2>

      <div className="movie-selection">
        {MOVIES.map((movie) => (
          <div
            className={`movie ${selectedMovie?.id === movie.id ? "selected" : ""}`}
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
          >
            <img className="movie-poster" src={movie.image} alt={movie.title} />
            <div className="movie-title">{movie.title}</div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <>
          <h2>Choose your screen:</h2>
          <div className="screen-selection">
            {SCREENS.map((screen) => (
              <div
                key={screen.id}
                className={`screen ${screen?.id === selectedScreen?.id ? "selected" : ""}`}
              >
                <div className="screen-number">Screen {screen.id}</div>
                <div className="screen-time">{screen.time}</div>
                <div className="movie-title">{selectedMovie.title}</div>

                <div className="screen-seats">
                  {screen.seats.map((seat, index) => (
                    <div
                      key={index}
                      className={`seat ${seat ? "available" : "unavailable"} 
                        ${selectedSeats.includes(index) &&
                          selectedScreen?.id === screen.id
                          ? "selected"
                          : ""
                        }`}
                      onClick={() => {
                        if (seat) {
                          handleSeatSelect(index, {
                            ...screen,
                            movie: selectedMovie,
                          });
                        }
                      }}
                    >
                      <div className="seat-number">{index + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="booking-summary">
        <div className="selected-screen">
          {selectedScreen && (
            <div>
              <h3>Selected Screen : {selectedScreen.id}</h3>
              <p>Time : {selectedScreen.time}</p>
              <p>Movies : {selectedScreen?.movie?.title || selectedMovie?.title || "N/A"}</p>
            </div>
          )}
        </div>
        <div className="selected-seats">
          {selectedScreen && selectedSeats?.length > 0 && (
            <div>
              <h3>Selected Seats : {selectedSeats.map(index => index+1).join(",")}</h3>
              <h3>No of Tickets : {selectedSeats?.length}</h3>
            </div>
          )}
        </div>
      </div>

      <button
        className="payment-button"
        onClick={handleBooking}
        disabled={!selectedScreen || selectedSeats.length === 0}
      >
        Proceed to Payment
      </button>
    </div>
  );
}
