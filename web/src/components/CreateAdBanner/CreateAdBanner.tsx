import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export function CreateAdBanner() {
  return (
    <div className="mt-8 rounded-lg pt-1 overflow-hidden self-stretch bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D]">
      <div className="bg-[#2A2634] px-8 py-6 rounded-md flex items-center justify-between">
        <div>
          <strong className="text-white text-2xl font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <Dialog.DialogTrigger className="px-4 py-3 bg-violet-500 rounded-md text-white font-medium flex items-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.DialogTrigger>
      </div>
    </div>
  );
}
