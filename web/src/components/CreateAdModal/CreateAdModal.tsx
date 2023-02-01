import { useEffect, useState, FormEvent } from "react";

import { Check, GameController, CaretUp, CaretDown } from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { Input } from "../Input/Input";
import "./styles.css";
import axios from "axios";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) =>
      setGames(response.data)
    );
  }, []);

  async function handleCreateAt(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      await axios.post(`http://localhost:3333/games/${selectedGame}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });

      alert("Anúncio criado com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar anúncio.");
    }
  }

  return (
    <Dialog.Portal className="flex">
      <Dialog.Overlay className="bg-black/60 inset-0 fixed " />

      <Dialog.Content className="bg-[#2A2634] fixed px-10 py-8 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.DialogTitle className="text-3xl font-black">
          Publique um anúncio
        </Dialog.DialogTitle>

        <form onSubmit={handleCreateAt} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 mt-8">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>

            <Select.Root onValueChange={setSelectedGame}>
              <Select.Trigger
                aria-label="Game"
                className={
                  "SelectTrigger flex items-center justify-between bg-zinc-900 rounded px-4 py-3 text-sm"
                }
              >
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon>
                  <CaretDown className="text-zinc-400" size={24} />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="bg-zinc-900 text-white text-sm rounded overflow-hidden">
                  <Select.ScrollUpButton className="py-2 flex items-center justify-center text-white">
                    <CaretUp size={18} />
                  </Select.ScrollUpButton>
                  <Select.Viewport className="p-2">
                    {games.map((game) => {
                      return (
                        <Select.Item
                          className="flex items-center justify-between px-2 py-2 rounded hover:bg-zinc-800"
                          key={game.id}
                          value={game.id}
                        >
                          <Select.ItemText>{game.title}</Select.ItemText>
                          <Select.ItemIndicator>
                            <Check size={18} />
                          </Select.ItemIndicator>
                        </Select.Item>
                      );
                    })}
                  </Select.Viewport>
                  <Select.ScrollDownButton className="py-2 flex items-center justify-center text-white">
                    <CaretDown size={18} />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                type="number"
                name="yearsPlaying"
                id="yearsPlaying"
                placeholder="Tudo bem ser ZERO"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu discord?</label>
              <Input
                type="text"
                name="discord"
                id="discord"
                placeholder="discord"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                onValueChange={setWeekDays}
                className="grid grid-cols-4 gap-2"
                type="multiple"
                aria-label="Week Days"
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className="ToggleGroupItem px-3 py-2 bg-zinc-900 rounded"
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className="ToggleGroupItem px-3 py-2 bg-zinc-900 rounded"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className="ToggleGroupItem px-3 py-2 bg-zinc-900 rounded"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className="ToggleGroupItem px-3 py-2 bg-zinc-900 rounded"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className="ToggleGroupItem px-3 py-2 bg-zinc-900 rounded"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className="ToggleGroupItem px-3 py-2 bg-zinc-900 rounded"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className="ToggleGroupItem px-3 py-2 bg-zinc-900 rounded"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="time"
                  name="hourStart"
                  id="hourStart"
                  placeholder="De"
                />
                <Input
                  type="time"
                  name="hourEnd"
                  id="hourEnd"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 items-center text-sm">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) =>
                checked === true
                  ? setUseVoiceChannel(true)
                  : setUseVoiceChannel(false)
              }
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex gap-4 justify-end">
            <Dialog.Close
              className="px-5 py-3 bg-zinc-500 rounded-md font-semibold hover:bg-zinc-600"
              type="button"
            >
              Cancelar
            </Dialog.Close>

            <button
              className="px-5 py-3 flex items-center gap-3 bg-violet-500 rounded-md font-semibold hover:bg-violet-600"
              type="submit"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
