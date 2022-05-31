import { Box, Button, makeStyles, Typography, withStyles } from "@material-ui/core";
import {
  ChevronLeftRounded,
  ChevronRightRounded,
} from "@material-ui/icons";
import clsx from "clsx";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { pageLinks } from ".";
import Header from "./components/Header";
import useQuery from "./hooks/useQuery";
import { objToQueryString } from "./utils";
import vw from "./utils/vw.macro";

const PAGESIZE = 5;
const styleDate = [
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

const data: ILessonData[] = [
  {
    "id": "0fe4a0b7-7fbd-419a-b0b3-852331cd7722",
    "level": 1,
    "name":"Bada Rhyme",
    "thumbnail": "https://cms.alpha.kidsloop.net/static/media/bada-rhyme.07b94224.png",
    "description": "Age 4-5"
  },
  {
    "id": "369cff1c-82f7-4f7f-824e-367e9783ff93",
    "level": 2,
    "name": "Bada Genius",
    "thumbnail": "https://cms.alpha.kidsloop.net/static/media/bada-genius.c01c6e23.png",
    "description": "Age 5-6"
  },
  {
    "id": "daa96eb0-fe7a-4554-bb28-6c08871f9a08",
    "level": 3,
    "name": "Bada Talk",
    "thumbnail": "https://cms.alpha.kidsloop.net/static/media/bada-talk.0b432b3e.png",
    "description": "Age 6-7"
  },
  {
    "id": "fe98b7ce-365f-4123-a5ff-b89519dd933c",
    "level": 4,
    "name": "Bada Sound",
    "thumbnail": "https://cms.alpha.kidsloop.net/static/media/bada-sound.427858f8.png",
    "description": "Age 7-8"
  },
  {
    "id": "6d8bed09-87ff-49a7-b0b5-24e80a64552a",
    "level": 5,
    "name": "Bada Read",
    "thumbnail": "https://cms.alpha.kidsloop.net/static/media/bada-read.c5380a1f.png",
    "description": "Age 8-9"
  },

  {
    "id": "0fe4a0b7-7fbd-419a-b0b3-852331cd7722",
    "level": 6,
    "name":"Bada Rhyme",
    "thumbnail": "https://cms.alpha.kidsloop.net/static/media/bada-rhyme.07b94224.png",
    "description": "Age 4-5"
  },
  {
    "id": "369cff1c-82f7-4f7f-824e-367e9783ff93",
    "level": 7,
    "name": "Bada Genius",
    "thumbnail": "https://cms.alpha.kidsloop.net/static/media/bada-genius.c01c6e23.png",
    "description": "Age 5-6"
  },
  {
    "id": "daa96eb0-fe7a-4554-bb28-6c08871f9a08",
    "level": 8,
    "name": "Bada Talk",
    "thumbnail": "https://cms.alpha.kidsloop.net/static/media/bada-talk.0b432b3e.png",
    "description": "Age 6-7"
  },
  {
    "id": "fe98b7ce-365f-4123-a5ff-b89519dd933c",
    "level": 9,
    "name": "Bada Sound",
    "thumbnail": "https://cms.alpha.kidsloop.net/static/media/bada-sound.427858f8.png",
    "description": "Age 7-8"
  },
  {
    "id": "6d8bed09-87ff-49a7-b0b5-24e80a64552a",
    "level": 10,
    "name": "Bada Read",
    "thumbnail": "https://cms.alpha.kidsloop.net/static/media/bada-read.c5380a1f.png",
    "description": "Age 8-9"
  },
  {
    "id": "0fe4a0b7-7fbd-419a-b0b3-852331cd7722",
    "level": 11,
    "name":"Bada Rhyme",
    "thumbnail": "https://cms.alpha.kidsloop.net/static/media/bada-rhyme.07b94224.png",
    "description": "Age 4-5"
  },
  {
    "id": "369cff1c-82f7-4f7f-824e-367e9783ff93",
    "level": 12,
    "name": "Bada Genius",
    "thumbnail": "https://cms.alpha.kidsloop.net/static/media/bada-genius.c01c6e23.png",
    "description": "Age 5-6"
  },
  {
    "id": "daa96eb0-fe7a-4554-bb28-6c08871f9a08",
    "level": 13,
    "name": "Bada Talk",
    "thumbnail": "https://cms.alpha.kidsloop.net/static/media/bada-talk.0b432b3e.png",
    "description": "Age 6-7"
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

function LessonItem(props: ILessonData & {index: number} ) {
  const history = useHistory();
  const css = useStyles();
  const query = useQuery();
  return (
    <IconButton
      style={{
        top: styleDate[props.index].top,
      }}
      onClick={() => {
        const params = {
          level: props.level,
          levelId: props.id,
          curriculum: query.get('curriculum'),
          title: props.name
        };
        history.push(pageLinks.lesson + `?${objToQueryString(params)}`);
      }}
    >
      <Box className={css.itemLeve} style={{ background: styleDate[props.index].color }}>
        <Typography className={css.itemLeveText1}>Level</Typography>
        <Typography className={css.itemLeveText2}>{props.level}</Typography>
      </Box>
      <Box className={css.itemImg}>
        <img src={props.thumbnail} alt={String(props.level)} />
      </Box>

      <Typography className={css.itemAge} style={{ color: styleDate[props.index].color }}>
        {props.description}
      </Typography>
    </IconButton>
  );
}



export default function SelectClassLevel() {
  const css = useStyles();
  const [page, setPage] = useState(1);

  const handleChangePage = (page: number) => {
    setPage(page)
  }

  return (
    <Box className={css.root}>
      <Header prevLink="/stm/curriculum" />
      <Box className={css.mainContainer}>
        <Box className={css.itemContainer}>
          {data.slice((page - 1) * PAGESIZE, (page - 1) * PAGESIZE + PAGESIZE)
          .map((d, index) => {
            return <LessonItem key={d.level} {...d} index={index}/>;
          })}
        </Box>
        {page !== 1 && <ChevronLeftRounded 
          className={clsx(css.buttonStyle, css.leftStyle)}
          onClick={() => handleChangePage(page - 1)}
        /> }
        {data.length !== 0 && page !== Math.ceil(data.length / PAGESIZE)
        && <ChevronRightRounded 
          className={clsx(css.buttonStyle, css.rightStyle)}
          onClick={() => handleChangePage(page + 1)}
        />}
      </Box>
    </Box>
  );
}
