import { sortBookingsByStartDate } from '../../utils/bookingUtils';

export const groupBySeller = mappedBookings => {
  let groupedBySellerBookings = [];
  const groupedBySellerObj = mappedBookings.reduce(function(acct, curr) {
    (acct[curr['productName']] = acct[curr['productName']] || []).push(curr);
    return acct;
  }, {});

  for (let [sellerName, bookings] of Object.entries(groupedBySellerObj)) {
    console.log(bookings);
    groupedBySellerBookings.push({
      sellerName,
      bookings: bookings.every(booking => booking.isPast) ? [] : sortBookingsByStartDate(bookings)
    });
  }
  return groupedBySellerBookings;
};
