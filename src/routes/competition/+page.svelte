<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Loding from '../Loding.svelte';
	import { goto } from '$app/navigation';
	import { resultStore } from '$lib/type/type';

	let isLoading = writable(false);
	let result: { [key: string]: any };

	// 스토어 구독
	resultStore.subscribe((value) => {
		result = value;
	});

	onMount(async () => {
		isLoading.set(true);
		try {
			const response = await fetch('/api/competition');
			const data = await response.json();
			resultStore.set(data.contents.result);

			console.log($resultStore);
		} catch (error) {
			console.error('제품을 불러오는 도중 오류가 발생했습니다:', error);
		}
		isLoading.set(false);
	});

	let bans = [1, 2, 3, 4, 5, 6];
	let haks = [1, 2, 3];
</script>

<svelte:head>
	<title>에코잉 | SHOP</title>
	<meta name="description" content="환경을 위한 움직임 ― 에코잉" />
</svelte:head>

{#if $isLoading}
	<Loding />
{/if}

<button
	class="back"
	type="button"
	on:click={() => {
		goto('/');
	}}>&#60;</button
>

<center>
	<p class="title">반 대항전</p>
</center>

<hr />

<div class="contents">
	<div>
		{#each Object.entries(result).sort((a, b) => b[1] - a[1]) as [key, value]}
			<div class="card">
				<div class="card-content">
					<h2 class="card-title">{key.charAt(1)} 학년 {key.charAt(3)}반</h2>
					<hr class="asdasd" />
					<div class="card-price">{value} 포인트</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.back {
		height: 100%;
		width: 10%;
		color: gray;
		font-weight: 400;
		font-size: 1.5rem;
		background-color: white;
		border: none;
	}
	.title {
		margin-top: 1rem;
		margin-bottom: 1rem;
		font-size: 3rem;
		font-weight: 700;
	}
	/* CSS 추가 */
	.contents {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding: 20px;
		width: calc(100% - 40px);
	}

	.card {
		width: 100%;
		margin-bottom: 20px;
		box-sizing: border-box;
		border: 1px solid #ddd;
		border-radius: 5px;
		overflow: hidden;
	}

	.card-image {
		width: 100%;
		display: block;
	}

	.card-content {
		padding: 10px;
	}

	.asdasd {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.card-title {
		margin-top: 0;
		font-size: 3rem;
	}

	.card-price {
		text-align: right;
		font-size: 2rem;
		color: green;
		font-weight: 1000;
	}

	.card-sold-out {
		color: red;
		font-size: 1.5rem;
		font-weight: 700;
	}

	.card-des {
		font-size: 1.25rem;
	}

	.card-link {
		display: block;
		text-align: center;
		margin-top: 10px;
		text-decoration: none;
		background-color: #007bff;
		color: white;
		padding: 1rem 1rem;
		border-radius: 5px;
		font-size: 1.5rem;
	}

	.disabled {
		background-color: #8b8b8b;
	}
</style>
