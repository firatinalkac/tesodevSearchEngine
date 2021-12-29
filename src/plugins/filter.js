export default (data, search) => {
  if (search && search.length > 0) {
    data.filter((item) => {
      const val = search.toLowerCase();
      const title = item.name && item.name.toLowerCase();
      if (val && title.indexOf(val) !== -1) {
        return true;
      } else {
        return false;
      }
    });
  }
};
