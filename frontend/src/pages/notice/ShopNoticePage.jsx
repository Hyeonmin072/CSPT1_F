import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BusinessHeader from "../../components/common/BusinessHeader.jsx";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

const ShopNoticePage = () => {
  const navigate = useNavigate();
  const [notice, setNotice] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("공지사항 등록 요청 데이터:", notice);
      const response = await axios.post("/shop/notice", notice);
      console.log("공지사항 등록 응답:", response.data);
      alert("공지사항이 등록되었습니다.");
      navigate("/shop/notices"); // 공지사항 목록 페이지로 이동
    } catch (error) {
      console.error("공지사항 등록 실패:", error);
      console.error("에러 상세 정보:", error.response?.data);
      alert("공지사항 등록에 실패했습니다.");
    }
  };

  return (
    <div>
      <BusinessHeader />
      <Container maxWidth="md">
        <Box sx={{ mt: 16, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            공지사항 등록
          </Typography>
          <Paper sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="제목"
                name="title"
                value={notice.title}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="내용"
                name="content"
                value={notice.content}
                onChange={handleChange}
                margin="normal"
                required
                multiline
                rows={6}
              />
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/shop/notices")}
                >
                  취소
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  등록
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default ShopNoticePage;
