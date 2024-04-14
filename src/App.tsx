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
  const [price, setPrice] = useState<number>(0);
  const [setOfUsers, setSetOfUsers] = useState<Set<string>>(new Set<string>());

  return (
    <>
      <h1 className="text-center font-mono text-4xl mt-4">Tab Calculator</h1>
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
            onClick={() => {
              if (setOfUsers.has(addName.toLowerCase())) return;
              setPerson([...person, { name: addName, items: [] }]);
              setSetOfUsers(setOfUsers.add(addName.toLowerCase()));
              setAddName("");
            }}
          >
            Add Person
          </Button>
        </div>
        <div className="flex flex-row flex-wrap gap-1 my-4 mb-8">
          {person.map((p, i) => (
            <Card key={i} className="mt-2 px-4 py-2">
              <div className="flex flex-row">
                <h2 className="text-xl font-bold my-auto mr-2">{p.name}</h2>
                <Button
                  className="text-lg"
                  isIconOnly
                  onClick={() => {
                    setPerson(person.filter((_, index) => index !== i));
                  }}
                >
                  X
                </Button>
              </div>
              <div>
                {p.items.map((item, index) => (
                  <div key={index} className="flex flex-row">
                    <h3 className="text-sm font-semibold text-green-600">{`+ $${item}`}</h3>
                    <Button
                      className="text-sm h-6"
                      isIconOnly
                      onClick={() => {
                        const newPerson = [...person];
                        newPerson[i].items = newPerson[i].items.filter(
                          (_, j) => j !== index,
                        );
                        setPerson(newPerson);
                      }}
                    >
                      x
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        {person.length > 0 && (
          <Card className="p-8 m-8 w-full items-center">
            <div className="flex md:flex-row flex-col">
              <Autocomplete
                label="Select an Person"
                className="max-w-xs mx-auto"
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
              {selectedPerson !== -1 && (
                <div className="flex flex-row mx-auto my-auto mt-2 sm:my-auto sm:ml-2">
                  <Textarea
                    placeholder="Price"
                    className="max-w-xs mx-auto"
                    maxRows={1}
                    size="md"
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                  <Button
                    className="ml-2"
                    onClick={() => {
                      if (price === 0) return;
                      const newPerson = [...person];
                      newPerson[selectedPerson].items.push(price as number);
                      setPerson(newPerson);
                      setPrice(0);
                      console.log(person);
                    }}
                  >
                    Add Price
                  </Button>
                </div>
              )}
            </div>
          </Card>
        )}
        <Card className="p-8 mx-8 w-full items-center">
          <div className="flex flex-col sm:flex-row sm:gap-4 my-1 sm:my-0 sm:mb-4">
            <Textarea
              label="Fees/Tips"
              className="max-w-xs mx-auto"
              maxRows={1}
              size="md"
            />
            <Textarea
              label="Tax %"
              className="max-w-xs mx-auto"
              maxRows={1}
              size="md"
            />
          </div>

          <Button className="w-full" onClick={() => {}}>
            Calculate
          </Button>
        </Card>
      </div>
    </>
  );
}

export default App;
