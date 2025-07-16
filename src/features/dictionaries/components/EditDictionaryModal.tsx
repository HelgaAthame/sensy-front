import { Modal } from '@/shared/ui/modal/modal';
import Button from '@/shared/ui/button/button';
import { type Dictionary } from '@/entities/dictionaries/dictionaries.types';
import { z } from 'zod';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input/input';
import { MultiSelect } from '@/shared/ui/multiselect/multiselect';
import { useGetDictionariesQuery } from '@/entities/dictionaries/dictionaries.api';
import { useGetChecklistsQuery } from '@/entities/checklists/checklists.api';
import { useGetDictionaryQuery } from '@/entities/dictionaries/dictionaries.api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: Partial<Dictionary>) => void;
  dictionaryId: number;
}

const editDictionarySchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  vocabularyIds: z.array(z.number()).optional(),
  checklistIds: z.array(z.number()).optional(),
  isActive: z.boolean().optional(),
});

export const EditDictionaryModal = ({
  isOpen,
  onClose,
  onApply,
  dictionaryId,
}: Props) => {
  const { data: dictionary } = useGetDictionaryQuery(dictionaryId);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { isValid, errors },
  } = useForm<z.infer<typeof editDictionarySchema>>({
    resolver: zodResolver(editDictionarySchema),
    defaultValues: {
      name: dictionary?.name ?? undefined,
      isActive: dictionary?.isActive,
      vocabularyIds: dictionary?.vocabularyIds ?? [],
      checklistIds: dictionary?.checklistIds ?? [],
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof editDictionarySchema>> = (
    data
  ) => {
    onApply(data);
    onClose();
  };

  const { data: dictionariesData } = useGetDictionariesQuery();

  const { data: checklistsData } = useGetChecklistsQuery();

  const vocabularies = watch('vocabularyIds');
  const checklists = watch('checklistIds');

  return (
    <Modal
      isOpen={isOpen}
      title={'Редактирование проекта'}
      onClose={onClose}
      className="max-w-[700px] mx-auto"
    >
      <form
        className="px-10 flex flex-col gap-6 pb-10 pt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register('name')}
          id="dictionary-name"
          label="Название проекта"
          placeholder="Введите название проекта"
          error={errors.name?.message}
        />
        {dictionariesData && vocabularies && (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                label="Словари"
                selectedOptions={dictionariesData
                  .filter((dict) => value && value.includes(dict.id))
                  .map((opt) => ({
                    label: opt.name,
                    value: opt.id.toString(),
                  }))}
                options={dictionariesData.map((opt) => ({
                  label: opt.name,
                  value: opt.id.toString(),
                }))}
                setOptions={(newOptions) => {
                  const optionsIds = newOptions.map((opt) =>
                    parseInt(opt.value)
                  );
                  onChange(optionsIds);
                }}
              />
            )}
            name={'vocabularyIds'}
          />
        )}
        {checklistsData && checklists && (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                label="Чек-листы"
                selectedOptions={checklistsData
                  .filter((dict) => value && value.includes(dict.id))
                  .map((opt) => ({
                    label: opt.name,
                    value: opt.id.toString(),
                  }))}
                options={checklistsData.map((opt) => ({
                  label: opt.name,
                  value: opt.id.toString(),
                }))}
                setOptions={(newOptions) => {
                  const optionsIds = newOptions.map((opt) =>
                    parseInt(opt.value)
                  );
                  onChange(optionsIds);
                }}
              />
            )}
            name={'checklistIds'}
          />
        )}

        <div className="flex justify-between">
          <Button
            className="px-2 py-2 text-gray-700 hover:bg-gray-100 bg-white border border-gray-200 cursor-pointer rounded-full"
            onClick={onClose}
          >
            Отменить
          </Button>
          <Button
            type="submit"
            className={`px-2 py-2 bg-purple-900 cursor-pointer hover:bg-purple-800 text-white rounded-full`}
            disabled={!isValid}
          >
            Применить
          </Button>
        </div>
      </form>
    </Modal>
  );
};
