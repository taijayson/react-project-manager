import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { tasksOps } from '../../../redux/tasks';

import spriteDelete from '../../../assets/icons/sprintsDelete.svg';

import styles from './TasksCard.module.scss';

const { taskChangetOperation, taskDeletetOperation } = tasksOps;

export default function TaskCard({ date, task }) {
    const actualDayInTask = task.hoursWastedPerDay.find(
        day => day.currentDay === date,
    );

    const [hours, setHours] = useState(actualDayInTask.singleHoursWasted);
    const [walidHours, setwalidHours] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        actualDayInTask && setHours(actualDayInTask.singleHoursWasted);
    }, [date, actualDayInTask]);

    const changeData = e => {
        const { value } = e.target;
        setHours(value);
    };

    const checkDate = newData => {
        if (hours > 0 && hours <= 8) {
            dispatch(taskChangetOperation(newData, task._id));
            setwalidHours(true);
        } else {
            setwalidHours(false);
        }
    };

    const setchangeData = e => {
        const newData = {
            date,
            hours: e.target.value,
        };
        checkDate(newData);
    };

    const deleteTask = () => {
        dispatch(taskDeletetOperation(task._id));
    };

    return (
        <li className={styles.sprintCard}>
            <p className={styles.sprintCardHead}>{task.title}</p>

            <ul className={styles.sprintCardList}>
                <li className={styles.sprintItem}>
                    <span className={styles.sprintItemText}>
                        Заплановано годин
                    </span>
                    <span className={styles.sprintItemData}>
                        {task.hoursPlanned}
                    </span>
                </li>
                <li className={styles.sprintItem}>
                    <span className={styles.sprintItemText}>
                        Витрачено год / день
                    </span>
                    <input
                        type="text"
                        name="currentHours"
                        value={hours}
                        onChange={changeData}
                        onBlur={setchangeData}
                        className={styles.sprintItemDataInput}
                    />
                    {!walidHours && (
                        <span className={styles.taskInputError}>
                            число от 1 до 8
                        </span>
                    )}
                </li>
                <li className={styles.sprintItem}>
                    <span className={styles.sprintItemText}>
                        Витрачено годин
                    </span>
                    <span className={styles.sprintItemData}>
                        {task.hoursWasted}
                    </span>
                </li>
            </ul>
            <button onClick={deleteTask} className={styles.btnDlt}>
                <svg className={styles.deleteSvg}>
                    <use href={spriteDelete + '#icon-delete'}></use>
                </svg>
            </button>
        </li>
    );
}
