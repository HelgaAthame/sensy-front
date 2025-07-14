import { ColumnConfig } from '@/shared/hooks/use-sort'
import { TableRowData } from '@/entities/mediafile/hooks/use-calls'

export const columnConfig: ColumnConfig<TableRowData>[] = [
  { key: 'date', label: 'Дата', sortable: true },
  { key: 'operator', label: 'Оператор', sortable: false },
  { key: 'phone', label: 'Номер телефона', sortable: false },
  { key: 'projectName', label: 'Проект', sortable: false },
  { key: 'duration', label: 'Длит.', sortable: true },
  { key: 'negative', label: 'Негатив', sortable: true },
  { key: 'lexis', label: 'Лексика', sortable: true },
  { key: 'interruptions', label: 'Переб.', sortable: true },
  { key: 'silence', label: 'Тишина (макс.)', sortable: true },
  { key: 'checklist', label: 'Чек-лист', sortable: true},
  { key: 'gptSummary', label: 'Резюме', sortable: false },
]
