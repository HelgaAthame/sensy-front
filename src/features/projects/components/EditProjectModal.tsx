import { Modal } from '@/shared/ui/modal/modal';
import Button from '@/shared/ui/button/button';
import { type Project } from '@/entities/projects/projects.types';
import { z } from 'zod';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input/input';
import { MultiSelect } from '@/shared/ui/multiselect/multiselect';
import { useGetDictionariesQuery } from '@/entities/dictionaries/dictionaries.api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: Partial<Project>) => void;
  project: Project;
}

const editProjectSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  vocabularies: z.array(z.number()).optional(),
  checklists: z.array(z.number()).optional(),
  isActive: z.boolean().optional(),
});

export const EditProjectModal = ({
  isOpen,
  onClose,
  onApply,
  project,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { isValid, errors },
  } = useForm<z.infer<typeof editProjectSchema>>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      name: project.name ?? undefined,
      isActive: project.isActive,
      vocabularies: [],
      checklists: [],
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof editProjectSchema>> = (data) => {
    onApply(data);
    onClose();
  };

  const { data: dictionariesData, isLoading } = useGetDictionariesQuery();

  const vocabularies = watch('vocabularies');

  return (
    <Modal
      isOpen={isOpen}
      title={'Редактирование проекта'}
      onClose={onClose}
      className="max-w-[410px] mx-auto"
    >
      <form
        className="px-10 flex flex-col gap-6 pb-10 pt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register('name')}
          id="project-name"
          label="Название проекта"
          placeholder="Введите название проекта"
          error={errors.name?.message}
        />
        {dictionariesData && vocabularies && (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                selectedOptions={dictionariesData
                  .filter((dict) => value && value.includes(dict.id))
                  .map((opt) => ({
                    label: opt.name,
                    value: opt.id.toString(),
                  }))}
                options={[]}
                setOptions={(newOptions) => {
                  const optionsIds = newOptions.map((opt) => opt.value);
                  onChange(optionsIds);
                }}
              />
            )}
            name={'vocabularies'}
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
