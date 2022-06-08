interface IContextState {
  curriculum?: "esl" | "steam";
  classLevel?: 1 | 2 | 3 | 4 | 5;
  unitId?: string;
  planId?: string;
  lessonId?: number;
  presentState?: IPresentState;
  title?: string;
  currentUnit?: string;
  scrollTo?: (unitId: string) => void;
}

interface IPresentState {
  activeIndex?: number;
  listLength?: number;
  isFullscreen?: boolean;
}

interface IVideoState {
  isMedia?: boolean;
  isPlaying?: isVideoPlaying;
  isMute?: video.muted;
  currentTime?: number;
  duration?: number;
}

interface ILessonData {
  id: string;
  thumbnail: string;
  description: string;
  name: string;
  // no: number;
  // color: string;
  // top: React.CSSProperties["top"];
}

interface ICurrentData {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  levels: ILessonData[];
}

interface INavIcon {
  src: string;
  onClick: () => void;
}

interface IListItemProps {
  active?: boolean;
  thumbnail: string;
  onClick: () => void;
  itemRef: (button: HTMLButtonElement) => void;
}

interface IListItem {
  content_id: string;
  data: string;
  description: string;
  id: string;
  name: string;
  no: number;
  thumbnail: string;
}
interface IPresentListProps {
  list: Array<IListItem>;
}

interface IPlayerProps {
  data: {
    source: string;
    file_type: number;
    input_source: number;
  };
  lessonNo?: number | string;
  thumbnail?: string;
  name?: string;
}

interface IUnitState {
  unitId: string;
  id: string;
  name: string;
  no: number;
  lesson_plans: Array<LessonItem>;
}

interface LessonItem {
  unitId: string;
  unitNo: number;
  id: string;
  name: string;
  no: number;
  thumbnail: string;
  description: string;
  content_id: string;
}
interface ITeachingList {
  unitId: string;
  id: string;
  name: string;
  no: number;
  lesson_plans: Array<LessonItem>;
}

interface IMediaControlProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

interface IPresentNavProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}
interface IVideoPlayerProps {
  source: string;
  poster?: string;
}

interface ICurriculumItem{
  id?: string;
  name?: string;
  thumbnail?: string;
  description?: string;
  levels?: ILessonData[];
}

interface ILessonPlan {
  id: string;
  name: string;
  thumbnail?: string;
  description?:string,
  units:Array<IUnitState>
}