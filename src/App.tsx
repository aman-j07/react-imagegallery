import React, { useEffect } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import "./App.css";
import { loadImages,toggleLike,toggleDislike } from "./redux/imgGallerySlice";
import { storeInt } from "./types";

function App() {
  const dispatch = useDispatch();
  const useAppSelector: TypedUseSelectorHook<storeInt> = useSelector;

  const store = useAppSelector((store) => store);

  useEffect(() => {
    dispatch<any>(loadImages());
  }, []);

  
  console.log("store-", store);

  return (
    <div className="App position-relative">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <span className="navbar-brand">
              <i className="bi bi-pencil-square fs-4"></i> Blogzz
            </span>

            <span>
              <button
                type="button"
                className="btn border-0 text-white text-muted"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Sign in to add post"
              >
                Add a Post
              </button>
              <button className="btn border-0 text-white">Sign In</button>{" "}
            </span>
          </div>
        </nav>
      </header>
      <section className="main container border bg-dark">
        {store.imgGalleryReducer.posts.length !== 0 ? (
          store.imgGalleryReducer.posts.map((ele, i) => {
            return (
              <div
                key={ele.src}
                className="card align-items-center m-4 p-0 border-0 border-bottom"
              >
                <div className="card-body w-100 p-0 ">
                  <img
                    src={ele.src}
                    className="card-img-top previewimg w-auto"
                    alt={ele.src}
                  />
                  <div className="text-start p-2 bg-dark">
                    <span className="card-text text-start ">
                      {ele.like ? (
                        <button onClick={()=>{dispatch<any>(toggleLike(i))}} className="border-0 bg-transparent text-white ps-0 shorttxt">
                          <i className="bi bi-hand-thumbs-up-fill"></i>Liked
                        </button>
                      ) : (
                        <button onClick={()=>{dispatch<any>(toggleLike(i))}} className="border-0 bg-transparent text-white ps-0 shorttxt">
                          <i className="bi bi-hand-thumbs-up"></i>Like
                        </button>
                      )}
                      {ele.dislike ? (
                        <button onClick={()=>{dispatch<any>(toggleDislike(i))}} className="border-0 bg-transparent text-white ps-0 shorttxt">
                          <i className="bi bi-hand-thumbs-down-fill"></i>
                          Disliked
                        </button>
                      ) : (
                        <button onClick={()=>{dispatch<any>(toggleDislike(i))}} className="border-0 bg-transparent text-white ps-0 shorttxt">
                          <i className="bi bi-hand-thumbs-down"></i>Dislike
                        </button>
                      )}
                    </span>
                    <input
                      className="rounded-2 border-0 shorttxt p-1 mt-2 w-100"
                      type="text"
                      placeholder="Add a comment"
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2 className="my-4">Add some images :) Its empty here!!</h2>
        )}
      </section>
      <footer className="footer bg-dark text-white d-flex flex-wrap justify-content-between align-items-center py-4 px-3 border-top position-absolute bottom-0 w-100">
        <div className="col-md-4 d-flex align-items-center">
          <i className="bi bi-pencil-square fs-4 me-2"></i>
          <span className="mb-3 mb-md-0 text-muted">© 2022 Company, Inc</span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <i className="bi bi-facebook"></i>
          </li>
          <li className="ms-3">
            <i className="bi bi-twitter"></i>
          </li>
          <li className="ms-3">
            <i className="bi bi-instagram"></i>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
