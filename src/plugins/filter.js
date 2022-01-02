export default () => {
  return {
    onFilter(search, data) {
      if (!(search && search.length > 0)) {
        return data;
      }

      return data.filter((item) => {
        const val = search ? search.toLowerCase() : '';
        const title = Object.values(item).join(' ').toLowerCase();

        return title.includes(val);
      });
    },
  };
};
