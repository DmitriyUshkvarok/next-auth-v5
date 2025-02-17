'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useRouter, useSearchParams } from 'next/navigation';

interface DynamicPaginationProps {
  currentPage: number;
  totalPages: number;
}

const DynamicPagination = ({
  currentPage,
  totalPages,
}: DynamicPaginationProps) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  // Обработчик изменения страницы
  const handlePageChange = (page: number) => {
    console.log('Page to navigate:', page); // Отладочное сообщение
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('page', page.toString());
    console.log('New URL:', `?${params.toString()}`); // Отладочное сообщение
    replace(`?${params.toString()}`);
  };

  // Генерация диапазона страниц для отображения
  const getPageRange = () => {
    const range = [];
    const maxVisiblePages = 5; // Максимальное количество отображаемых страниц
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Кнопка "Назад" */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {/* Отображение страниц */}
        {getPageRange().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page);
              }}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Многоточие, если страниц больше, чем отображается */}
        {totalPages > getPageRange().length && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Кнопка "Вперед" */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              console.log('Next button clicked'); // Отладочное сообщение
              handlePageChange(currentPage + 1);
            }}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DynamicPagination;
