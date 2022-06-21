import { Box, Button, makeStyles, Typography, withStyles } from "@material-ui/core";
import {
  ChevronLeftRounded,
  ChevronRightRounded,
} from "@material-ui/icons";
import clsx from "clsx";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { pageLinks } from ".";
import Header from "./components/Header";
import usePageValidation from "./hooks/usePageValidation";
import { useQueryParams } from "./hooks/useQuery";
import { objToQueryString } from "./utils";
import { getCurriculumData } from "./utils/api";
import vw from "./utils/vw.macro";

const PAGESIZE = 5;
const styleData = [
  {
    color: "#c572ff",
    top: vw(22),
  },
  {
    color: "#FFBA2D",
    top: vw(152),
  },
  {
    color: "#80D10D",
    top: 0,
  },
  {
    color: "#0DBFF5",
    top: vw(92),
  },
  {
    color: "#FF66AB",
    top: vw(22),
  }
]

const useStyles = makeStyles({
  root: {
    position: "relative",
    backgroundColor: "#42BDFF",
    width: "100vw",
    height: "100vh",
    backgroundImage: `url('${require("@assets/stm/bg2.jpg")}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  mainContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    zIndex: 0,
  },
  title: {
    fontSize: vw(62),
    fontFamily: "rooneysansbold, sans-serif",
    color: "#fff",
  },
  itemContainer: {
    display: "flex",
    gap: vw(76),
    height: vw(588),
  },
  buttonStyle: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: vw(100),
    height: vw(100),
    color: "rgba(0,0,0, .5)",
    background: "#fff",
    borderRadius: "50%",
    opacity: 0.6,
  },
  leftStyle: {
    left: "3%",
  },
  rightStyle: {
    right: "3%",
  },
  item: {
    background: "#fff",
    width: vw(339),
    height: vw(436),
    borderRadius: vw(51),
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  },
  itemLeve: {
    position: "absolute",
    display: "block",
    padding: "0",
    left: 0,
    right: 0,
    top: 0,
    bottom: "24.54%",
    "&::before": {
      position: "absolute",
      display: "block",
      content: "''",
      width: vw(30),
      height: vw(20),
      left: vw(24),
      top: vw(24),
      borderRadius: "100%",
      background: "#fff",
      opacity: 0.6,
      transform: "matrix(0.71, -0.71, 0.71, 0.71, 0, 0)",
    },
  },
  itemLeveText1: {
    position: "absolute",
    width: "100%",
    color: "#fff",
    fontSize: vw(55),
    lineHeight: vw(69),
    paddingTop: vw(20),
    textAlign: "center",
    fontFamily: "RooneySans-Black, sans-serif",
    fontWeight: 900,
    fontVariantNumeric: "lining-nums",
    fontFeatureSettings: "tnum",
  },
  itemLeveText2: {
    position: "absolute",
    width: "100%",
    color: "#fff",
    fontSize: vw(244),
    fontStyle: "heavy",
    verticalAlign: "top",
    lineHeight: vw(305),
    paddingTop: vw(36),
    textAlign: "center",
    fontFamily: "RooneySans, sans-serif",
    fontWeight: 900,
    fontVariantNumeric: "lining-nums",
    fontFeatureSettings: "tnum",
  },
  itemImg: {
    position: "absolute",
    bottom: vw(21),
    left: vw(21),
    width: vw(108),
    height: vw(98),
    background: "#ffffff",
    borderRadius: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > img": {
      width: "90%",
    },
  },
  itemAge: {
    position: "absolute",
    bottom: vw(46),
    right: vw(32),
    fontSize: vw(42),
    lineHeight: vw(52),
    fontFamily: "RooneySans, sans-serif",
    fontWeight: 900,
    fontVariantNumeric: "lining-nums",
    fontFeatureSettings: "tnum",
  },
});

const IconButton = withStyles({
  root: {
    background: "#fff",
    width: vw(339),
    height: vw(435),
    borderRadius: vw(60),
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
      background: "#fff",
      borderColor: "none",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "none",
      borderColor: "none",
    },
  },
})(Button);

function LessonItem(props: ILessonData & { index: number, page: number }) {
  const history = useHistory();
  const css = useStyles();
  const { index, page, id } = props

  return (
    <IconButton
      style={{
        top: styleData[index].top,
      }}
      onClick={() => {
        const params = {
          level: (page - 1) * PAGESIZE + index + 1,
          levelId: id,
        };
        history.push(pageLinks.lesson + `?${objToQueryString(params)}`);
      }}
    >
      <Box className={css.itemLeve} style={{ background: styleData[index].color }}>
        <Typography className={css.itemLeveText1}>Level</Typography>
        <Typography className={css.itemLeveText2}>{(page - 1) * PAGESIZE + index + 1}</Typography>
      </Box>
      <Box className={css.itemImg}>
        <img src={props.thumbnail} alt={String((page - 1) * PAGESIZE + index + 1)} />
      </Box>

      <Typography className={css.itemAge} style={{ color: styleData[index].color }}>
        {props.description}
      </Typography>
    </IconButton>
  );
}



export default function SelectClassLevel() {
  const css = useStyles();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const goErrorPage = usePageValidation();
  const [curriculumId] = useQueryParams(["curriculum"]);

  React.useEffect(() => {

    if (!curriculumId) {
      goErrorPage('curriculumId is required');
      return;
    }

    getCurriculumData().then(res => {
      const curriculum = res.find((item: ICurrentData) => item.id === curriculumId)
      const levels = curriculum.levels
      setData(levels)
    }).catch(() => goErrorPage(('curriculumId is invalid')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curriculumId])

  return (
    <>
      <Helmet>
        <title>Select your level</title>
      </Helmet>

      <Box className={css.root}>
        <Header prevLink="/stm/curriculum" />
        <Box className={css.mainContainer}>
          <Box className={css.itemContainer}>
            {data.slice((page - 1) * PAGESIZE, (page - 1) * PAGESIZE + PAGESIZE)
              .map((d: ILessonData, index) => {
                return <LessonItem key={d.id} {...d} index={index} page={page} />;
              })}
          </Box>
          {page !== 1 && <ChevronLeftRounded
            className={clsx(css.buttonStyle, css.leftStyle)}
            onClick={() => setPage(page - 1)}
          />}
          {data.length !== 0 && page !== Math.ceil(data.length / PAGESIZE)
            && <ChevronRightRounded
              className={clsx(css.buttonStyle, css.rightStyle)}
              onClick={() => setPage(page + 1)}
            />}
        </Box>
      </Box>
    </>
  );
}