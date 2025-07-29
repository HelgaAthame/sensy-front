import { GptChecklist } from "@/entities/mediafile/api/mediafile.types"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/shared/ui/table/table"
import { Fragment } from "react"
import { EditIcon } from "../../../../../public/assets/icons"

interface Props { checklist: GptChecklist | null }

export const ChecklistTable = ({ checklist }: Props) => {
    return checklist?.collection.filter(checklistItem => checklistItem.blocks && checklistItem.blocks.length > 0).map((checklistItem, checklistIndex) => (
        <Fragment key={checklistIndex}>
            <h3 className="font-semibold text-gray-900 text-lg mb-4">{checklistItem.name}</h3>
            <div key={checklistIndex} className="border border-gray-200 rounded-lg overflow-hidden grid"
                style={{
                    gridTemplateColumns: "1fr 1fr auto 2fr"
                }}>
                {['Группа критериев', 'Критерий', 'Число', 'Пояснение'].map((el) => (<div key={el} className="py-4 px-6 text-left text-sm font-medium text-gray-500 outline-[0.5px] outline-gray-200">{el}</div>))}
                {checklistItem.blocks.filter(block => block.criterias && block.criterias.length > 0).map((block, itemIndex) => {
                    const rowClass = `row-span-${block.criterias.length}`;
                    return (
                        <Fragment key={itemIndex}>
                            <div
                                className={`py-4 px-6 flex items-center text-sm font-semibold text-gray-900 outline-[0.5px] outline-gray-200 ${rowClass}`}
                            >
                                {block.name ?? " - "}
                            </div>
                            {block.criterias.map((criteria, index) => (
                                <Fragment key={index}>
                                    <div className="flex items-center px-6 py-4 outline-[0.5px] outline-gray-200 justify-betwwen w-full">
                                        {/* <div className="grow"> */}
                                        {criteria.name ?? " - "}
                                        {/* </div>
                                        <div className="w-4 h-4 shrink-0">
                                            <EditIcon /></div> */}
                                    </div>
                                    <div className="flex items-center px-4 py-6 outline-[0.5px] outline-gray-200">
                                        <div
                                            className={`flex items-center justify-center w-8 h-8 rounded-full font-medium ${criteria.score === criteria.maxScore
                                                ? 'text-green-800 1bg-green-100'
                                                : criteria.score && criteria.score > criteria.maxScore / 2
                                                    ? 'text-yellow-800 1bg-yellow-100'
                                                    : 'text-red-800 1bg-red-100'
                                                } `}
                                        >
                                            {criteria.score}
                                        </div>
                                    </div>
                                    <div key={index} className="px-4 py-2 outline-[0.5px] outline-gray-200 flex items-center">
                                        {criteria.comment}
                                    </div>
                                </Fragment>
                            ))}

                            <div
                                className={`col-span-2 uppercase py-4 px-6 flex items-center justify-center text-sm font-semibold text-gray-900 outline-[0.5px] outline-gray-200`}
                            >
                                Итого за {block.name ?? " - "}
                            </div>
                            <div className="flex items-center px-4 py-6 outline-[0.5px] outline-gray-200">
                                <div
                                    className={`flex items-center justify-center w-8 h-8 rounded-full font-medium ${block.score === block.maxScore
                                        ? 'text-green-800 1bg-green-100'
                                        : block.score && block.score > block.maxScore / 2
                                            ? 'text-yellow-800 1bg-yellow-100'
                                            : 'text-red-800 1bg-red-100'
                                        } `}
                                >
                                    {block.score}
                                </div>
                            </div>
                            <div className="outline-[0.5px] outline-gray-200"></div>
                        </Fragment>

                    )
                })}

                {/* <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableCell
                                isHeader
                                className="w-1/6 py-4 px-6 text-left text-sm font-medium text-gray-500"
                                borders={{ right: true, bottom: true }}
                            >
                                Группа критериев
                            </TableCell>
                            <TableCell
                                isHeader
                                className="w-1/6 py-4 px-6 text-left text-sm font-medium text-gray-500"
                                borders={{ right: true, bottom: true }}
                            >
                                Критерий
                            </TableCell>
                            <TableCell
                                isHeader
                                className="w-1/12 py-4 px-6 text-center text-sm font-medium text-gray-500"
                                borders={{ right: true, bottom: true }}
                            >
                                Число
                            </TableCell>
                            <TableCell
                                isHeader
                                className="w-7/12 py-4 px-6 text-left text-sm font-medium text-gray-500"
                                borders={{ bottom: true }}
                            >
                                Пояснение
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-white">
                        {checklistItem.blocks.filter(block => block.criterias && block.criterias.length > 0).map((block, itemIndex, array) => (
                            <Fragment key={itemIndex}>
                                <TableRow >

                                    <TableCell
                                        className="py-4 px-6 align-middle whitespace-nowrap text-sm font-semibold text-gray-900 text-center"
                                        rowSpan={block.criterias.length}
                                        borders={{
                                            right: true,
                                            bottom: itemIndex === block.criterias.length - 1 ? true : false,
                                        }}
                                    >
                                        {block.name ?? " - "}
                                    </TableCell>
                                    {
                                        block.criterias.map((criteria, index) => (
                                            <Fragment key={index}>
                                                <TableCell  >
                                                    <div >
                                                        <div className="flex items-center">{criteria.name ?? " - "}</div>
                                                    </div></TableCell>
                                                <TableCell><div
                                                    className={`inline-block min-w-8 px-2 py-1 rounded-full font-medium ${criteria.score === criteria.maxScore
                                                        ? 'text-green-800 bg-green-100'
                                                        : criteria.score && criteria.score > criteria.maxScore / 2
                                                            ? 'text-yellow-800 bg-yellow-100'
                                                            : 'text-red-800 bg-red-100'
                                                        } `}
                                                >
                                                    {criteria.score}
                                                </div></TableCell>
                                                <TableCell> <div key={index}>
                                                    <div>{criteria.comment}</div>
                                                </div></TableCell></Fragment>
                                        ))
                                    }

                                </TableRow>

                            </Fragment>

                        ))}
                        <TableRow className="bg-gray-50">
                            <TableCell
                                colSpan={2}
                                className="py-3 px-6 text-sm font-semibold text-gray-900 align-middle text-center"
                                borders={{ right: true }}
                            >
                                ИТОГО ЗА {checklistItem.name}
                            </TableCell>
                            <TableCell
                                className="py-3 px-6 text-center text-sm font-medium text-purple-700"
                                borders={{ right: true }}
                            >
                                {checklistItem.score}
                            </TableCell>
                            <TableCell className="py-3 px-6"> </TableCell>
                        </TableRow>
                    </TableBody>
                </Table> */}
            </div ></Fragment >

    ))
}