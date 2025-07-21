import { Modal } from '@/shared/ui/modal/modal';
import Button from '@/shared/ui/button/button';
import { type Operator } from '@/entities/operators/operators.types';
import { z } from 'zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/ui/input/input';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: Partial<Operator>) => void;
}

const createOperatorSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
});

export const CreateOperatorModal = ({ isOpen, onClose, onApply }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<z.infer<typeof createOperatorSchema>>({
    resolver: zodResolver(createOperatorSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof createOperatorSchema>> = (
    data
  ) => {
    onApply(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={'Создание оператора'}
      onClose={onClose}
      className="max-w-[700px] mx-auto"
    >
      <form
        className="px-10 flex flex-col gap-6 pb-10 pt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register('name')}
          id="operator-name"
          label="Название оператора"
          placeholder="Введите название оператора"
          error={errors.name?.message}
        />
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
            Создать оператора
          </Button>
        </div>
      </form>
    </Modal>
  );
};
