import React, { useRef, RefObject } from "react";

import styles from "./Task.module.css";
import { Button } from "../Button";

interface CustomInput {
    placeholder: string;
    ref: RefObject<string>;
}

export function Input({ placeholder, ref }: CustomInput) {
    return (
        <div className={styles.custom_input}>
            <input
                onChange={(e) => (ref.current = e.target.value)}
                defaultValue={ref.current}
                style={{ width: "100%", height: "100%" }}
                placeholder={placeholder}
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
    
    return (
        <>
            <h3 style={{ margin: 0, padding: 0 }}>NotModalWindow</h3>
            <div className={styles.task_form}>
                <Input placeholder="Название задачи" ref={title} />
                <Input placeholder="Описание задачи" ref={describe} />
                <Button
                    text="Создать задачу"
                    onclick={() => func(title.current, describe.current)}
                />
            </div>
        </>
    );
}
