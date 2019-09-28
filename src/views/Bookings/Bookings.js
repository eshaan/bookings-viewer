import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../constants/theme';
import { tableHeadings } from '../../constants/table';
import { Table } from 'react-bootstrap';
import get from 'lodash.get';
import { format } from 'date-fns';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${theme.fonts.default};
`;

const HeadingWrapper = styled.div`
  margin-bottom: ${theme.space.twoX};
`;

const Heading = styled.div`
  font-size: ${theme.fontSizes.heading};
`;

const HorizontalLine = styled.div`
  height: 1px;
  background: #424242;
`;

const SellerName = styled.span`
  font-size: ${theme.fontSizes.subHeading};
  padding-bottom: ${theme.space.oneX};
`;

const SellerWrapper = styled(Wrapper)`
  margin-bottom: ${theme.space.sevenX};
`;

const StyledTable = styled(Table)`
  font-size: ${theme.fontSizes.default};
`;

const StyledThead = styled.thead`
  font-weight: bold;
`;

const StyledTh = styled.th`
  text-align: ${props => (props.index > 1 ? 'right' : 'left')};
`;

const StyledTd = styled.td`
  text-align: ${props => (props.align === 'right' ? 'right' : 'left')};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  background: ${props => props.noActiveBookings && theme.colors.disabled};
`;

const StyledTrForValues = styled.tr`
  background: ${props => (props.isLive ? '#def1de' : 'white')};
`;

const StyledTrHeading = styled.tr`
  background: ${theme.colors.disabled};
`;

const NoActiveBookingsBox = styled.div`
  padding: ${theme.space.twoX};
  font-size: ${theme.fontSizes.default};
  font-family: ${theme.fonts.default};
  border: #aaa;
  border-style: solid;
  border-width: 1px;
  background: ${theme.colors.disabled};
  width: 100%;
`;

class Bookings extends Component {
  componentDidMount() {
    this.props.getBookingsWithProductDetails();
  }

  render() {
    const { groupedBookings } = this.props;

    return (
      <Wrapper>
        <HeadingWrapper>
          <Heading>Bookings</Heading>
          <HorizontalLine />
        </HeadingWrapper>
        {groupedBookings &&
          groupedBookings.map((groupedBooking, groupedBookingIndex) => (
            <SellerWrapper key={`seller-${groupedBookingIndex}`}>
              <SellerName>{groupedBooking.sellerName}</SellerName>
              {get(groupedBooking, 'bookings', []).length > 0 ? (
                <StyledTable bordered>
                  <StyledThead>
                    <StyledTrHeading>
                      {tableHeadings.map((headingVal, index) => (
                        <StyledTh key={`heading-${index}`} index={index}>
                          {headingVal}
                        </StyledTh>
                      ))}
                    </StyledTrHeading>
                  </StyledThead>
                  <tbody>
                    {get(groupedBooking, 'bookings', []).map(
                      (booking, bookingIndex) =>
                        !booking.isPast && (
                          <StyledTrForValues key={bookingIndex} isLive={booking.isLive}>
                            <StyledTd bold={true}>{booking.id}</StyledTd>
                            <StyledTd>{booking.bookingName}</StyledTd>
                            <StyledTd align={'right'}>{booking.quantity}</StyledTd>
                            <StyledTd align={'right'}>{booking.productRate}</StyledTd>
                            <StyledTd align={'right'}>{booking.cost}</StyledTd>
                            <StyledTd align={'right'}>
                              {format(new Date(booking.startDate), 'PPP')}
                            </StyledTd>
                            <StyledTd align={'right'}>
                              {format(new Date(booking.endDate), 'PPP')}
                            </StyledTd>
                          </StyledTrForValues>
                        )
                    )}
                  </tbody>
                </StyledTable>
              ) : (
                <NoActiveBookingsBox>No active bookings.</NoActiveBookingsBox>
              )}
            </SellerWrapper>
          ))}
      </Wrapper>
    );
  }
}

Bookings.propTypes = {
  groupedBookings: PropTypes.array.isRequired
};

Bookings.defaultProps = {
  groupedBookings: []
};

export default Bookings;
