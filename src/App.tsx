import "./App.css";
import { TasksBlock, type CardProps } from "./components/tasks/Task";

interface CardsGeneratorFunc {
  (): CardProps[];
}


let card_generator_from_loop: CardsGeneratorFunc = () => {
  let tasks: CardProps[] = []
  for (let i = 0; i < 20; i++) {
    tasks.push(
      {
        id: i,
        text: `Почему-то очень и очень много текста в названии задачи ${i}`
      }
    )
  }
  return tasks
}


function App() {
  return (
    <>
      <h2>Hello, World!</h2>
      <TasksBlock cards={card_generator_from_loop()} />
    </>
  );
}

export default App;
