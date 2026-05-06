import { useState } from "react";
import { Button } from "../Button";
import styles from "./Task.module.css";
import { Modal } from "../modal/Modal";
import { TaskCreateForm } from "./TaskCreateForm";

export interface CardProps {
    id: number;
    text: string;
    description?: string;
    onOpenFullScreen?: (task: CardProps) => void;
    handleDeleteTask: (task_id: number) => void;
}

interface Tasks {
    cards: CardProps[];
}

export function TasksBlock({ cards }: Tasks) {
    const [currentCards, changeCardsArray] = useState<CardProps[]>(cards);
    const [fullScreenTask, setFullScreenTask] = useState<CardProps | null>(null);

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
        changeCardsArray(prevCards => {
            return prevCards.filter((card) => {
                return card.id != task_id;
            });
        })
    };

    const handleCreateTask = (text: string, description: string) => {
        changeCardsArray(prevCards => {
            const lastCard = prevCards.at(-1)
            const lastId = lastCard ? lastCard.id + 1 : 0;
            return [...prevCards, {id: lastId, text: text, description: description}]
        })
    }

    return (
        <>
            <Button
                text="clear"
                onClick={() => changeCardsArray([])}
            />
            <Button text="create_task" onClick={toggleCreateModal} />
            <div className={styles.task_block}>
                {currentCards.map((card) => (
                    <TaskCard
                        key={card.id}
                        {...card}
                        onOpenFullScreen={openTaskFullScreen}
                        handleDeleteTask={deleteTask}
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
                {TaskCreateForm(handleCreateTask)}
            </Modal>
        </>
    );
}

export function TaskCard(
    props: CardProps
) {
    const handleOpenTask = () => {
        props.onOpenFullScreen?.(props);
    };

    return (
        <div id={props.id.toString()} className={styles.task}>
            <h3>{props.text}</h3>
            <div>
                <Button
                    text="Удалить"
                    onClick={() => props.handleDeleteTask?.(props.id)}
                />
                <Button
                    text="Посмотреть"
                    onClick={handleOpenTask}
                />
            </div>
        </div>
    );
}
