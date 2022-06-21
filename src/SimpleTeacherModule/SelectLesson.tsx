import { Box, Grid, makeStyles } from '@material-ui/core';
import {
	useContext,
	useState,
	useEffect,
	useCallback,
	useLayoutEffect,
	useRef,
} from 'react';
import Header from './components/Header';
import UnitsSelector from './components/UnitsSeletor';
import { StmContext } from './contexts';
import LessonBox from './LessonBox';
import vw from './utils/vw.macro';
import { useQueryParams } from './hooks/useQuery';
import { getLessonPlans } from './utils/api';
import usePageValidation from './hooks/usePageValidation';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles({
	root: {
		width: '100%',
		height: '100vh',
		backgroundColor: '#C5DDFF',
		position: 'relative',
		fontFamily: 'RooneySans, sans-serif',
		fontWeight: 800,
		fontVariantNumeric: 'lining-nums',
		fontFeatureSettings: 'tnum',
	},
	container: {
		height: '100%',
		display: 'flex',
		flexDirection: 'row',
		padding: `${vw(130)} 0 0 0`,
		boxSizing: 'border-box',
	},
	lessonbox: {
		height: '100%',
		width: '100%',
		overflowY: 'scroll',
	},
	unitSelector: {
		paddingBottom: vw(20),
		margin: `0 ${vw(75)} 0 ${vw(97)}`,
		boxSizing: 'border-box',
		width: vw(130),
		height: '100%',
	},
});

export default function SelectLesson() {
	const css = useStyles();
	const { setRootState, ...rootState } = useContext(StmContext);
	const needScrollEvent = useRef(true);
	const { currentUnit } = rootState;
	const scrollTo = useCallback((unitId: string) => {
		const element = document.getElementById(unitId || '');
		needScrollEvent.current = false;
		element && (element as HTMLElement).scrollIntoView();
	}, []);
	const unitChange = (unit: IUnitState, isJump: boolean) => {
		if (isJump) {
			unit && scrollTo(unit.unitId);
		}
	};
	const [headerTitle, setHeaderTitle] = useState('');
	const [lessonPlans, setLessonPlans] = useState<IUnitState[]>([]);
	const [levelId, level] = useQueryParams(['levelId', 'level']);
	const goErrorPage = usePageValidation();
	useEffect(() => {
		if (!levelId || !level) {
			goErrorPage('levelId or level are required');
			return;
		}
		let data = {
			id: '',
			name: '',
			thumbnail: '',
			description: '',
			units: [],
		};
		const getLessons = async () => {
			try {
				data = levelId && (await getLessonPlans(levelId));
				setHeaderTitle(data.name);
				data.units.forEach((item: IUnitState, index: any) => {
					item.no = index + 1;
					item.unitId = index + 1 + '';
					item.lesson_plans.forEach(
						(lessonItem: LessonItem, lessonItemIndex: any) => {
							lessonItem.no = lessonItemIndex + 1;
						}
					);
				});
				setLessonPlans(data.units);
			} catch (error) {
				goErrorPage();
			}
		};
		getLessons();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [level, levelId]);

	const handleScroll = useCallback(() => {
		if (!needScrollEvent.current) {
			needScrollEvent.current = true;
			return;
		}
		const scrollEle = document.getElementById('lessonbox');
		const scrollY = scrollEle?.scrollTop || 0;
		const scrollHeight = scrollEle?.scrollHeight || 0;
		const clientHeight = scrollEle?.clientHeight || 0;
		const parentHeightHalf =
			(scrollEle?.getBoundingClientRect().height ?? 0) / 4;

		if (scrollY === 0) {
			setRootState?.({
				...rootState,
				currentUnit: '1',
			});
		}
		if (scrollY) {
			for (let index = 0; index < lessonPlans.length; index++) {
				const itemEl = document.getElementById(lessonPlans[index].unitId);
				const targetUnitScrollHeight = itemEl?.offsetTop || 0;
				const itemSelfHeight = itemEl?.getBoundingClientRect().height ?? 0;
				if (
					targetUnitScrollHeight - scrollY >
					parentHeightHalf - itemSelfHeight
				) {
					setRootState?.({
						...rootState,
						currentUnit: lessonPlans[index].unitId,
					});
					break;
				}
				if (scrollHeight - scrollY <= clientHeight + 1) {
					setRootState?.({
						...rootState,
						currentUnit: lessonPlans[lessonPlans.length - 1].unitId,
					});
					break;
				}
			}
		}
	}, [setRootState, rootState, lessonPlans]);

	useLayoutEffect(() => {
		const scrollEle = document.getElementById('lessonbox');
		if (scrollEle) {
			scrollEle.addEventListener('scroll', handleScroll);
		}
		return () => {
			scrollEle && scrollEle.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll]);

	return (
		<>
			<Helmet>
				<title>Select lesson</title>
			</Helmet>
			<Box className={css.root}>
				<Header
					title={headerTitle}
					showTitle
					backgroudColor={'#43A1FF'}
					prevLink='/stm/level'
				/>
				<Grid className={css.container}>
					<Box className={css.unitSelector}>
						<UnitsSelector
							data={lessonPlans}
							chosenUnit={currentUnit}
							onChange={unitChange}
						/>
					</Box>
					<Box id='lessonbox' className={css.lessonbox}>
						<LessonBox data={lessonPlans}></LessonBox>
					</Box>
				</Grid>
			</Box>
		</>
	);
}
