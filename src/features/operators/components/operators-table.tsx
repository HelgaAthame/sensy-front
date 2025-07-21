'use client';

import { Fragment, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/shared/ui/table/table';
import Pagination from '@/shared/ui/pagination/pagination';
import Button from '@/shared/ui/button/button';
import { type Operator } from '@/entities/operators/operators.types';
import { PencilIcon } from '@/../public/assets/icons';
import { CreateOperatorModal } from './CreateOperatorModal';
import { EditOperatorModal } from './EditOperatorModal';
import {
  useCreateOperatorMutation,
  useUpdateOperatorMutation,
} from '@/entities/operators/operators.api';
import { toast } from 'react-toastify';

interface ColumnDef<T> {
  key: keyof T | string;
  id: number;
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

export const OperatorsTable = <T extends Operator>({
  title = '',
  data = [],
  columns = [],
  itemsPerPage = 5,
  initialPage = 1,
  className = '',
}: DynamicTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [currentItem, setCurrentItem] = useState<Operator | undefined>(
    undefined
  );

  const [isCreatingOperator, setIsCreatingOperator] = useState(false);
  const [isEditingOperator, setIsEditingOperator] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [updateOperator, updateOperatorResult] = useUpdateOperatorMutation();

  const [createOperator, createOperatorResult] = useCreateOperatorMutation();

  useEffect(() => {
    if (updateOperatorResult.isSuccess) {
      toast.success('Оператор успешно обновлён');
    }
  }, [updateOperatorResult]);

  useEffect(() => {
    if (createOperatorResult.isSuccess) {
      toast.success('Оператор успешно создан');
    }
  }, [createOperatorResult]);

  return (
    <Fragment>
      <CreateOperatorModal
        isOpen={isCreatingOperator}
        onClose={() => {
          setIsCreatingOperator(false);
        }}
        onApply={(data) => {
          createOperator(data);
        }}
      />
      {currentItem && (
        <EditOperatorModal
          operatorId={currentItem.id}
          isOpen={isEditingOperator}
          onClose={() => {
            setIsEditingOperator(false);
          }}
          onApply={(data) => {
            updateOperator({
              body: data,
              id: currentItem.id,
            });
          }}
        />
      )}
      <div className="rounded-2xl border border-gray-200 bg-white  dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="overflow-hidden">
          <div className="max-w-full overflow-x-auto">
            <Table className="w-full">
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={`header-${column.id}`}
                      isHeader
                      className="p-6 font-normal text-gray-500 text-start text-theme-sm dark:text-gray-400"
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
                        setIsCreatingOperator(true);
                      }}
                    >
                      Создать оператора
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {currentItems.map((item, index) => (
                  <TableRow
                    key={index}
                    onClick={() => {
                      setCurrentItem(() => item);
                    }}
                  >
                    <TableCell className="h-16 pl-6 pr-3 w-[90px]">
                      <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                        {item.id}
                      </span>
                    </TableCell>
                    <TableCell className="h-16 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10">
                          {/* {item.image ? (
                          <img
                            width={40}
                            height={40}
                            src={item.image}
                            className="w-10 h-10 rounded-full object-cover"
                            alt={`${item.name} icon`}
                          />
                        ) : ( */}
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-900 text-white text-lg font-semibold">
                            {item.name?.charAt(0)}
                          </div>
                          {/* )} */}
                        </div>
                        <div>
                          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="h-16 w-44 pr-6 pl-3">
                      <div className="flex items-center gap-3 w-full justify-end">
                        <div
                          className="cursor-pointer block font-medium text-gray-700 text-theme-sm dark:text-gray-400 rounded-full p-2 border border-gray-200 hover:bg-gray-50 transition duration-300"
                          onClick={() => {
                            setIsEditingOperator(true);
                          }}
                        >
                          <PencilIcon width={14} height={14} />
                        </div>
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
          <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
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
