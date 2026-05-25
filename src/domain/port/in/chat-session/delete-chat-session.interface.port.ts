export interface DeleteChatSessionQuery {
  publicId: string;
}

export interface DeleteChatSessionInterfacePort {
  execute(query: DeleteChatSessionQuery): Promise<void>;
}
