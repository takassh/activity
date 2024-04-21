export type Parent = {
  type: string;
  none?: string;
  database_id?: string;
  page_id?: string;
  workspace?: string;
  block_id?: string;
};

export function isParentTypeDatabaseId(
  parent: Parent,
): parent is Parent & { database_id: string } {
  return parent.database_id !== undefined;
}

export function isParentTypePageId(
  parent: Parent,
): parent is Parent & { page_id: string } {
  return parent.page_id !== undefined;
}

export function isParentTypeWorkspace(
  parent: Parent,
): parent is Parent & { workspace: string } {
  return parent.workspace !== undefined;
}

export function isParentTypeBlockId(
  parent: Parent,
): parent is Parent & { block_id: string } {
  return parent.block_id !== undefined;
}
