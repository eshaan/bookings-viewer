import { compose } from 'recompose';
import Bookings from './Bookings';
import { bookingsConnector as withBookingsConnector } from '../../store/connectors/bookingsConnector';

export default compose(withBookingsConnector)(Bookings);
