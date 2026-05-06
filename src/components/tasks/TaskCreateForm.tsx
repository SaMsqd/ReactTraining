import { useRef, type RefObject } from "react";
import styles from "./Task.module.css";
import { Button } from "../Button";

interface CustomInput {
    placeholder: string;
    ref: RefObject<string>;
    className: string;
}

export function Input({ placeholder, ref, className }: CustomInput) {
    return (
        <div className={styles.custom_input}>
            <input
                onChange={(e) => (ref.current = e.target.value)}
                defaultValue={ref.current}
                placeholder={placeholder}
                className={className}
            />
        </div>
    );
}

interface TaskCreateFunc {
    (title: string, describe: string): void;
}

export function TaskCreateForm(func: TaskCreateFunc) {
    const title = useRef("");
    const describe = useRef("");
    console.log(styles.custom_input)
    return (
        <>
            <h3>NotModalWindow</h3>
            <div className={styles.task_form}>
                <Input placeholder="Название задачи" ref={title} className={styles.custom_input} />
                <Input placeholder="Описание задачи" ref={describe} className={styles.custom_input} />
                <Button
                    text="Создать задачу"
                    onClick={() => func(title.current, describe.current)}
                />
            </div>
        </>
    );
}
