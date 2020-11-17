import React, { useContext, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";



export default function VideoFilter(child) {

    const categories = ["Movie", "TV Show", "Documentary"];
    const ratings = [1, 2, 3, 4, 5];
    const [genreTitle, setGenreTitle] = useState("Select Genre")
    const [rateTitle, setRateTitle] = useState("Select Rating")

    const resetFilter = () => {
        child.setFilter({"Title": "", "Genre": "", "ReleaseDate": "", "Rating": null})
        setGenreTitle("Select Genre")
        setRateTitle("Select Rating")
    }

    const setRating = (rating) => {
        child.setFilter(prevState => ({...prevState, "Rating": rating}))
        setRateTitle(rating)
    }

    const setGenre = (genre) => {
        child.setFilter(prevState => ({...prevState, "Genre": genre}))
        setGenreTitle(genre)
    }

    useEffect(() => {
        //console.log(child)
    }, [])

  return (
    <Card bg="dark">
        <h1>Search</h1>
      <Form.Group controlId="Title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="name"
          value={child.filter.Title}
          onChange={(e) => child.setFilter(prevState => ({...prevState, "Title": e.target.value}))}
        />
      </Form.Group>

        Genre
      <DropdownButton
            variant="light"
            id="dropdown-basic-button"
            title={genreTitle}
          >
            {categories.map((category, index) => (
              <div>
                <Dropdown.Item onSelect={() => setGenre(category)}>
                  {category}
                </Dropdown.Item>
              </div>
            ))}
          </DropdownButton>

                Rating
          <DropdownButton
            variant="light"
            id="dropdown-basic-button"
            title={rateTitle}
          >
            {ratings.map((rating, index) => (
              <div>
                <Dropdown.Item onSelect={() => setRating(rating)}>
                  {rating}
                </Dropdown.Item>
              </div>
            ))}
          </DropdownButton>

          {/* TODO add release date filter */}
          <Form.Group controlId="Realease Date">
        <Form.Label>Release Date</Form.Label>
        <Form.Control
          type="date"
          value={child.filter.ReleaseDate}
          onChange={(e) => child.setFilter(prevState => ({...prevState, "ReleaseDate": e.target.value}))}
        />
      </Form.Group>


      <Button variant="danger" size="lg" block="block" onClick={resetFilter}>
        Reset Search
      </Button>
    </Card>
  );
}
