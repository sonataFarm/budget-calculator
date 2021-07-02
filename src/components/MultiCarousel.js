import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});

const MultiCarousel = (props) => {
  const classes = useStyles();
  // react-material-ui-carousel displays one item at a time,
  // but we want multiple columns in our carousel.
  // Let's hack it to display multiple items.
  const items = props.children;
  const pages = [];

  const columns = props.columns || 2;
  for (let i = 0; i < items.length; i += columns) {
    pages.push(
      <div className={classes.page}>{items.slice(i, i + columns)}</div>
    );
  }

  return (
    <div>
      <Carousel {...props}>
        {pages}
      </Carousel>
    </div>
  );
};

export default MultiCarousel;