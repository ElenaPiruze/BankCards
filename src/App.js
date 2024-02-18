import logo from "./logo.svg";
import "./App.css";
import ListCard from "./componets/ListCard";

function App() {
  return (
    <div className="px-4 max-w-[425px] mx-auto">
      <h1 className="text-6xl text-purple font-bold font-circularPro">
        Your Cards
      </h1>
      <h3 className="text-small text-darkGrey font-circularPro">
        Add, edit, or delete your cards at any time
      </h3>
      <ListCard />
    </div>
  );
}

export default App;
