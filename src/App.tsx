import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import "./App.css";
import { loadImages, toggleLike, toggleDislike, addComment} from "./redux/imgGallerySlice";
import { storeInt } from "./types";

function App() {
  const dispatch = useDispatch();
  const useAppSelector: TypedUseSelectorHook<storeInt> = useSelector;
  const commentRefs=useRef<HTMLInputElement[]>([])

  const store = useAppSelector((store) => store);

  useEffect(() => {
    dispatch<any>(loadImages());
  }, []);

  useEffect(()=>{
    localStorage.setItem('posts',JSON.stringify(store.imgGalleryReducer.posts))
  },[store])

  const addCommentDis = (e: any,i:number) => {
    e.preventDefault();
    if ( commentRefs.current!==null ) {
      dispatch(addComment({ ind: i, comment: commentRefs.current[i].value }));
    }
  };

  return (
    <div className="App">
      <header className="position-fixed top-0 w-100 header">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <span className="navbar-brand">
              <i className="bi bi-camera2 fs-4"></i> Image Gallery
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
                    <span className="card-text text-start">
                      <button
                          onClick={() => {
                            dispatch<any>(toggleLike(i));
                          }}
                          className="border-0 bg-transparent text-white ps-0 shorttxt"
                        >
                          {ele.like ?<><i className="bi bi-hand-thumbs-up-fill"></i>Liked</>:<><i className="bi bi-hand-thumbs-up"></i>Like</>}
                      </button>
                      <button
                          onClick={() => {
                            dispatch<any>(toggleDislike(i));
                          }}
                          className="border-0 bg-transparent text-white ps-0 shorttxt"
                        >{ele.dislike?<><i className="bi bi-hand-thumbs-down-fill"></i>Disliked</>:<><i className="bi bi-hand-thumbs-down"></i>Dislike</>}
                      </button>
                    </span>
                    <form className="d-flex align-items-center mt-2" onSubmit={(e)=>{addCommentDis(e,i)}}>
                      <input
                        ref={(el)=> {el!==null && commentRefs.current.push(el)}}
                        className="rounded-2 border-0 shorttxt p-1 "
                        type="text"
                        placeholder="Add a comment"
                      />
                      <button className="btn btn-dark bg-transparent vshorttxt col-4 px-2 py-1" type="submit">Add Comment</button>
                    </form>
                    {ele.comments.length>0?<div className="text-white comments">
                      <button className="btn btn-dark btn-sm text-start" type="button" data-bs-toggle="collapse" data-bs-target={`#comments${i}`} aria-expanded="false" aria-controls={`comments${i}`}>
                        Comments <i className="bi bi-caret-down-fill"></i>
                      </button>
                      <div className="collapse" id={`comments${i}`}>
                        {ele.comments.map((item,i)=>{
                          return <p key={i} className="vshorttxt mt-0 mb-1 ms-3">{item}</p>
                        })}
                      </div>
                    </div>:''}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2 className="my-4">Add some images :) Its empty here!!</h2>
        )}
      </section>
      <footer className="footer bg-dark text-white d-flex flex-wrap justify-content-between align-items-center py-4 px-3 border-top position-fixed bottom-0 w-100">
        <div className="col-md-4 d-flex align-items-center">
          <i className="bi bi-camera2 fs-4 me-2"></i>
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
