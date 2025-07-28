export interface User {
  id: string;
  name: string;
  email: string;
  role: 'escola' | 'secretaria' | 'admin';
  institution: string;
  cnpj: string;
}

export interface Program {
  id: string;
  name: string;
  code: string;
  description: string;
  deadline: Date;
  status: 'pendente' | 'em_andamento' | 'concluido' | 'atrasado';
  budget: number;
  spent: number;
}

export interface Document {
  id: string;
  programId: string;
  name: string;
  type: 'comprovante' | 'nota_fiscal' | 'relatorio' | 'ata' | 'outros';
  uploadDate: Date;
  size: number; // in KB
  status: 'aprovado' | 'rejeitado' | 'pendente';
}

export interface Report {
  id: string;
  programId: string;
  title: string;
  period: string;
  createdAt: Date;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'rejeitado';
}

export interface AuditEvent {
  id: string;
  user: string;
  action: string;
  target: string;
  program: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error';
  details: string;
}

export interface Deadline {
  id: string;
  title: string;
  program: string;
  date: Date;
  priority: 'alta' | 'media' | 'baixa';
  status: 'pendente' | 'concluido' | 'atrasado';
  description: string;
}
