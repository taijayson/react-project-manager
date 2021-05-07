import React from 'react';
import projects from './data';
import deleteBtn from '../../assets/icons/deleteSprite.svg';
import addBtn from '../../assets/icons/addBtnSprite.svg';
import css from './Projects.module.scss';


const ProjectsList = () => {

    return (
        <div className={css.projectsContainer}>
            <h1 className={css.projectsTitle}>Проекти</h1>
            <ul className={css.projectsList}>
                {projects.map(project => (
                    <li className={css.projectsListItem}>
                        <div className={css.projectsItemContainer}>
                            <h2 className={css.projectsListItemTitle}>{project.title}</h2>
                            <p className={css.projectsListItemDescr}>{project.description}</p>
                            <button className={css.projectsListItemButton}>
                                <svg className={css.icon}>
                                    <use href={deleteBtn + '#icon-trash'}></use>
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button className={css.addBtn}>
                <svg className={css.addBtnIcon}>
                    <use href={addBtn + '#icon-addBtn'}></use>
                </svg>
            </button>
        </div>
    );
}

export default ProjectsList;