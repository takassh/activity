export type Parent =
  | {
      type: 'none';
    }
  | {
      type: 'database_id';
      database_id: string;
    }
  | {
      type: 'page_id';
      page_id: string;
    }
  | {
      type: 'workspace';
    }
  | {
      type: 'block_id';
      block_id: string;
    };
