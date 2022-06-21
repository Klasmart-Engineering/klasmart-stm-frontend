import { Box, Button, makeStyles, Typography, withStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { pageLinks } from "./index";
import { getCurriculumData } from "./utils/api";
import vw from "./utils/vw.macro";

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
        history.push(pageLinks.level + `?curriculum=` + props.item.id);
      }}
    >
      <img src={props.item.thumbnail} alt={props.item.name} />
    </IconButton>
  );
}

export default function SelectCurriculum() {
  const css = useStyles();
  const [curriculumData, setCurriculumData] = React.useState<ICurriculumItem[]>([]);
  React.useEffect(() => {
    getCurriculumData().then(data => setCurriculumData(data));
  }, [])
  return (
    <>
      <Helmet>
        <title>Select your curriculum</title>
      </Helmet>
      <Box className={css.root}>
        <Typography className={css.title} variant="h3">
          Select your curriculum
        </Typography>
        <Box className={clsx(css.itemContainer, curriculumData.length === 4 && css.itemContainerWrap)}>
          {curriculumData.map(item => (
            <CurriculumItem item={item} key={item.id} />
          ))}
        </Box>
      </Box>
    </>
  );
}
