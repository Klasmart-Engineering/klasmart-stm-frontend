/// <reference path="index.d.ts" />

import "@assets/stm/font/stylesheet.css";
import { CircularProgress } from "@material-ui/core";
import React, { Suspense } from "react";
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { intialState, intialVideoState, StmContext, VideoContext } from "./contexts";

const PresentActivity = React.lazy(() => import("./PresentActivity"));
const SelectClassLevel = React.lazy(() => import("./SelectClassLevel"));
const SelectCurriculum = React.lazy(() => import("./SelectCurriculum"));
const SelectLesson = React.lazy(() => import("./SelectLesson"));
const Error = React.lazy(() => import("./Error"));

enum pageLinks {
  curriculum = "/",
  lesson = "/lesson",
  level = "/level",
  present = "/present",
}

export default function Stm() {
  const [rootState, setRootState] = React.useState<IContextState>(intialState);
  const [videoState, setVideoState] = React.useState<IVideoState>(intialVideoState);
  return (
    <StmContext.Provider
      value={{
        ...rootState,
        setRootState,
      }}
    >
      <Suspense fallback={<CircularProgress />}>
        <Router>
          <Switch>
            <Route exact path={pageLinks.curriculum}>
              <SelectCurriculum />
            </Route>
            <Route path={pageLinks.lesson}>
              <SelectLesson />
            </Route>
            <Route path={pageLinks.level}>
              <SelectClassLevel />
            </Route>
            <Route path={pageLinks.present}>
              <VideoContext.Provider
                value={{
                  ...videoState,
                  setVideoState,
                }}
              >
                <PresentActivity />
              </VideoContext.Provider>
            </Route>
            <Route path="/error">
              <Error />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </StmContext.Provider>
  );
}


export { pageLinks };
