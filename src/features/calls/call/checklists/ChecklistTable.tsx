import { GptChecklist } from '@/entities/mediafile/api/mediafile.types';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/shared/ui/table/table';
import { Fragment } from 'react';
import { EditIcon } from '../../../../../public/assets/icons';

interface Props {
  checklist: GptChecklist | null;
}

export const ChecklistTable = ({ checklist }: Props) => {
  return checklist?.collection
    .filter(
      (checklistItem) => checklistItem.blocks && checklistItem.blocks.length > 0
    )
    .map((checklistItem, checklistIndex) => (
      <Fragment key={checklistIndex}>
        <h3 className="font-semibold text-gray-900 text-lg mb-4">
          {checklistItem.name}
        </h3>
        <div
          key={checklistIndex}
          className="bg-gray-200 rounded-lg overflow-hidden grid gap-px border border-gray-200"
          style={{
            gridTemplateColumns: '1fr 1fr auto 2fr',
          }}
        >
          {['Группа критериев', 'Критерий', 'Число', 'Пояснение'].map((el) => (
            <div
              key={el}
              className="py-4 px-6 text-left text-sm font-medium text-gray-500 bg-white"
            >
              {el}
            </div>
          ))}
          {checklistItem.blocks
            .filter((block) => block.criterias && block.criterias.length > 0)
            .map((block, itemIndex) => {
              const rowClass = `row-span-${block.criterias.length}`;
              return (
                <Fragment key={itemIndex}>
                  <div
                    className={`py-4 px-6 flex items-center text-sm font-semibold text-gray-900 bg-white ${rowClass}`}
                  >
                    {block.name ?? ' - '}
                  </div>
                  {block.criterias.map((criteria, index) => (
                    <Fragment key={index}>
                      <div className="flex items-center px-6 py-4  justify-betwwen w-full bg-white">
                        {/* <div className="grow"> */}
                        {criteria.name ?? ' - '}
                        {/* </div>
                                        <div className="w-4 h-4 shrink-0">
                                            <EditIcon /></div> */}
                      </div>
                      <div className="flex items-center px-4 py-6 bg-white">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full font-medium ${
                            criteria.score === criteria.maxScore
                              ? 'text-green-800 1bg-green-100'
                              : criteria.score &&
                                  criteria.score > criteria.maxScore / 2
                                ? 'text-yellow-800 1bg-yellow-100'
                                : 'text-red-800 1bg-red-100'
                          } `}
                        >
                          {criteria.score}
                        </div>
                      </div>
                      <div
                        key={index}
                        className="px-4 py-2 bg-white flex items-center"
                      >
                        {criteria.comment}
                      </div>
                    </Fragment>
                  ))}

                  <div
                    className={`bg-white col-span-2 uppercase py-4 px-6 flex items-center justify-center text-sm font-semibold text-gray-900 `}
                  >
                    Итого за {block.name ?? ' - '}
                  </div>
                  <div className="bg-white flex items-center px-4 py-6 ">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full font-medium ${
                        block.score === block.maxScore
                          ? 'text-green-800 1bg-green-100'
                          : block.score && block.score > block.maxScore / 2
                            ? 'text-yellow-800 1bg-yellow-100'
                            : 'text-red-800 1bg-red-100'
                      } `}
                    >
                      {block.score}
                    </div>
                  </div>
                  <div className="bg-white"></div>
                </Fragment>
              );
            })}
          <div
            className={`bg-white col-span-2 uppercase py-4 px-6 flex items-center justify-center text-sm font-semibold text-gray-900 `}
          >
            Итого по чек-листу
          </div>
          <div className="flex items-center px-4 py-6 bg-white">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full font-medium ${
                checklistItem.score === checklistItem.maxScore
                  ? 'text-green-800 1bg-green-100'
                  : checklistItem.score &&
                      checklistItem.score > checklistItem.maxScore / 2
                    ? 'text-yellow-800 1bg-yellow-100'
                    : 'text-red-800 1bg-red-100'
              } `}
            >
              {checklistItem.score}
            </div>
          </div>
          <div className="bg-white"></div>
        </div>
      </Fragment>
    ));
};
