export interface Player {
	ratio: number;
	age: number;
}

function isDrawBetweenPlayers<T extends Player>(player1: NonNullable<T>, player2: NonNullable<T>): boolean{
    return player1.ratio === player2.ratio;
}

function returnStrongestPlayer<T extends Player>(player1: T, player2: NonNullable<T>) {
	if (!player1) return player2;
	if (!player2) return player1;
	return player1.ratio > player2.ratio ? player1 : player2;
}

function isEliminatedBy<T extends Player>(player1: NonNullable<T>, player2: NonNullable<T>): boolean {
	if (!player1) return true;
	if (!player2) return false;
	return (player1.age >= player2.age && player1.ratio < player2.ratio) || (player1.age > player2.age && player1.ratio <= player2.ratio)
}

export function getChampions<T extends Player>(participants: Array<T>) {

    if(participants.length === 0) return [];

	const RECORD = participants.reduce((record, participant) => {

		const CATEGORY = participant.age;

		const CURRENT_CHAMPION = record[CATEGORY] ?? { ratio: 0 };

        if(isDrawBetweenPlayers(participant, CURRENT_CHAMPION)) {
            record.draws = record.draws ?? [];
			record.draws.push(participant);
			record.draws.push(CURRENT_CHAMPION);
			return record;
        };

		record[CATEGORY] = returnStrongestPlayer(participant, CURRENT_CHAMPION);

		//Why I'm deliberately mutating the object
		//@resource : https://www.youtube.com/watch?v=tcZbY-Q0TIE
		return record;
	}, {} as any);

	const BESTS_BY_AGE = Array.from(new Set(Object.values(RECORD).flat().sort((a,b) => {
		return (a as T).age - (b as T).age;
	}))) as Array<T>;

	delete RECORD.draws;

	const ASCENDING_ORDERED_AGES = Object.keys(RECORD).sort((a, b) => Number(a) - Number(b));



	const CHAMPION_LIST: Array<T> = [];

	loopingOnPlayers: for (const player of BESTS_BY_AGE) {

		loopingOnAges: for (const ageCategory of ASCENDING_ORDERED_AGES) {
			if (Number(ageCategory) === player.age) break loopingOnAges;
			if (isEliminatedBy(player, RECORD[ageCategory])) continue loopingOnPlayers;
		};

		CHAMPION_LIST.push(player);
	};

	return CHAMPION_LIST;
}