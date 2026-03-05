import type { NavigationItem, SummaryMetric } from "@/types/common";
import type { ChurchEvent, Member, Ministry } from "@/types/church";

export const HOME_HIGHLIGHTS: SummaryMetric[] = [
  {
    label: "Membros ativos",
    value: "248",
    detail: "Dados centralizados para acompanhamento pastoral, celulas e servico.",
  },
  {
    label: "Eventos do mes",
    value: "12",
    detail: "Calendario unificado para cultos, conferencias e encontros ministeriais.",
  },
  {
    label: "Ministerios",
    value: "9",
    detail: "Equipas com foco em recrutamento, escala e acompanhamento de lideres.",
  },
];

export const DASHBOARD_METRICS: SummaryMetric[] = [
  {
    label: "Presenca media",
    value: "81%",
    detail: "Subida de 6% nas ultimas quatro semanas.",
  },
  {
    label: "Novos visitantes",
    value: "34",
    detail: "Registos feitos nos cultos de domingo e grupos pequenos.",
  },
  {
    label: "Escalas abertas",
    value: "7",
    detail: "Ministerios com necessidade de confirmacao para o proximo fim de semana.",
  },
];

export const DASHBOARD_NAV_ITEMS: NavigationItem[] = [
  {
    href: "/dashboard",
    label: "Resumo",
    description: "Indicadores principais e atalhos de operacao.",
  },
  {
    href: "/dashboard/members",
    label: "Membros",
    description: "Perfis, acompanhamento e estado de integracao.",
  },
  {
    href: "/dashboard/events",
    label: "Eventos",
    description: "Agenda da igreja e tarefas de organizacao.",
  },
  {
    href: "/dashboard/ministries",
    label: "Ministerios",
    description: "Equipas, liderancas e vagas abertas.",
  },
];

export const UPCOMING_EVENTS: ChurchEvent[] = [
  {
    id: "event-1",
    title: "Culto de jovens",
    date: "2026-03-06T19:30:00.000Z",
    location: "Auditorio principal",
    description: "Rever equipa de louvor e recepcao ate quarta-feira.",
  },
  {
    id: "event-2",
    title: "Escola de lideranca",
    date: "2026-03-09T20:00:00.000Z",
    location: "Sala 03",
    description: "Confirmar materiais e presenca dos lideres de celula.",
  },
  {
    id: "event-3",
    title: "Acao social",
    date: "2026-03-14T09:00:00.000Z",
    location: "Centro comunitario",
    description: "Separar voluntarios e doacoes antes da sexta-feira.",
  },
];

export const MEMBER_HIGHLIGHTS: Member[] = [
  {
    id: "member-1",
    name: "Mariana Costa",
    email: "mariana@mychurch.pt",
    role: "Lider de celula",
    status: "Acompanhamento pendente",
  },
  {
    id: "member-2",
    name: "Paulo Ribeiro",
    email: "paulo@mychurch.pt",
    role: "Visitante recorrente",
    status: "Integracao em andamento",
  },
  {
    id: "member-3",
    name: "Sara Almeida",
    email: "sara@mychurch.pt",
    role: "Voluntaria do infantil",
    status: "Documentacao atualizada",
  },
  {
    id: "member-4",
    name: "Joao Martins",
    email: "joao@mychurch.pt",
    role: "Musico",
    status: "Revisar disponibilidade",
  },
];

export const MINISTRY_HIGHLIGHTS: Ministry[] = [
  {
    id: "ministry-1",
    name: "Louvor",
    leaderName: "Rita Campos",
    membersCount: 18,
    focus: "Fechar escala do domingo",
  },
  {
    id: "ministry-2",
    name: "Recepcao",
    leaderName: "Andre Sousa",
    membersCount: 12,
    focus: "Recrutar 3 novos voluntarios",
  },
  {
    id: "ministry-3",
    name: "Infantil",
    leaderName: "Carla Neves",
    membersCount: 16,
    focus: "Atualizar check-in e materiais",
  },
  {
    id: "ministry-4",
    name: "Midia",
    leaderName: "Tiago Lopes",
    membersCount: 7,
    focus: "Revisar cobertura do evento de jovens",
  },
];