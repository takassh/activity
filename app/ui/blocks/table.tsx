import { Block, isBlockTypeTableRow } from '@/app/types/block';
import { RichText } from '@/app/types/rich_text';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Paragraph } from './paragraph';

export function TableBlock({
  id,
  blocks,
}: {
  id: string;
  blocks: Block[] | undefined;
}) {
  const cells: RichText[][][] = [[[]]];
  for (const row of blocks ?? []) {
    if (!isBlockTypeTableRow(row)) {
      continue;
    }
    const rows = [];
    for (const cell of row.table_row.cells) {
      rows.push(cell);
    }
    cells.push(rows);
  }

  return (
    <TableContainer id={id}>
      <Table variant={'simple'} size={['sm', 'md']}>
        {cells.map((row, i) => {
          if (i === 0) {
            return (
              <Thead key={`thead-${i}`}>
                <Tr>
                  {row.map((cell, j) => (
                    <Th key={`th-${j}`}>
                      <Paragraph id={`th-${j}`} text={cell} />
                    </Th>
                  ))}
                </Tr>
              </Thead>
            );
          }
          return (
            <Tbody key={`tbody-${i}`}>
              <Tr>
                {row.map((cell, j) => (
                  <Td key={`td-${j}`}>
                    <Paragraph id={`th-${j}`} text={cell} />
                  </Td>
                ))}
              </Tr>
            </Tbody>
          );
        })}
      </Table>
    </TableContainer>
  );
}
