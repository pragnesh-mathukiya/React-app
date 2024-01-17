import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

const BasicPagination = (props) => {
  const { totalRecords, limit, batch, onBatchChange } = props;

  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(limit);
  const [totalPages, setTotalPages] = useState(0);
  const [countArr, setCountArr] = useState([]);

  useEffect(() => {
    setTotalPages(
      Math.floor(totalRecords / limit) + (totalRecords % limit > 0 ? 1 : 0)
    );
  }, [totalRecords, limit]);

  useEffect(() => {
    if (limit * limit > totalRecords) {
      const arrLength =
        Math.floor(totalRecords / limit) + (totalRecords % limit > 0 ? 1 : 0);
      setCountArr(
        Array(arrLength)
          .fill()
          .map((_, i) => startIndex + i)
      );
    } else {
      setCountArr(
        Array(limit)
          .fill()
          .map((_, i) => startIndex + i)
      );
    }
  }, [startIndex, limit, totalRecords]);

  useEffect(() => {
    setEndIndex(limit + startIndex - 1);
  }, [startIndex, limit]);

  const onNextClick = () => {
    if (batch === totalPages) {
      return;
    }
    let nextIndex = batch + 1;
    if (nextIndex === endIndex && nextIndex < totalPages) {
      setStartIndex(startIndex + 1);
    }
    onBatchChange(nextIndex);
  };

  const onLastClick = () => {
    if (batch < totalPages) {
      if (limit * limit < totalRecords) {
        setStartIndex(totalPages - limit + 1);
      }
      onBatchChange(totalPages);
    }
  };

  const onPrevClick = () => {
    if (batch === 1) {
      return;
    }
    let prevIndex = batch - 1;
    if (prevIndex === startIndex && prevIndex > 1) {
      setStartIndex(startIndex - 1);
    }
    onBatchChange(prevIndex);
  };

  const onFirstClick = () => {
    if (batch > 1) {
      setStartIndex(1);
      onBatchChange(1);
    }
  };

  const onNumberClick = (currentIndex) => {
    if (currentIndex === endIndex && currentIndex < totalPages) {
      setStartIndex(startIndex + 1);
    }
    if (currentIndex === startIndex && currentIndex > 1) {
      setStartIndex(startIndex - 1);
    }
    if (currentIndex !== batch) {
      onBatchChange(currentIndex);
    }
  };

  return totalPages > 1 ? (
    <Pagination>
      {batch !== 1 && (
        <>
          <Pagination.First disabled={batch === 1} onClick={onFirstClick} />
          <Pagination.Prev disabled={batch === 1} onClick={onPrevClick} />
        </>
      )}
      {startIndex > 1 ? <Pagination.Ellipsis /> : null}
      {countArr.map((count, index) => (
        <Pagination.Item
          key={index}
          active={batch === startIndex + index}
          onClick={() => onNumberClick(count)}
        >
          {count}
        </Pagination.Item>
      ))}
      {endIndex < totalPages ? <Pagination.Ellipsis /> : null}
      {batch !== totalPages && (
        <>
          <Pagination.Next
            onClick={onNextClick}
            disabled={batch === totalPages}
          />
          <Pagination.Last
            disabled={batch === totalPages}
            onClick={onLastClick}
          />
        </>
      )}
    </Pagination>
  ) : null;
};

export default BasicPagination;
