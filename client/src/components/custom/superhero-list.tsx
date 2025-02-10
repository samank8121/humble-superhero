import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SuperHero } from '@/types';

export function SuperHeroList({ SuperHeros }: { SuperHeros: SuperHero[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Name</TableHead>
          <TableHead>Superpower</TableHead>
          <TableHead>Humility Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {SuperHeros.map((hero) => (
          <TableRow key={hero.name}>
            <TableCell>{hero.name}</TableCell>
            <TableCell>{hero.superpower}</TableCell>
            <TableCell>{hero.humilityScore}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
