import { Model } from './gp';

export interface Guest {
    name: string;
    preferences: string[];
    responsible: boolean;
};

type Room = Guest[];
type Housing = Room[];

// to prevent equivalent housings where fungible rooms are swapped or
// individuals' order in a room is shuffled, keep guests alphabetized in each
// room, and rooms sorted by their first guest's name.
function compareGuest(a, b: Guest): number {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

function normalize(housing: Housing): Housing {
    return housing.
        map(room => room.sort(compareGuest)).
        sort((a, b) => compareGuest(a[0], b[0]));
}

// trivial. try beefing this up
function scoreRoom(room: Room): number {
    const names = room.map(guest => guest.name);
    const alpha = 5 * room.filter(guest => names.indexOf(guest.preferences[0]) >= 0).length;
    const beta = 3 * room.filter(guest => names.indexOf(guest.preferences[1]) >= 0).length;
    const gamma = 1 * room.filter(guest => names.indexOf(guest.preferences[2]) >= 0).length;
    const delta = 100 * (room.some(guest => guest.responsible) ? 1 : 0);
    const epsilon = -5 * (alpha + beta + gamma === 0 ? 1 : 0);
    return alpha + beta + gamma + delta + epsilon;
}

export function buildModel(guestList: Guest[], roomSizes: number[]): Model<Housing> {
    return {
        generate() {
            // shuffle guests into the rooms
            let guests = guestList;
            let sizes = roomSizes;
            return normalize(sizes.map(size => {
                const room = [];
                for (let i = 0; i < size; i++) {
                    const k = Math.floor(Math.random() * guests.length);
                    room.push(guests[k]);
                    guests = guests.slice(0, k).concat(guests.slice(k+1));
                }
                return room;
            }));
        },
    
        score(housing) {
            // for tournament selection to work scores must all be > 0, so add 1 to
            // the sum of room scores
            return housing.reduce((sum, room) => sum + scoreRoom(room), 1);
        },
    
        breed(left, right) {
            // this could/should be smarter, but for now "reproduce asexually" and
            // just rely on mutations. so return the parents as is
            return [left, right];
        },
    
        mutate(housing) {
            // swap two guests from two different rooms
            const mutated = housing.map(room => [...room]);
            const a = Math.floor(Math.random() * housing.length);
            let b = Math.floor(Math.random() * (housing.length - 1));
            if (b <= a) {
                b += 1;
            }
            const c = Math.floor(Math.random() * housing[a].length);
            const d = Math.floor(Math.random() * housing[b].length);
            mutated[b][d] = housing[a][c];
            mutated[a][c] = housing[b][d];
            return normalize(mutated);
        },
    };
}
