'use client';
import TableCustom from '@/components/table/table';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { checkinAPI } from '@/config/axios';
import { Bachelor } from '@/dtos/BachelorDTO';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, SquarePen, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [bachelorList, setBachelorList] = useState<Bachelor[]>([]);
  const { data: bachelorDT, error: bachelorDTEr } = useQuery({
    queryKey: ['bachelorList'],
    queryFn: () => {
      return checkinAPI.getBachelorList();
    },
  });

  useEffect(() => {
    if (bachelorDT?.data) {
      setBachelorList(bachelorDT.data.data);
    }
  }, [bachelorDT]);

  const columns: ColumnDef<Bachelor[]>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'fullName',
      header: 'Tên',
    },
    {
      accessorKey: 'studentCode',
      header: 'MSSV',
    },
    {
      accessorKey: 'mail',
      header: 'Mail',
    },
    {
      accessorKey: 'hallName',
      header: 'Hội trường',
    },
    {
      accessorKey: 'sessionNum',
      header: 'Session',
    },
    {
      accessorKey: 'chair',
      header: 'Ghế',
    },
    {
      accessorKey: 'chairParent',
      header: 'Ghế phụ huynh',
    },
    {
      accessorKey: 'checkIn',
      header: 'checkin',

      cell: ({ row }) => (
        <p>
          <Switch checked={row.getValue('checkIn')}></Switch>
        </p>
      ),
    },
  ];

  return (
    <>
      <Card>
        <CardContent className='p-3'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/'>Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Checkin thủ công</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardContent>
      </Card>

      <Card className='mt-3'>
        <CardContent className='p-3'>
          <TableCustom
            title='Danh sách tân cử nhân'
            data={bachelorList}
            columns={columns}
          ></TableCustom>
        </CardContent>
      </Card>
    </>
  );
}
