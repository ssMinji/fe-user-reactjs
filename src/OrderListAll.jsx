import * as React from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import withRoot from "./withRoot";

import Scrollbar from "./modules/components/ScrollBar";
import SeverityPill from "./modules/components/SeverityPill";

import { orderList } from "./config/ApiService";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import { Link } from "@mui/material";

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
  TableRow,
} from "@mui/material";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

function OrderListAll(props) {
  const { sx } = props;
  const email = localStorage.getItem("USER_ID");

  const { status, data: orders, error } = useQuery("orderlist", orderList);

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
        <CardHeader title="" />
        <Scrollbar sx={{ flexGrow: 1 }}>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">아이디</TableCell>
                  <TableCell align="center">사업자등록번호</TableCell>
                  <TableCell align="center">이름</TableCell>
                  <TableCell sortDirection="desc" align="center">
                    핸드폰번호
                  </TableCell>
                  <TableCell align="center">상태</TableCell>
                  <TableCell sortDirection="desc" align="center">
                    가입일시
                  </TableCell>
                  <TableCell sortDirection="desc" align="center">
                    승인일시
                  </TableCell>
                  <TableCell align="center">가입승인</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {orders.map((order) => { 
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
                  })} */}
                <TableRow hover key={1}>
                  <TableCell align="center">sk01</TableCell>
                  <TableCell align="center">2208116503</TableCell>
                  <TableCell align="center">김철수</TableCell>
                  <TableCell align="center">01012341234</TableCell>
                  <TableCell align="center">승인 대기</TableCell>
                  <TableCell align="center">2023-08-01 09:30:33 </TableCell>
                  <TableCell align="center">- </TableCell>
                  <TableCell align="center">
                    <Button color="info" size="small" variant="text">
                      승인
                    </Button>
                    <Button color="secondary" size="small" variant="text">
                      반려
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow hover key={1}>
                  <TableCell align="center">user04</TableCell>
                  <TableCell align="center">2208116503</TableCell>
                  <TableCell align="center">강한나</TableCell>
                  <TableCell align="center">01055556666</TableCell>
                  <TableCell align="center">승인 대기</TableCell>
                  <TableCell align="center">2023-07-28 09:30:33 </TableCell>
                  <TableCell align="center">- </TableCell>
                  <TableCell align="center">
                    <Button color="info" size="small" variant="text">
                      승인
                    </Button>
                    <Button color="secondary" size="small" variant="text">
                      반려
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow hover key={1}>
                  <TableCell align="center">user99</TableCell>
                  <TableCell align="center">1208116503</TableCell>
                  <TableCell align="center">오수진</TableCell>
                  <TableCell align="center">01033442929</TableCell>
                  <TableCell align="center">승인 대기</TableCell>
                  <TableCell align="center">2023-07-26 09:30:33 </TableCell>
                  <TableCell align="center">- </TableCell>
                  <TableCell align="center">
                    <Button color="info" size="small" variant="text">
                      승인
                    </Button>
                    <Button color="secondary" size="small" variant="text">
                      반려
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow hover key={1}>
                  <TableCell align="center">user02</TableCell>
                  <TableCell align="center">2208116503</TableCell>
                  <TableCell align="center">홍길동</TableCell>
                  <TableCell align="center">01012345678</TableCell>
                  <TableCell align="center">반려</TableCell>
                  <TableCell align="center">2023-08-01 09:30:33 </TableCell>
                  <TableCell align="center">2023-08-05 15:06:22 </TableCell>
                  <TableCell align="center">반려</TableCell>
                </TableRow>
                <TableRow hover key={1}>
                  <TableCell align="center">user03</TableCell>
                  <TableCell align="center">2208116503</TableCell>
                  <TableCell align="center">공지철</TableCell>
                  <TableCell align="center">01098765678</TableCell>
                  <TableCell align="center">승인</TableCell>
                  <TableCell align="center">2023-08-04 09:30:33 </TableCell>
                  <TableCell align="center">2023-08-10 15:06:22 </TableCell>
                  <TableCell align="center">승인</TableCell>
                </TableRow>
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

export default withRoot(OrderListAll);
