import style from './Table.module.scss';
import clsx from 'clsx';

export type Column<T extends { id: string }> = {
  [K in keyof T]: {
    key: K;
    title: React.ReactNode;
    render?: (item: T[K]) => React.ReactNode;
  };
}[keyof T];

export const createColumn = <T extends { id: string }>(column: Column<T>): Column<T> => column;

export type TableProps<T extends { id: string }> = React.TableHTMLAttributes<HTMLTableElement> & {
  columns: Array<Column<T>>;
  data: Array<T>;
  selectedItem?: T | undefined;
  emptyDataPlaceholder?: React.ReactNode;
  placeholder?: string;
  caption?: string;
  onRowClick?: (item: T) => void;
};

export function Table<T extends { id: string }>({
  data,
  columns,
  caption,
  selectedItem,
  emptyDataPlaceholder,
  className,
  placeholder,
  onRowClick,
  ...rest
}: TableProps<T>) {
  return (
    <div className={style['table_wrapper']}>
      <table
        className={clsx(className, style['table'], data.length === 0 && style['empty_table'])}
        {...rest}
      >
        <caption className={style['caption']}>{caption}</caption>
        <thead>
          <tr>
            {columns.map(el => (
              <th key={el.key.toString()}>{el.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                {emptyDataPlaceholder ? (
                  <div className={style['empty_data']}>{emptyDataPlaceholder}</div>
                ) : (
                  <div className={clsx(style['empty_data'], style['empty_data_column'])}>
                    Нет данных
                  </div>
                )}
              </td>
            </tr>
          ) : (
            data.map(item => {
              return (
                <tr
                  key={item.id}
                  className={clsx(
                    style['row'],
                    selectedItem?.id === item.id && style['selected_line']
                  )}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map(col => (
                    <td
                      className={clsx(style['column'], !item[col.key] && style['empty_cell'])}
                      key={col.key.toString()}
                    >
                      {col.render
                        ? col.render(item[col.key])
                        : ((item[col.key] as React.ReactNode) ?? placeholder)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
