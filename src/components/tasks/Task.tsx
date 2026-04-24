import React, { useState } from "react";
import { Button } from "../Button";
import styles from "./Task.module.css";
import { Modal } from "../modal/Modal";
import { TaskCreateForm } from "./TaskCreateForm";

export interface CardProps {
    id: number;
    text: string;
    description?: string;
}

interface Tasks {
    cards: CardProps[];
}

export function TasksBlock({ cards }: Tasks) {
    const [current_cards, changeCardsArray] = useState<CardProps[]>(cards);
    const [fullScreenTask, setFullScreenTask] = useState<CardProps | null>(
        null
    );
    const [isCreateModalVisible, setModalVisible] = useState<boolean>(false);

    const toggleCreateModal = () => {
        setModalVisible(!isCreateModalVisible);
    };

    const openTaskFullScreen = (task: CardProps) => {
        setFullScreenTask(task);
    };

    const closeTaskFullScreen = () => {
        setFullScreenTask(null);
    };

    const deleteTask = (task_id: number) => {
        changeCardsArray(
            current_cards.filter((card) => {
                return card.id != task_id;
            })
        );
    };

    const createTask = (text: string, description: string) => {
      const last_id = current_cards.at(-1) ? current_cards.at(-1).id + 1 : 0
      changeCardsArray([...current_cards, {id: last_id, text: text, description: description}])
    }

    return (
        <>
            <Button
                text="clear"
                onclick={() => changeCardsArray([])}
            />
            <Button text="create_task" onclick={toggleCreateModal} />
            <div className={styles.task_block}>
                {current_cards.map((card) => (
                    <TaskCard
                        key={card.id}
                        {...card}
                        onOpenFullScreen={openTaskFullScreen}
                        deleteTask={deleteTask}
                    />
                ))}
            </div>

            {fullScreenTask && (
                <div className={styles.fullscreen_overlay}>
                    <div className={styles.fullscreen_content}>
                        <button
                            onClick={closeTaskFullScreen}
                            className={styles.close_btn}
                        >
                            ✕
                        </button>
                        <h2>{fullScreenTask.text}</h2>
                        <p>{fullScreenTask.description || "Нет описания"}</p>
                    </div>
                </div>
            )}
            <Modal
                isOpen={isCreateModalVisible}
                onClose={toggleCreateModal}
                title='Форма создания задачи'
                closeOnEsc={true}
                closeOnOverlayClick={true}
            >
                {TaskCreateForm(createTask)}
            </Modal>
        </>
    );
}

export function TaskCard(
    props: CardProps & { onOpenFullScreen?: (task: CardProps) => void } & {
        deleteTask: (task_id: number) => void;
    }
) {
    const buttonStyles = {
        width: "100%",
        height: "50%",
    };

    const handleOpenTask = () => {
        props.onOpenFullScreen?.(props);
    };

    return (
        <div id={props.id.toString()} className={styles.task}>
            <h3>{props.text}</h3>
            <div>
                <Button
                    text="Удалить"
                    onclick={() => props.deleteTask?.(props.id)}
                    additionalStyle={buttonStyles}
                />
                <Button
                    text="Посмотреть"
                    onclick={handleOpenTask}
                    additionalStyle={buttonStyles}
                />
            </div>
        </div>
    );
}
