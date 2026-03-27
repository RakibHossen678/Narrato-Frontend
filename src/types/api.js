export const apiResponseShape = {
  success: true,
  message: "",
  meta: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasMore: false,
    unreadCount: 0,
  },
  data: null,
};

export const paginatedResultShape = {
  items: [],
  meta: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasMore: false,
  },
};
