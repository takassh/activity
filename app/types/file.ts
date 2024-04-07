export type File = {
  external?: ExternalFile;
  file?: HostedFile;
};

export function isFileTypeExternal(
  file?: File,
): file is { external: ExternalFile } {
  return (file as { external: ExternalFile })?.external !== undefined;
}

export function isFileTypeHosted(file?: File): file is { file: HostedFile } {
  return (file as { file: HostedFile })?.file !== undefined;
}

export type HostedFile = {
  url: string;
  expiry_time: Date;
};

export type ExternalFile = {
  url: string;
};
