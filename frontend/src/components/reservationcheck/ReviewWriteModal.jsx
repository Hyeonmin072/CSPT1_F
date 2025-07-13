import React, { useState, useRef } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Rating,
  IconButton,
} from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";
import axiosInstance from "../../axios/AxiosInstance.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function ReviewWriteModal({
  open,
  handleClose,
  reservation,
  onReviewSubmit,
}) {
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewImg, setReviewImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // 모달이 열릴 때 예약 정보 로깅
  React.useEffect(() => {
    if (open && reservation) {
      console.log("=== 예약 정보 ===");
      console.log("전체 예약 데이터:", reservation);
      console.log("예약 ID:", reservation.reservationId);
      console.log("예약 ID 타입:", typeof reservation.reservationId);
      console.log("==================");
    }
  }, [open, reservation]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      // 이미지 파일 타입 체크
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      setReviewImg(file);

      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImg(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setReviewImg(null);
    setPreviewImg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // 중복 제출 방지

    setIsSubmitting(true);
    try {
      // JSON 데이터 생성
      const reviewData = {
        reviewRating: reviewRating.toString(), // String으로 변환
        reviewContent: reviewContent,
        reviewImg: reviewImg ? "이미지_있음" : "", // 빈 문자열로 설정
        reservationId: reservation?.reservationId, // UUID 문자열
      };

      console.log("전송할 데이터 타입 확인:", {
        reviewRating: typeof reviewData.reviewRating,
        reviewContent: typeof reviewData.reviewContent,
        reservationId: typeof reviewData.reservationId,
        reservationIdValue: reviewData.reservationId,
      });

      console.log("리뷰 등록 요청 데이터:", reviewData);

      // API 호출 (JSON 형태로 전송)
      const response = await axiosInstance.post(
        "/user/review/register",
        reviewData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("리뷰 등록 성공:", response.data);

      // 리뷰 제출 완료 콜백 호출
      if (onReviewSubmit && reservation?.reservationId) {
        onReviewSubmit(reservation.reservationId);
      }

      // 성공 메시지 표시
      alert("리뷰가 성공적으로 등록되었습니다.");

      // 모달 닫기
      handleClose();
      // 상태 초기화
      setReviewRating(0);
      setReviewContent("");
      setReviewImg(null);
      setPreviewImg(null);
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      console.error("에러 응답 데이터:", error.response?.data);
      console.error("에러 상태 코드:", error.response?.status);

      let errorMessage = "리뷰 등록에 실패했습니다.";
      if (error.response?.status === 400) {
        errorMessage = `입력 정보를 확인해주세요. (${
          error.response?.data?.message || "상세 오류 없음"
        })`;
        console.error("400 에러 상세:", error.response?.data);
      } else if (error.response?.status === 401) {
        errorMessage = "로그인이 필요합니다.";
      } else if (error.response?.status === 500) {
        errorMessage = "서버 오류가 발생했습니다.";
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    handleClose();
    setReviewRating(0);
    setReviewContent("");
    setReviewImg(null);
    setPreviewImg(null);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="review-modal-title"
      aria-describedby="review-modal-description"
    >
      <Box sx={style}>
        <Typography id="review-modal-title" variant="h6" component="h2" mb={2}>
          리뷰 작성
        </Typography>

        {reservation && (
          <Box mb={3}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              헤어샵: {reservation.shop}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              디자이너: {reservation.designer}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              메뉴: {reservation.menu}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              예약일: {reservation.serviceDate}
            </Typography>
          </Box>
        )}

        <Box mb={3}>
          <Typography component="legend" mb={1}>
            평점
          </Typography>
          <Rating
            name="reviewRating"
            value={reviewRating}
            onChange={(event, newValue) => {
              setReviewRating(newValue);
            }}
            size="large"
          />
        </Box>

        <Box mb={3}>
          <Typography component="legend" mb={1}>
            리뷰 내용
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="서비스에 대한 리뷰를 작성해주세요..."
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <Typography component="legend" mb={1}>
            리뷰 이미지 (선택사항)
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <input
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="image-upload">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            {previewImg && (
              <Box display="flex" alignItems="center" gap={1}>
                <img
                  src={previewImg}
                  alt="리뷰 이미지 미리보기"
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
                <IconButton
                  color="error"
                  size="small"
                  onClick={handleRemoveImage}
                >
                  <Delete />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>

        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={handleCancel}>
            취소
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              reviewRating === 0 || reviewContent.trim() === "" || isSubmitting
            }
          >
            {isSubmitting ? "등록 중..." : "등록"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
