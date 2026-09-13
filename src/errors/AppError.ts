export interface AppErrorDetail {
  field: string;
  messages: string[];
}

export class AppError extends Error {
  statusCode: number;
  details: AppErrorDetail[] | undefined;

  constructor(message: string, statusCode = 500, details?: AppErrorDetail[]) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}
