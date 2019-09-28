export const truncateBookingId = (bookingId = '') => {
  const truncateBookingId = bookingId.substring(0, 6);
  return (truncateBookingId.length > 0 && truncateBookingId.toUpperCase()) || '';
};

const addCommas = value => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatQty = (qty = '') => {
  return addCommas(qty) || '';
};

const convertCentToDollars = cents => (cents / 100).toFixed(2);

export const formatRate = rate => {
  return `$${convertCentToDollars(rate)}`;
};

export const formatCost = ({ productRate, bookingQty }) => {
  const computedCost = ((bookingQty / 1000) * productRate).toFixed(2);
  return `$${addCommas(convertCentToDollars(computedCost))}`;
};

export const sortBookingsByStartDate = bookings => {
  return bookings.sort((a, b) => {
    const startDateA = new Date(a.startDate);
    const startDateB = new Date(b.startDate);
    return startDateA - startDateB;
  });
};
