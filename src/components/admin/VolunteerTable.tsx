"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import type { VolunteerApplication, VolunteerStatus } from "@/types/volunteer";
import { updateVolunteerStatus } from "@/lib/firebase/firestore";
import { formatDisplayDate } from "@/lib/utils/dates";
import { describeError } from "@/lib/utils/errors";

interface VolunteerTableProps {
  volunteers: VolunteerApplication[];
  onRefresh: () => void;
}

const columnHelper = createColumnHelper<VolunteerApplication>();

export function VolunteerTable({ volunteers, onRefresh }: VolunteerTableProps) {
  // Memoised so the column definitions below can depend on it honestly,
  // instead of capturing a stale onRefresh behind an exhaustive-deps override.
  const handleStatusChange = useCallback(
    async (id: string, status: VolunteerStatus) => {
      try {
        await updateVolunteerStatus(id, status);
        toast.success("Status updated.");
        onRefresh();
      } catch (err) {
        console.error("Failed to update volunteer status:", err);
        toast.error(`Failed to update status: ${describeError(err)}`);
      }
    },
    [onRefresh],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", { header: "Name" }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => (
          <a
            href={`mailto:${info.getValue()}`}
            className="text-amber-600 hover:underline"
          >
            {info.getValue()}
          </a>
        ),
      }),
      columnHelper.accessor("phone", {
        header: "Phone",
        cell: (info) => (
          <a
            href={`tel:${info.getValue().replace(/\s/g, "")}`}
            className="text-amber-600 hover:underline"
          >
            {info.getValue()}
          </a>
        ),
      }),
      columnHelper.accessor("skills", {
        header: "Skills",
        cell: (info) => info.getValue() || "—",
      }),
      columnHelper.accessor("message", {
        header: "Message",
        cell: (info) => (
          <span className="line-clamp-2 max-w-xs">{info.getValue() || "—"}</span>
        ),
      }),
      columnHelper.accessor("createdAt", {
        header: "Applied",
        cell: (info) =>
          info.getValue() ? formatDisplayDate(info.getValue()!) : "—",
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          const id = info.row.original.id;
          return (
            <select
              value={status}
              onChange={(e) =>
                handleStatusChange(id, e.target.value as VolunteerStatus)
              }
              className="rounded-lg border border-gray-300 px-2 py-1 text-sm"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="archived">Archived</option>
            </select>
          );
        },
      }),
    ],
    [handleStatusChange],
  );

  const table = useReactTable({
    data: volunteers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (volunteers.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">No volunteer applications yet.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-gray-200 text-gray-500">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-3 font-medium">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
