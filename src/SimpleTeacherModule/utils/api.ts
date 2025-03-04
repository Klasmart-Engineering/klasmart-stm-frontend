import axios from "axios";
const basicPath = `${process.env.PUBLIC_URL}/stm-mock`;

type Params = { [key: string]: string };
const generateURLParams = (params: Params): string => {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    if (params.hasOwnProperty(key) && params[key]) {
      searchParams.set(key, params[key]);
    }
  }
  return searchParams.toString();
};

function geUnits(params: Params = {}) {
  return axios.get(`${basicPath}/units.json?${generateURLParams(params)}`).then((res) => res.data);
}

// function getLessonPlan(unitid: string, params: Params = {}) {
//   return axios.get(`${basicPath}/${unitid}/lesson_plans.json?${generateURLParams(params)}`).then((res) => res.data);
// }

function getLessonPlan(params: Params = {}) {
  return axios.get(`${basicPath}/units.json?${generateURLParams(params)}`).then((res) => res.data);
}

function geLessonMaterials(planid: string) {
  return axios.get(`data/lesson_plans/${planid}.json`).then((res) => res.data.materials);
}

function getCurriculumData() {
  return axios.get(`/data/curriculums/curriculums.json`).then(res => res.data)
}

function getLessonPlans(level_id:string) {
  return axios.get(`data/levels/${level_id}.json`).then(res => res.data)
}

export { geUnits, getLessonPlan, geLessonMaterials, getCurriculumData, getLessonPlans };
