import { VTableColumn } from "../../../libs/ui/components/table/v-table.interface";

export const DOC_INPUTS_COLUMNS: VTableColumn<unknown>[] = [
  { key: "props", label: "Propriedade" },
  { key: "types", label: "Tipo", type: "badge", badge: { variant: "dark" } },
  { key: "default", label: "Padrão" },
  { key: "description", label: "Descrição" }
];

export const DOC_OUTPUTS_COLUMNS: VTableColumn<unknown>[] = [
  { key: "props", label: "Nome" },
  { key: "return", label: "Retorno", type: "badge", badge: { variant: "dark" } },
  { key: "description", label: "Descrição" }
];
