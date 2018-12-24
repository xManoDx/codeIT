const toDateTime = (secs) => {
  let time = new Date(1970, 0, 1); // Epoch
  time.setSeconds(secs);
  const options = {
     year: 'numeric',
     month: 'numeric',
     day: 'numeric',
     timezone: 'UTC'
  };
  return time.toLocaleString("ru", options);
}

// description makes shorter with this function
const shortDescription = (description) => {
  if(description.length > 100) {
    const maxWordsArray = description.slice(0, 100).split(' ');
    return `${maxWordsArray.splice(0, maxWordsArray.length - 1).join(' ')}...`
  } else {
    return description
  }
}

export {
  shortDescription,
  toDateTime,
};
