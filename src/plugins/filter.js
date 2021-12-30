export default () => {
  return {
    onFilter(search, data) {
      if (!(search && search.length > 0)) {
        return data;
      }

      return data.filter((item) => {
        const val = search ? search.toLowerCase() : '';
        const title = Object.values(item).join(' ');
        //console.log(new RegExp(`.*${val}.*`, 'mi').test(title));

        return new RegExp(`.*${val}.*`, 'mi').test(title);
      });
    },
  };
};
