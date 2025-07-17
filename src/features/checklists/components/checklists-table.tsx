'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/shared/ui/table/table';
import Pagination from '@/shared/ui/pagination/pagination';
import Button from '@/shared/ui/button/button';
import { PencilIcon } from '@/../public/assets/icons';
import { Switcher } from '@/shared/ui/switcher';
import { ChecklistReqBody, type Checklist } from '@/entities/checklists/checklists.types';
import { toast } from 'react-toastify';
import {
  useCreateChecklistMutation,
  useUpdateChecklistMutation,
} from '@/entities/checklists/checklists.api';
import { CreateChecklistModal } from './CreateChecklistModal';
import Link from 'next/link';

interface ColumnDef<T> {
  key: keyof T | string;
  title: string;
  render?: (item: T) => React.ReactNode;
}

interface DynamicTableProps<T> {
  title?: string;
  data: T[];
  columns: ColumnDef<T>[];
  itemsPerPage?: number;
  initialPage?: number;
  className?: string;
}

export const ChecklistsTable = <T extends Checklist>({
  title = '',
  data = [],
  columns = [],
  itemsPerPage = 5,
  initialPage = 1,
  className = '',
}: DynamicTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [currentItem, setCurrentItem] = useState<Checklist | undefined>(
    undefined
  );

  const [isCreatingChecklist, setIsCreatingChecklist] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [updateChecklist, updateChecklistResult] = useUpdateChecklistMutation();

  const [createChecklist, createChecklistResult] = useCreateChecklistMutation();

  useEffect(() => {
    if (updateChecklistResult.isSuccess) {
      toast.success('Чек-лист успешно обновлён');
    }
  }, [updateChecklistResult]);

  useEffect(() => {
    if (createChecklistResult.isSuccess) {
      toast.success('Чек-лист успешно создан');
    }
  }, [createChecklistResult]);

  const handleToggle = useCallback(
    (item: Checklist | undefined) => () => {
      if (!item) return;
      updateChecklist({
        id: item.id,
        body: {
          ...item,
          name: item.name ?? '',
          isActive: !item.isActive,
          data: Array.isArray(item.data) ? item.data : [], 
        },
      });
    },
    [updateChecklist]
  );

  return (
    <Fragment>
      <CreateChecklistModal
        isOpen={isCreatingChecklist}
        onClose={() => {
          setIsCreatingChecklist(false);
        }}
        onApply={(data) => {
          createChecklist(data);
        }}
      />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="overflow-hidden">
          <div className="max-w-full overflow-x-auto">
            <Table className="w-full">
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell
                      key={`header-${column.title}`}
                      isHeader
                      className={`p-6 font-normal text-gray-500 text-theme-sm dark:text-gray-400 ${index !== 0 ? 'text-center' : 'text-start '}`}
                    >
                      {column.title}
                    </TableCell>
                  ))}

                  <TableCell
                    key={`create-project`}
                    isHeader
                    className="w-44 py-2 px-6 font-normal text-gray-500 text-start text-theme-sm dark:text-gray-400"
                  >
                    <Button
                      variant="purple"
                      className="whitespace-nowrap"
                      onClick={() => {
                        setIsCreatingChecklist(true);
                      }}
                    >
                      Создать чек-лист
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {currentItems.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() => {
                      setCurrentItem((prev) => item);
                    }}
                  >
                    <TableCell className="h-16 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="h-16 px-3">
                      <div className="flex items-center gap-3 justify-center">
                        <div>
                          <Switcher
                            enabled={item.isActive}
                            setEnabled={handleToggle(currentItem)}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="h-16 w-44 pr-6 pl-3">
                      <div className="flex items-center gap-3 w-full justify-end">
                        <Link
                          href={`/checklists/${item.id}`}
                          className="cursor-pointer block font-medium text-gray-700 text-theme-sm dark:text-gray-400 rounded-full p-2 border border-gray-200 hover:bg-gray-50 transition duration-300"
                        >
                          <PencilIcon width={14} height={14} />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="rounded-b-xl py-4 pl-[18px] pr-4">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};
