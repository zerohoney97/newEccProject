import { useCallback, useEffect, useRef, useState } from "react";
import NavBar from "../util/NavBar";
import {
  PreTestContainer,
  ButtonContainer,
  BackButton,
} from "../Evaluation/evaluationStyleComponent";
import { ReactComponent as DropDownSVG } from "../Resource/svg/dropDown.svg";
import { useDispatch, useSelector } from "react-redux";
import PostTestResultTable from "./PostTestResultTable";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const PostTestResult = ({isMobile}:{isMobile:any}) => {
  const selectedStudentInformaion = useSelector((state: any) => {
    return state.studentInformation;
  });
  const [tableData, setTableData] = useState<any>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const bigCategory = searchParams.get("bigCategory");
  const smallCategory = searchParams.get("smallCategory");
  const date = searchParams.get("date");
  useEffect(() => {
  // 학생의 사전평가 정보를 불러옴
    axios
      .get("/getStudentPostEvaluationData", {
        params: { studentData: selectedStudentInformaion },
      })
      .then((res) => {
        console.log(res.data);
        filterdResult(res.data);
      });
  }, []);

  // 불러온 여러 object array형식의 결과 데이터를 querystring으로 불러온 대항목,소항목,평가날짜와 uid로 비교하여 table데이터에 저장
  const filterdResult = async (data: any) => {
    data.forEach((a: any) => {
      if (
        a.uid === selectedStudentInformaion.uid &&
        a.bigCategory === bigCategory &&
        a.smallCategory === smallCategory &&
        a.date === date
      ) {
        setTableData(a);
      }
    });
  };
  return (
    <>
      
      <PreTestContainer>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>사후평가</h1>
          <div style={{ alignSelf: "end" }}>
            <span style={{ color: "#999999" }}>반,이름:</span>
            <span style={{ fontWeight: "bold" }}> 3A김현아</span>
            <span style={{ color: "#999999" }}> 대문항:</span>
            <span style={{ fontWeight: "bold" }}> 보조공학</span>
            <span style={{ color: "#999999" }}> 소문항:</span>
            <span style={{ fontWeight: "bold" }}> 책마루</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        ></div>
        {tableData !== null && (
          <PostTestResultTable tableData={tableData}></PostTestResultTable>
        )}

        <ButtonContainer>
          <BackButton
            onClick={() => {
              window.history.back();
            }}
          >
            이전으로
          </BackButton>
        </ButtonContainer>
      </PreTestContainer>
    </>
  );
};
export default PostTestResult;