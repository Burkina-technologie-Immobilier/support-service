export interface DeleteTicketQuery {
  publicId: string;
}

export interface DeleteTicketInterfacePort {
  execute(query: DeleteTicketQuery): Promise<void>;
}
