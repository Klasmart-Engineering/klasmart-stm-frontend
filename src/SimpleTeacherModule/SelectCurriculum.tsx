// import eslImg from "@assets/stm/esl.png";
// import steamImg from "@assets/stm/steam.png";
import { Box, Button, makeStyles, Typography, withStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useHistory } from "react-router-dom";
import { pageLinks } from "./index";
import vw from "./utils/vw.macro";

const curriculumData: ICurriculumItem[] = [
  {
    id: "3e31068e-7fe1-46a7-bcc4-264622c72934",
    no: 1,
    name:"ESL",
    thumbnail: "https://cms.alpha.kidsloop.net/static/media/esl.b5435761.png",
    description: "Bada loves to play with Teddy Bear. His doll also helps him go to sleep."
  },
  {
    id: "17385fb8-7c73-4ee1-918a-fadc3f31483a",
    no: 2,
    name: "STEAM",
    thumbnail: "https://cms.alpha.kidsloop.net/static/media/steam.146d272c.png",
    description: "Badanamu Steam"
  },
  {
    id: "3e31068e-7fe1-46a7-bcc4-264622c76934",
    no: 1,
    name:"ESL",
    thumbnail: "https://cms.alpha.kidsloop.net/static/media/esl.b5435761.png",
    description: "Bada loves to play with Teddy Bear. His doll also helps him go to sleep."
  },
  {
    id: "17385fb8-7c73-4ee1-918a-fadc3f31083a",
    no: 2,
    name: "STEAM",
    thumbnail: "https://cms.alpha.kidsloop.net/static/media/steam.146d272c.png",
    description: "Badanamu Steam"
  }
]

const useStyles = makeStyles({
  root: {
    backgroundColor: "#42BDFF",
    width: "100vw",
    height: "100vh",
    backgroundImage: `url('${require("@assets/stm/bg.jpg")}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: vw(69),
    lineHeight: vw(86),
    paddingBottom: vw(54),
    fontFamily: "RooneySans, sans-serif",
    fontWeight: 900,
    fontVariantNumeric: "lining-nums",
    fontFeatureSettings: "tnum",
    color: "#274EAF",
  },
  itemContainer: {
    display: "flex",
    alignItems: "flex-start",
    height: vw(415),
    gap: vw(46),
  },
  itemContainerWrap: {
    flexWrap: "wrap",
    alignContent: "flex-start",
    width: vw(1342),
    height: vw(900),
  }
});

const IconButton = withStyles({
  root: {
    background: "#fff",
    width: vw(648),
    height: vw(392),
    borderRadius: `${vw(100)} ${vw(40)} ${vw(100)}  ${vw(100)}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    "& img": {
      height: vw(276),
    },
    "&:hover": {
      transform: "scale(1.06)",
      backgroundColor: "#fff",
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

function CurriculumItem(props: { item: ICurriculumItem }) {
  const history = useHistory();
  return (
    <IconButton
      onClick={() => {
        history.push(pageLinks.level + `?curriculum=` + props.item.id );
      }}
    >
      <img src={props.item.thumbnail} alt={props.item.name} />
    </IconButton>
  );
}

export default function SelectCurriculum() {
  const css = useStyles();
  const length = curriculumData.length;
  return (
    <Box className={css.root}>
      <Typography className={css.title} variant="h3">
        Select your curriculum
      </Typography>
      <Box className={clsx(css.itemContainer, length === 4 && css.itemContainerWrap)}>
        {curriculumData.map(item => (
          <CurriculumItem item={item} key={item.id} />
        ))}
      </Box>
    </Box>
  );
}
