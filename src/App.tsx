import { json2csv } from "json-2-csv";
import { useMemo } from "react";
import "./App.css";

const DATA_DICTIONARY: Record<string, string> = {
  id: "Identificador",
  name: "Nome",
  age: "Idade",
};

function App() {
  const FAKE_DATA = useMemo(() => {
    return [
      { id: 1, name: "John", age: 25 },
      { id: 2, name: "Jane", age: 30 },
      { id: 3, name: "Bob", age: 35 },
    ];
  }, []);

  const renameKeys = () => {
    return FAKE_DATA.map((data) => {
      const updatedData = Object.entries(data).map(([key, value]) => {
        return { [DATA_DICTIONARY[key]]: value };
      });

      return Object.assign({}, ...updatedData);
    });
  };

  const download = () => {
    const element = document.createElement("a");

    element.setAttribute(
      "href",
      `data:text/csv;charset=utf-8,${json2csv(renameKeys())}`
    );
    element.setAttribute("download", "fake.csv");
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      <button onClick={download}>Download</button>
    </div>
  );
}

export default App;
