import { truncateBookingId, formatQty, formatRate, formatCost } from '../../utils/bookingUtils';
import { isWithinInterval, isBefore } from 'date-fns';

const findProduct = ({ products, bookingProductId }) => {
  return products.find(product => product.id === bookingProductId);
};

const isStartDateGreaterThanEndDate = (start, end) => {
  return start > end;
};

const checkBookingIsLive = ({ startDate, endDate }) => {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  return (
    !isStartDateGreaterThanEndDate(startDateObj, endDateObj) &&
    isWithinInterval(new Date(), { start: new Date(startDate), end: new Date(endDate) })
  );
};

const checkBookingInPast = ({ startDate, endDate }) => {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  return !isStartDateGreaterThanEndDate(startDateObj, endDateObj)
    ? isBefore(endDateObj, new Date())
    : true;
};

export const mapBookingsWithProduct = ({ bookings, products }) => {
  return bookings.map(booking => {
    const bookingId = truncateBookingId(booking.id);
    const product = findProduct({ products, bookingProductId: booking.productId });
    const quantity = formatQty(booking.quantity);
    const productRate = formatRate(product.rate || 0);
    const cost = formatCost({ productRate: product.rate, bookingQty: booking.quantity });
    const isLive = checkBookingIsLive({ startDate: booking.startDate, endDate: booking.endDate });
    const isPast = checkBookingInPast({ startDate: booking.startDate, endDate: booking.endDate });

    return {
      id: bookingId,
      productName: product.name,
      bookingName: booking.name,
      quantity,
      productRate,
      cost,
      startDate: booking.startDate,
      endDate: booking.endDate,
      isLive,
      isPast
    };
  });
};
