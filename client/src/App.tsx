import { useEffect, useState } from 'react';
import './App.css';

import { SuperHero } from '@/types';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CreateSuperHeroSchema from '@/lib/schema/create-superhero';
import { zodResolver } from '@hookform/resolvers/zod';
import SuperheroForm from '@/components/custom/superhero-form';
import { SuperHeroList } from './components/custom/superhero-list';
import { Separator } from './components/ui/separator';

function App() {
  const [data, setData] = useState<SuperHero[]>([]);
  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/superheroes').then(
      (res) => res.json()
    );
    setData(response);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof CreateSuperHeroSchema>>({
    resolver: zodResolver(CreateSuperHeroSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof CreateSuperHeroSchema>) {
    const response = await fetch('http://localhost:3000/superheroes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());
    setData(response);
  }

  return (
    <div className='w-full h-screen'>
      <SuperHeroList SuperHeros={data} />
      <Separator className='bg-white my-6'/>
      <SuperheroForm form={form} onSubmit={onSubmit} />
    </div>
  );
}

export default App;
