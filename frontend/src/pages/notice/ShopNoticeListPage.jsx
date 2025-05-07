import React, { useEffect, useState } from "react";
import axios from "axios";
import BusinessHeader from "../../components/common/BusinessHeader.jsx";
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ShopNoticeListPage = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("/shop/notices");
        console.log("공지사항 목록:", response.data);
        setNotices(response.data);
      } catch (error) {
        console.error("공지사항 목록 조회 실패:", error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div>
      <BusinessHeader />
      <Container maxWidth="lg">
        <Box sx={{ mt: 16, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            공지사항 목록
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>번호</TableCell>
                  <TableCell>제목</TableCell>
                  <TableCell>작성일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notices.map((notice, index) => (
                  <TableRow key={notice.id || index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{notice.title}</TableCell>
                    <TableCell>
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
};

export default ShopNoticeListPage;
