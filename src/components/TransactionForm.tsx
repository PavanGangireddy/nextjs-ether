import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useTransferUsdc from '@/hooks/useTransferUsdc';
import Button from './buttons/Button';

export default function TransactionForm() {
  const { register, handleSubmit } = useForm();
  const [startTransfer, response] = useTransferUsdc();
  const onSubmit = ({ receiver, amount }: any) =>
    startTransfer ? startTransfer(receiver, amount) : null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white mb-4 pb-8 pt-6 px-8 rounded shadow-md'
    >
      <input
        {...register('receiver')}
        placeholder='receiver'
        className='appearance-none border leading-tight px-3 py-2 rounded shadow text-gray-700 w-full focus:outline-none focus:shadow-outline'
      />
      <input
        {...register('amount')}
        placeholder='amount'
        className='appearance-none border leading-tight px-3 py-2 rounded shadow text-gray-700 w-full focus:outline-none focus:shadow-outline'
      />
      <p>{response}</p>
      <Button onClick={handleSubmit(onSubmit)} variant={'primary'}>
        Submit
      </Button>
    </form>
  );
}
