import { faker } from '@faker-js/faker/locale/pt_BR';
import { Program, Document, Report, AuditEvent, Deadline } from '../types';

// Helper to create a specific number of items
const createMockData = &lt;T&gt;(creator: () =&gt; T, count: number): T[] =&gt; {
  return faker.helpers.multiple(creator, { count });
};

// --- Programs ---
const createRandomProgram = (): Omit&lt;Program, 'id'&gt; =&gt; {
  const budget = faker.number.int({ min: 50000, max: 500000 });
  const spent = faker.number.int({ min: 0, max: budget });
  return {
    name: faker.company.name() + ' ' + faker.helpers.arrayElement(['Escolar', 'Educacional', 'Infantil']),
    code: faker.helpers.arrayElement(['PNAE', 'PDDE', 'FUNDEB', 'PSE', 'ETI']),
    description: faker.lorem.sentence(),
    deadline: faker.date.future(),
    status: faker.helpers.arrayElement(['pendente', 'em_andamento', 'concluido', 'atrasado']),
    budget,
    spent,
  };
};
export const mockPrograms: Program[] = createMockData(() =&gt; ({ id: faker.string.uuid(), ...createRandomProgram() }), 15);


// --- Documents ---
const createRandomDocument = (): Document =&gt; {
    const program = faker.helpers.arrayElement(mockPrograms);
    return {
        id: faker.string.uuid(),
        programId: program.id,
        name: `doc_${faker.system.fileName({ extensionCount: 1 })}`,
        type: faker.helpers.arrayElement(['comprovante', 'nota_fiscal', 'relatorio', 'ata', 'outros']),
        uploadDate: faker.date.past(),
        size: faker.number.int({ min: 100, max: 20000 }), // in KB
        status: faker.helpers.arrayElement(['aprovado', 'rejeitado', 'pendente']),
    };
};
export const mockDocuments: Document[] = createMockData(createRandomDocument, 50);


// --- Reports ---
const createRandomReport = (): Report =&gt; {
    const program = faker.helpers.arrayElement(mockPrograms);
    return {
        id: faker.string.uuid(),
        programId: program.id,
        title: `Relatório ${faker.word.noun()} - ${faker.date.month()}`,
        period: `${faker.date.month()} ${faker.date.past().getFullYear()}`,
        createdAt: faker.date.past(),
        status: faker.helpers.arrayElement(['rascunho', 'enviado', 'aprovado', 'rejeitado']),
    };
};
export const mockReports: Report[] = createMockData(createRandomReport, 20);

// --- Audit Events ---
const createRandomAuditEvent = (): AuditEvent =&gt; {
    const user = faker.person.fullName();
    const action = faker.helpers.arrayElement(['Upload de documento', 'Aprovação de prestação', 'Rejeição de documento', 'Geração de relatório', 'Alerta de prazo', 'Login no sistema']);
    const program = faker.helpers.arrayElement(mockPrograms);
    return {
        id: faker.string.uuid(),
        user,
        action,
        target: `${program.code} - ${faker.lorem.words(3)}`,
        program: program.code,
        timestamp: faker.date.recent({ days: 30 }),
        status: faker.helpers.arrayElement(['success', 'warning', 'error']),
        details: faker.lorem.sentence(),
    };
};
export const mockAuditEvents: AuditEvent[] = createMockData(createRandomAuditEvent, 75);


// --- Deadlines ---
const createRandomDeadline = (): Deadline =&gt; {
    const program = faker.helpers.arrayElement(mockPrograms);
    return {
        id: faker.string.uuid(),
        title: `Prazo Final ${program.code}`,
        program: program.code,
        date: faker.date.future({ years: 0.5 }),
        priority: faker.helpers.arrayElement(['alta', 'media', 'baixa']),
        status: faker.helpers.arrayElement(['pendente', 'concluido', 'atrasado']),
        description: `Entrega de ${faker.lorem.words(3)} para o programa ${program.name}`
    };
};
export const mockDeadlines: Deadline[] = createMockData(createRandomDeadline, 30);
