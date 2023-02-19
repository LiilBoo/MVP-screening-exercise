import { describe, expect, test } from "vitest";
import { getChampions, type Player } from "./getChampions";

interface Participant extends Player {
	name: string;
}

describe.concurrent("getChampions", () => {

	test("Karl and Lebron are champions", () => {
		//ARRANGE
		const PLAYER_LIST: Array<Participant> = [
			{ ratio: 1000, age: 30, name: "Moses" },
			{ ratio: 1100, age: 29, name: "Karl" },
			{ ratio: 1200, age: 31, name: "Lebron" },
		];
		const KARL_AND_LEBRON = [
			{ ratio: 1100, age: 29, name: "Karl" },
			{ ratio: 1200, age: 31, name: "Lebron" },
		];
		//ACT
		const RESULT = getChampions(PLAYER_LIST);
		//ASSERT
		expect(RESULT).toEqual(KARL_AND_LEBRON);
	});

	test("a list with players will return champions and not empty", () => {
		//ARRANGE
		const PLAYER_LIST: Array<Participant> = [
			{ ratio: 3000, age: 30, name: "Lebron" },
			{ ratio: 3000, age: 30, name: "Kareem" },
			{ ratio: 2999, age: 24, name: "Boo" },
			{ ratio: 700, age: 30, name: "Michael" },
			{ ratio: 2600, age: 31, name: "Karl" },
			{ ratio: 2700, age: 30, name: "Moses" },
		];
		const EMPTY_ARRAY: never[] = [];
		//ACT
		const RESULT = getChampions(PLAYER_LIST);
		//ASSERT
		expect(RESULT).not.toEqual(EMPTY_ARRAY);
	});

	test("returns GOATS", () => {


		//ARRANGE
		const PLAYER_LIST: Array<Participant> = [
			{ ratio: 3000, age: 30, name: "Kareem" },
			{ ratio: 2999, age: 24, name: "Boo" },
			{ ratio: 700, age: 30, name: "Félix" },
			{ ratio: 2600, age: 31, name: "Karl" },
			{ ratio: 2700, age: 30, name: "Moses" },
		];
		//ASSERT
		const CHAMPIONS: Array<Participant> = [
			{ ratio: 2999, age: 24, name: "Boo" },
			{ ratio: 3000, age: 30, name: "Kareem" },
		];
		//ACT
		const RESULT = getChampions(PLAYER_LIST);
		//ASSERT
		expect(RESULT).toEqual(CHAMPIONS);
	});

	test("accounts for draws", () => {
			//ARRANGE
			const PLAYER_LIST: Array<Participant> = [
				{ ratio: 3000, age: 30, name: "Kareem" },
				{ ratio: 3000, age: 30, name: "Kobe" },
				{ ratio: 2999, age: 24, name: "Boo" },
				{ ratio: 700, age: 30, name: "Félix" },
				{ ratio: 2600, age: 31, name: "Karl" },
				{ ratio: 2700, age: 30, name: "Moses" },
			];
			//ASSERT
			const CHAMPIONS: Array<Participant> = [
				{ ratio: 2999, age: 24, name: "Boo" },
				{ ratio: 3000, age: 30, name: "Kareem" },
				{ ratio: 3000, age: 30, name: "Kobe" },
			];
			//ACT
			const RESULT = getChampions(PLAYER_LIST);
			//ASSERT
			expect(RESULT).toEqual(CHAMPIONS);
	});
});
