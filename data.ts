// TODO: generate actual contents for this file from your spreadsheet

import { Guest } from './model';

export const ROOM_SIZES = [7, 7, 7, 5];

export const GUESTS: Guest[] = [
    { name: "alice", responsible: true,  preferences: ["xarma", "holly", "julia"] },
    { name: "belle", responsible: false, preferences: ["tessa", "julia", "zooey"] },
    { name: "carly", responsible: false, preferences: ["maria", "quinn", "nalia"] },
    { name: "diana", responsible: true,  preferences: ["fiona", "sally", "ginny"] },
    { name: "erika", responsible: true,  preferences: ["fiona", "irene", "viola"] },
    { name: "fiona", responsible: false, preferences: ["carly", "ulani", "oprah"] },
    { name: "ginny", responsible: false, preferences: ["riley", "maria", "holly"] },
    { name: "holly", responsible: false, preferences: ["nalia", "kelly", "holly"] },
    { name: "irene", responsible: true,  preferences: ["erika", "sally", "tessa"] },
    { name: "julia", responsible: false, preferences: ["laura", "yetta", "oprah"] },
    { name: "kelly", responsible: true,  preferences: ["wendy", "irene", "ginny"] },
    { name: "laura", responsible: false, preferences: ["diana", "wendy", "maria"] },
    { name: "maria", responsible: false, preferences: ["yetta", "penny", "ginny"] },
    { name: "nalia", responsible: false, preferences: ["diana", "quinn", "yetta"] },
    { name: "oprah", responsible: false, preferences: ["penny", "nalia", "laura"] },
    { name: "penny", responsible: true,  preferences: ["viola", "oprah", "fiona"] },
    { name: "quinn", responsible: false, preferences: ["irene", "xarma", "carly"] },
    { name: "riley", responsible: false, preferences: ["erika", "viola", "tessa"] },
    { name: "sally", responsible: false, preferences: ["carly", "riley", "ulani"] },
    { name: "tessa", responsible: false, preferences: ["xarma", "zooey", "belle"] },
    { name: "ulani", responsible: true,  preferences: ["belle", "alice", "kelly"] },
    { name: "viola", responsible: false, preferences: ["zooey", "sally", "julia"] },
    { name: "wendy", responsible: false, preferences: ["erika", "diana", "penny"] },
    { name: "xarma", responsible: false, preferences: ["wendy", "laura", "kelly"] },
    { name: "yetta", responsible: true,  preferences: ["alice", "ulani", "belle"] },
    { name: "zooey", responsible: false, preferences: ["riley", "alice", "quinn"] },
];
