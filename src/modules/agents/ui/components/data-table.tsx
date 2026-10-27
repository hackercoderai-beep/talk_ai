"use client";

import {
  type ColumnDef,
  type Row,
  type RowData,
  useTable,
} from "@tanstack/react-table";
import { type ReactNode, useCallback } from "react";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { type DataTableFeatures, features } from "./data-table-features";

type DataTableProps<TData extends RowData> = {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
};

function DataTableRow<TData extends RowData>({
  row,
  onRowClick,
  children,
}: {
  row: Row<DataTableFeatures, TData>;
  onRowClick?: (row: TData) => void;
  children: ReactNode;
}) {
  const { original } = row;
  const handleClick = useCallback(
    () => onRowClick?.(original),
    [onRowClick, original]
  );

  return (
    <TableRow
      className="cursor-pointer"
      data-state={row.getIsSelected() && "selected"}
      onClick={onRowClick ? handleClick : undefined}
    >
      {children}
    </TableRow>
  );
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  onRowClick,
}: DataTableProps<TData>) {
  const table = useTable({
    columns,
    data,
    features,
  });

  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <Table>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <DataTableRow key={row.id} onRowClick={onRowClick} row={row}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </DataTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="h-24 text-center text-muted-foreground"
                colSpan={columns.length}
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
