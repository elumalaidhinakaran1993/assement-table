import React, { useState, useEffect } from "react";
import "./assests/global.css";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 5;
  const pageCount = Math.ceil(data.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const [selectedItem, setSelectedItem] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?page=${currentPage}`
      );
      const json = await response.json();
      console.log(json);
      setData(json);
    };
    fetchData();
  }, [currentPage]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  function Modal({ item, onClose }) {
    return (
      <div className="modal">
        <div className="modal-content" >
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h4>ID: {item.id}</h4>
          <p>Title: {item.title}</p>
          <p>Body: {item.body}</p>
        </div>
      </div>
    );
  }
  function handleItemClick(item) {
    console.log(item);
    setSelectedItem(item);
  }

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleCheckboxChange = (event, item) => {
    if (event.target.checked) {
      setCheckedItems([...checkedItems, item.id]);
    } else {
      setCheckedItems(checkedItems.filter((id) => id !== item.id));
    }
  };

  return (
    <div className="container">
      <h4>Maintable</h4>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(startIndex, endIndex).map((item) => (
            <tr key={item.id}>
              <td>
                {" "}
                <input
                  type="checkbox"
                  checked={checkedItems.includes(item.id)}
                  onChange={(event) => handleCheckboxChange(event, item)}
                />
              </td>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td className="truncate">{item.body}</td>
              <td>
                <i
                  class="fa fa-eye"
                  style={{ fontSize: "24px" }}
                  onClick={() => handleItemClick(item)}
                ></i>
              </td>
              <td>
                <i
                  class="material-icons"
                  style={{ fontSize: "24px" }}
                  onClick={() => handleDelete(item.id)}
                >
                  delete
                </i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 containerone">
        <div class="b-pagination-outer"></div>
        <button className="btn" onClick={handlePrevClick}>Prev</button>
        <span className="currentPage">{currentPage}</span>
        <button className="btn" onClick={handleNextClick}>Next</button>
      </div>
      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      {checkedItems.length > 0 && (
        <>
          <h4>SubTable</h4>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((item) => checkedItems.includes(item.id))
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>

                    <td>{item.title}</td>
                    <td className="truncate">{item.body}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
