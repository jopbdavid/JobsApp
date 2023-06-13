import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useSelector, useDispatch } from "react-redux";
import {
  changePrev,
  changeNext,
  activePage,
} from "../features/job/allJobsSlicer";

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  const pages = new Array(numOfPages).fill(null).map((_, index) => {
    return index + 1;
  });
  // const pages = Array.from({length: numOfPages}, (_, index) => { return index + 1}) Alternative method

  const prevPage = () => {
    if (page === 1) return;
    dispatch(changePrev());
  };
  const nextPage = () => {
    if (page === numOfPages) return;
    dispatch(changeNext());
  };
  const changePage = (pageNumber) => {
    dispatch(activePage(pageNumber));
  };
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              key={pageNumber}
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
