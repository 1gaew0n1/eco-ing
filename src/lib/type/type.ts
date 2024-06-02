// src/stores/profileStore.ts
import { writable } from 'svelte/store';

interface Profile {
	id: string;
	user_id: string;
	studentsId: string;
	schoolName: string;
	point: number;
	level: number;
	barcode: string;
	email: string | null;
}

export type Product = {
	id: number;
	name: string;
	imgURL: string;
	description: string;
	published: boolean;
	amount: number;
	price: number;
	createdAt: string;
	updatedAt: String;
};

export type Card = {
	id: string;
	title: string;
	imgURL: string;
	style: string;
	url: string;
	createdAt: string;
	updatedAt: string;
	description: String;
};

// 초기 프로파일 객체
const initialProfile: Profile = {
	id: '',
	user_id: '',
	studentsId: '',
	schoolName: '',
	point: 0,
	level: 0,
	barcode: '',
	email: null
};

// profile 스토어 생성
export const profileStore = writable<Profile>(initialProfile);
