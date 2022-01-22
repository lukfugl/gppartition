import { GUESTS, ROOM_SIZES } from './data';
import { buildModel } from './model';
import { runGP } from './gp';

const model = buildModel(GUESTS, ROOM_SIZES);
const { value: housing, score } = runGP(model, 250, 10_000);

console.log(`Score: ${score}`);
housing.forEach(room => {
    const names = room.map(guest => guest.name);
    const guests = room.map(guest => {
        const { name, responsible, preferences } = guest;
        let label = name;
        if (responsible) {
            label = `*${label}`;
        }
        return `${responsible ? '*' : ''}${name} (${preferences.filter(name => names.indexOf(name) > 0).length})`;
    });
    console.log(guests.join(", "));
});