export default () => {
  return {
    filterData: [],
    onFilter: function (search, data) {
      if (search && search.length > 0) {
        this.filterData = data.filter((item) => {
          const val = search.toLowerCase();
          const title = item.name && item.name.toLowerCase();
          if (val && title.indexOf(val) !== -1) {
            return true;
          } else {
            return false;
          }
        });
      }
    },
  };
};
