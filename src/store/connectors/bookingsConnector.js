import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash.get';
import { getBookingsWithProductDetails } from '../actions/bookingsActions';
import { getSellers } from '../actions/sellerActions';

const mapStateToProps = state => {
  const groupedBookings = get(state, 'bookingsData.groupedBookings', []);

  return {
    groupedBookings
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getBookingsWithProductDetails
    },
    dispatch
  );
};

export const bookingsConnector = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);
