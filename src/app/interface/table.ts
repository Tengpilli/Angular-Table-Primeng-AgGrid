export interface DataViewType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
  confidential_status: boolean;
  file_type: string;
  email_to: string;
  email_from: string;
  date_sent: string;
  body: string;
}

export interface HandleParamType {
  value:
    | 'toEmail'
    | 'fromEmail'
    | 'firstName'
    | 'lastName'
    | 'name'
    | 'confidential'
    | '';
}
