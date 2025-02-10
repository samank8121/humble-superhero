'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Combobox } from './combobox';

const options = [
  { value: 'fly', label: 'Fly' },
  { value: 'laser-eyes', label: 'LaserEyes' },
  { value: 'teleportation', label: 'Teleportation' },
  { value: 'telekinesis', label: 'Telekinesis' },
  { value: 'speed', label: 'Speed' },
  { value: 'strength', label: 'Strength' },
];

export default function SuperheroForm({ form, onSubmit }) {

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Name...' {...field} />
              </FormControl>
              <FormMessage className='text-red-400' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='superpower'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Superpower</FormLabel>
              <FormControl>
                <Combobox
                  options={options}
                  values={field.value}
                  onChange={(v) => {
                    let newValues = [v];
                    if (field.value && field.value.length > 0) {
                      newValues = field.value.includes(v)
                        ? field.value.filter((f) => f !== v)
                        : [...field.value, v];
                    }
                    field.onChange(newValues);
                  }}
                />
              </FormControl>
              <FormMessage className='text-red-400' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='humilityScore'
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Humility Score</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  value={value ?? ''}
                  onChange={(e) => {
                    const numericValue = e.target.value
                      ? Number(e.target.value)
                      : '';
                    onChange(numericValue);
                  }}
                  placeholder='Humility Score...'
                  {...rest}
                />
              </FormControl>
              <FormMessage className='text-red-400' />
            </FormItem>
          )}
        />
        <Button type='submit' className="border border-white rounded-md">Submit</Button>
      </form>
    </Form>
  );
}
