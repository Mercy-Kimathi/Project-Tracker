import { create } from "zustand";
export type Status = "Backlog"|"Todo"|"In Progress"|"Done";
export type Priority = "Urgent"|"High"|"Medium"|"Low";
export type Issue = {id:string;title:string;description:string;status:Status;priority:Priority;assignee:string;label:string};
type Store = {issues:Issue[]; addIssue:(issue:Issue)=>void; moveIssue:(id:string,status:Status)=>void};
const initial:Issue[] = [
{id:"LIN-42",title:"Improve onboarding checklist",description:"Make the first-run experience feel effortless.",status:"In Progress",priority:"High",assignee:"JD",label:"Product"},
{id:"LIN-41",title:"Add keyboard shortcuts",description:"Power-user shortcuts for common actions.",status:"Todo",priority:"Medium",assignee:"AK",label:"Feature"},
{id:"LIN-40",title:"Fix command menu focus",description:"Restore focus after closing the command menu.",status:"Todo",priority:"Urgent",assignee:"JD",label:"Bug"},
{id:"LIN-39",title:"Audit empty states",description:"Bring consistency to empty views.",status:"Backlog",priority:"Low",assignee:"SM",label:"Design"},
{id:"LIN-38",title:"Update billing settings",description:"Clarify plan and usage information.",status:"In Progress",priority:"Medium",assignee:"AK",label:"Product"},
{id:"LIN-37",title:"Ship workspace invites",description:"Invite teammates from workspace settings.",status:"Done",priority:"High",assignee:"SM",label:"Feature"},
{id:"LIN-36",title:"Polish mobile navigation",description:"Improve navigation on narrow screens.",status:"Backlog",priority:"Low",assignee:"JD",label:"Design"},
{id:"LIN-35",title:"Resolve avatar upload error",description:"Handle large image uploads gracefully.",status:"Done",priority:"Urgent",assignee:"AK",label:"Bug"}
];
export const useIssueStore=create<Store>((set)=>({issues:initial,addIssue:(issue)=>set(s=>({issues:[issue,...s.issues]})),moveIssue:(id,status)=>set(s=>({issues:s.issues.map(i=>i.id===id?{...i,status}:i)}))}));