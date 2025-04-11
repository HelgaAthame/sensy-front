import { ColumnConfig } from '@/shared/hooks/use-sort'
import { TableRowData } from '@/entities/mediafile/hooks/use-calls'

export const columnConfig: ColumnConfig<TableRowData>[] = [
  { key: 'date', label: 'Дата', sortable: false },
  { key: 'operator', label: 'Оператор', sortable: true },
  { key: 'phone', label: 'Номер телефона', sortable: true },
  { key: 'duration', label: 'Длительность', sortable: true },
  { key: 'negative', label: 'Негатив', sortable: true },
  { key: 'lexis', label: 'Лексика', sortable: true },
  { key: 'interruptions', label: 'Перебивания', sortable: true },
  { key: 'silence', label: 'Тишина (макс.)', sortable: true },
]
