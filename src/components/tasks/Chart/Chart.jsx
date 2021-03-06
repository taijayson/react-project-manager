import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

import { tasksSls } from '../../../redux/tasks';
import { sprintsSls } from '../../../redux/sprints';

import css from './Chart.module.scss';

const Chart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        chartLine();
    }, []); // eslint-disable-line

    const tasksList = useSelector(tasksSls.getAllTasks);
    const sprintsList = useSelector(sprintsSls.getAllSprints);
    const { sprintId } = useParams();

    const planedHours = tasksList.reduce(
        (acc, task) => (acc += task.hoursPlanned),
        0,
    );

    const duration = sprintsList.find(sprint => sprint._id === sprintId)
        .duration;
    const deltaHours = (planedHours / duration).toFixed(2);

    const getWastedByTask = () => {
        return tasksList.map(task =>
            task.hoursWastedPerDay.reduce((acc, task) => {
                acc.push(task.singleHoursWasted);
                return acc;
            }, []),
        );
    };

    const getWastedLine = () => {
        let myPlanedTasksHours = planedHours;
        const resultArr = [];
        for (let i = 0; i < duration; i += 1) {
            const result = getWastedByTask().reduce((acc, task) => {
                acc += task[i];
                return acc;
            }, 0);
            resultArr.push(
                myPlanedTasksHours - result < 0
                    ? +0
                    : myPlanedTasksHours - result,
            );
            myPlanedTasksHours = myPlanedTasksHours - result;
        }
        return resultArr;
    };

    const getStreightLine = () => {
        const arr = [planedHours];
        let prev = planedHours;
        for (let i = 0; i < duration; i += 1) {
            arr.push((prev - deltaHours).toFixed(1));
            prev = prev - deltaHours;
        }
        return arr;
    };

    const getDatesArray = () => {
        return tasksList.map(task => {
            return task.hoursWastedPerDay.reduce((acc, task) => {
                acc.push(task.currentDay);
                return acc;
            }, []);
        });
    };

    const chartLine = () => {
        setChartData({
            labels: ['??????????????', ...getDatesArray()[0]],
            datasets: [
                {
                    label: '?????????????????? ???????????????? ???????????????????????? ?? ??????????????',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(140, 114, 223,0.7)',
                    borderColor: 'rgba(140, 114, 223,0.7)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(140, 114, 223,0.7)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(255,118,95,1)',
                    pointHoverBorderColor: 'rgba(140, 114, 223,0.7)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: [planedHours, ...getWastedLine()],
                },
                {
                    label: '?????????????????????? ???????????????? ????????????????????????',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(255,118,95,0.7)',
                    borderColor: 'rgba(255,118,95,0.7)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(255,118,95,0.7)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(140, 114, 223,1)',
                    pointHoverBorderColor: 'rgba(255,118,95,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: [...getStreightLine()],
                },
            ],
        });
    };

    return (
        <>
            <div className={css.chartBox}>
                <p className={css.title}>Burndown Chart (Calendar Team)</p>
                <div>
                    <Line data={chartData} width={900} height={450} />
                </div>
            </div>
        </>
    );
};
export default Chart;
