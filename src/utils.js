export const sortedData = (data) => {
  const dataList = [...data];

  dataList.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return dataList;
};
