import * as React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import withRoot from './withRoot';
 
import Scrollbar from './modules/components/ScrollBar';
import SeverityPill from './modules/components/SeverityPill';
 
import { orderList } from './config/ApiService';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import {Link} from '@mui/material';

import {
    Box,
    Button,
    Card,
    CardActions,
    CardHeader,
    Divider,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
  } from '@mui/material';
 

  const statusMap = {
    pending: 'warning',
    delivered: 'success',
    refunded: 'error'
  };


function OrderList(props) {
    const { sx } = props; 
    const email = localStorage.getItem("USER_ID");

    const {status, data: orders, error} = useQuery("orderlist", orderList);

    if (status === "loading") {
        return <span>Loading...</span>;
    }
    
    if (status === "error") {
        return <span>Error: {error.message}</span>;
    }
    return (
        <>
        <AppAppBar />
        <Card sx={sx}>
          <CardHeader title="신청목록" />
          <Scrollbar sx={{ flexGrow: 1 }}>
            <Box sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow >
                    <TableCell align='center'>
                      작성일
                    </TableCell>
                    <TableCell align='center'>
                      장소
                    </TableCell>
                    <TableCell sortDirection="desc" align='center'>
                      여행기간
                    </TableCell>
                    <TableCell align='center'>
                      진행상태
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => { 
                    return (
                      <TableRow
                        hover
                        key={order.orderId} 
                      >
                        <TableCell align='center'>
                            {dayjs(order.createDate).format('YYYY-MM-DD')}
                        </TableCell>
                        <TableCell align='center'>
                           {order.orderLocation} 
                        </TableCell>
                        <TableCell align='center'>
                            <Link
                            underline="none"
                            href={"/order/" + order.orderId}
                            >
                                {order.startedAt} ~ {order.endedAt}
                            </Link>                           
                        </TableCell>
                        <TableCell align='center'>
                          <SeverityPill color={statusMap[order.orderStatus]}>
                            {order.orderStatus}
                          </SeverityPill>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Scrollbar>
          {/* <Divider /> */}
          {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              color="inherit"
              endIcon={(
                <SvgIcon fontSize="small">
                  <ArrowRightIcon />
                </SvgIcon>
              )}
              size="small"
              variant="text"
            >
              View all
            </Button>
          </CardActions> */}
        </Card>
        </>
      );
    }
 
 
    export default withRoot(OrderList);

 