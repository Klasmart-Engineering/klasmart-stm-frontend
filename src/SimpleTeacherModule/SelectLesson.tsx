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
import useQuery from './hooks/useQuery';
import { getLessonPlans } from './utils/api';

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
	const query = useQuery();
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
	const [lessonPlans, setLessonPlans] = useState<IUnitState[]>([]);
	let levelId = query.get('levelId') || '';
	useEffect(() => {
		let data = {
			id: '',
			name: '',
			thumbnail: '',
			description: '',
			units: [],
		};
		const getLessons = async () => {
			try {
				data = await getLessonPlans(levelId);
			} catch (error) {}
			// data.units.forEach((item: IUnitState, index: any) => {
			// 	item.no = index + 1;
			// 	item.unitId = index + 1 + '';
			// 	item.lesson_plans.forEach(
			// 		(lessonItem: LessonItem, lessonItemIndex: any) => {
			// 			lessonItem.no = lessonItemIndex + 1;
			// 		}
			// 	);
			// });
			let arr: IUnitState[] = [];
			let arrData: IUnitState[] = data.units;
			let arrayLength = arrData.length;
			for (let i = 0; i < arrayLength; i++) {
				arr[i] = arrData[i];
				arr[i].no = i + 1;
				arr[i].unitId = i + 1 + '';
				for (let j = 0; j < arrData[i].lesson_plans.length; j++) {
					arr[i].lesson_plans[j].no = j + 1;
				}
			}
			setLessonPlans(data.units);
		};
		getLessons();
	}, [levelId]);

	const handleScroll = useCallback(() => {
		if (!needScrollEvent.current) {
			needScrollEvent.current = true;
			return;
		}
		const scrollEle = document.getElementById('lessonbox');
		const scrollY = scrollEle?.scrollTop || 0;
		const parentHeightHalf =
			(scrollEle?.getBoundingClientRect().height ?? 0) / 2;
		if (scrollY) {
			for (let index = 0; index < lessonPlans.length; index++) {
				const itemEl = document.getElementById(lessonPlans[index].unitId);
				const targetUnitScrollHeight = itemEl?.offsetTop || 0;
				const itemSelfHeight = itemEl?.getBoundingClientRect().height ?? 0;
				if (
					(targetUnitScrollHeight - scrollY < parentHeightHalf &&
						targetUnitScrollHeight - scrollY > 0) ||
					itemSelfHeight + targetUnitScrollHeight > scrollY + parentHeightHalf
				) {
					setRootState?.({
						...rootState,
						currentUnit: lessonPlans[index].unitId,
					});
					break;
				}
			}
		}
	}, [setRootState, rootState]);

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
		<Box className={css.root}>
			<Header showTitle backgroudColor={'#43A1FF'} prevLink='/stm/level' />
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
	);
}
