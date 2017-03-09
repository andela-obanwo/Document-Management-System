const Paginator = {
  paginate(metaData) {
    const next = Math.ceil(metaData.count / metaData.limit);
    const currentPage = Math.floor((metaData.offset / metaData.limit) + 1);
    const pageSize = metaData.limit > metaData.count
      ? metaData.count : metaData.limit;
    return {
      page_count: next,
      page: currentPage,
      page_size: Number(pageSize),
      total_count: metaData.count
    };
  },
};
export default Paginator;
