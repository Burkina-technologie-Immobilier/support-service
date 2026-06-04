export interface DeleteFaqEntryQuery {
  publicId: string;
}

export interface DeleteFaqEntryInterfacePort {
  execute(query: DeleteFaqEntryQuery): Promise<void>;
}
