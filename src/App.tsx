import {
  Button,
  Textarea,
  Card,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { Key, useState } from "react";
import "./App.css";

interface Person {
  name: string;
  items: number[];
}

function App() {
  const [person, setPerson] = useState<Person[]>([]);
  const [addName, setAddName] = useState<string>("");
  const [selectedPerson, setSelectedPerson] = useState<number>(-1);

  return (
    <>
      <h1 className="text-center font-mono text-4xl">Tab Calculator</h1>
      <div className="mx-8 text-center mt-8 flex flex-col items-center justify-center">
        <div className="flex flex-row">
          <Textarea
            placeholder="Name"
            className="max-w-xs mr-2"
            maxRows={1}
            size="md"
            onChange={(e) => setAddName(e.target.value)}
          />
          <Button
            className="ml-2"
            onClick={() => setPerson([...person, { name: addName, items: [] }])}
          >
            Add Person
          </Button>
        </div>
        <div className="flex flex-row flex-wrap gap-1 my-4 mb-8">
          {person.map((p, i) => (
            <Card key={i} className="mt-2 px-4 py-2">
              <div className="flex flex-row">
                <h2 className="text-xl font-bold my-auto mr-2">{p.name}</h2>
                <Button className="text-lg" isIconOnly>
                  X
                </Button>
              </div>
            </Card>
          ))}
        </div>
        {person.length > 0 && (
          <Autocomplete
            label="Select an Person"
            className="max-w-xs"
            selectedKey={selectedPerson}
            onSelectionChange={(key: Key) =>
              setSelectedPerson((key as number) || -1)
            }
          >
            {person.map((person, index) => (
              <AutocompleteItem key={index} value={person.name}>
                {person.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        )}
      </div>
    </>
  );
}

export default App;
