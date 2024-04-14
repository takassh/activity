export type Top = {
  processes: Processes;
  load_avg: LoadAvg;
  cpu_usage: CpuUsage;
  shared_libs: SharedLibs;
  mem_regions: MemRegions;
  phys_mem: PhysMem;
  vm: Vm;
  networks: Networks;
  disks: Disks;
};

export type Processes = {
  total: number;
  running: number;
  stuck?: number;
  sleeping: number;
  threads: number;
  datetime: Date;
};

export type LoadAvg = {
  one: number;
  five: number;
  fifteen: number;
};

export type CpuUsage = {
  user: number;
  system: number;
  idle: number;
};

export type SharedLibs = {
  resident: number;
  data: number;
  linkedit: number;
};

export type MemRegions = {
  total: number;
  resident: number;
  private: number;
  shared: number;
};

export type PhysMem = {
  used: number;
  wired: number;
  compressor: number;
  unused: number;
};

export type Vm = {
  vsize: number;
  framework_vsize: number;
  swapins: number;
  swapouts: number;
};

export type Networks = {
  packets_in: number;
  packets_out: number;
  in_total: number;
  out_total: number;
};

export type Disks = {
  read: number;
  written: number;
  read_total: number;
  written_total: number;
};

export function isTop(data: any): data is Top {
  return typeof data === 'string';
}
