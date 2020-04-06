import React from "react";
import Pagination from "react-bootstrap/Pagination";
import String from "string";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [author, setAuthor] = React.useState("");
  const [result, setResult] = React.useState([]);
  const [size, setSize] = React.useState();
  const apiKey = "AIzaSyAvAO9j8tmEQlHCoAGGGmrzbmbniHNb_j8";
  let maxResult = 2;
  let descrLength = 100;
  const [active, setActive] = React.useState(1);
  let items = [];
  function reload() {
    var max = size / maxResult;
    for (let number = 1; number <= max; number++) {
      items.push(<Pagination.Item key={number}>{number}</Pagination.Item>);
    }
    return (
      <div className="container">
        <h2> Book Search App</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text mt-10"
              onChange={handleChange}
              className="form-control"
              placeholder="Search for books"
              autoComplete="off"
            />
            <button type="submit" className="btn btn-danger">
              Search
            </button>
          </div>
        </form>
        <Pagination onClick={research}>{items}</Pagination>
        <h2>{printPage()}</h2>

        {result.map(book => (
          <div>
            <a href={book.saleInfo.buyLink}>
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.title}
              />
            </a>
            <h2> {book.volumeInfo.title}</h2>
            <p>Auteur(s): {book.volumeInfo.authors}</p>
            <p>Année de parution: {book.volumeInfo.publishedDate}</p>
            <p>
              Sale info: {String("" + book.saleInfo.saleability).humanize().s}
            </p>
            <p>Descriptif: {descrSize(book.volumeInfo.description)}</p>
          </div>
        ))}
      </div>
    );
  }
  function descrSize(descr) {
    var str = String("" + descr).left(descrLength).s;
    return str;
  }
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=inauthor:" +
          author +
          "&key=" +
          apiKey
      )
      .then(
        data =>
          setResult(data.data.items) &
          setSize(data.data.items.length) &
          console.log(data.data.items)
      )
      .catch(error => console.log(error.response.request._response));
    reload();
  }
  function printPage() {
    if (result.length > 0) {
      return "Page " + active;
    }
    return "";
  }
  function handleChange(event) {
    setAuthor(event.target.value);
  }
  function research(startIn) {
    setActive(startIn.target.text);
    let startIndex = active * size - (size - 1);
    console.log(active);
    console.log(size);
    console.log(startIndex);
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=inauthor:" +
          author +
          "&key=" +
          apiKey +
          "&maxResults=" +
          maxResult +
          "&startIndex=" +
          startIndex
      )
      .then(data => setResult(data.data.items) & console.log(data.data.items))
      .catch(error => console.log(error.response.request._response));
    reload();
  }

  return reload();
}
