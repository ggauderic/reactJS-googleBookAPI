import React from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  return (
    <div className="container">
      <form>
        <div class="form-group">
          <input
            type="text"
            className="input-control"
            placeholder="Search for books"
            autoComplete="off"
          />
          <button className="btn btn-danger">Search</button>
        </div>
      </form>
    </div>
  );
}
