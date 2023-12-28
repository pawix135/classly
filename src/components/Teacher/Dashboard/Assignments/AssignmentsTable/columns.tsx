'use client';

import { Assignment } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import DashbaordDateDisplay from '../../DateDisplay';
import AssignmentStatusBadge from '../StatusBadge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Minus } from 'lucide-react';

export const columns: ColumnDef<Assignment>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: 'Start(date)',
    accessorKey: 'start',
    cell({ row }) {
      return <DashbaordDateDisplay date={new Date(row.getValue('start'))} />;
    },
  },
  {
    header: 'End(date)',
    accessorKey: 'deadline',
    cell({ row }) {
      return <DashbaordDateDisplay date={new Date(row.getValue('deadline'))} />;
    },
  },
  {
    header: 'Updated(date)',
    accessorKey: 'updated_at',
    cell({ row }) {
      return <DashbaordDateDisplay date={new Date(row.getValue('updated_at'))} />;
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Grade <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: 'grade',
    cell({ row }) {
      return <div className="">{row.getValue('grade') ?? <Minus />}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell({ row }) {
      return <AssignmentStatusBadge status={row.getValue('status')} />;
    },
  },
  {
    header: 'Actions',
    cell({ row }) {
      let expired = new Date(row.getValue('deadline')).getTime() < Date.now();
      let status = row.getValue('status');
      return (
        <div className="flex flex-row gap-2">
          {(status === 'COMPLETED' || status === 'GRADED' || status == 'REVIEWING') && (
            <>
              <Button variant="success">{status === 'GRADED' ? 'Change grade' : 'Grade'}</Button>
            </>
          )}
          <Button variant="destructive">Delete</Button>
          {expired && status !== 'GRADED' && <Button variant="secondary">Fail</Button>}
        </div>
      );
    },
  },
];
