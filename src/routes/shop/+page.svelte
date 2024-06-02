<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Loding from '../Loding.svelte';
	import { goto } from '$app/navigation';

	type Product = {
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

	let isLoading = writable(false);
	const products = writable<Product[]>([]);

	onMount(async () => {
		isLoading.set(true);
		try {
			const response = await fetch('/api/product');
			const data = await response.json();
			products.set(data.products);
		} catch (error) {
			console.error('Error fetching cards:', error);
		}
		isLoading.set(false);
	});
</script>

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
	<p class="title">상점</p>
</center>

<hr />

<div class="contents">
	<div>
		{#each $products as card}
			{#if card.published}
				<div class="card" style="width: 100%;">
					<img src={card.imgURL} alt={card.name} class="card-image" width="100%" height="100%" />
					<div class="card-content">
						<h2 class="card-title">{card.name}</h2>
						<hr class="asdasd" />
						<p class="card-des">{card.description}</p>
						{#if card.amount == 0}
							<p class="card-sold-out">품절됨</p>
						{:else if card.amount < 3}
							<p class="card-sold-out">품절임박! {card.amount}개 남음!</p>
						{/if}
						<p class="card-price">{card.price}P</p>

						<p>
							<a
								href="/shop{card.amount == 0 ? '' : '/' + card.id}"
								class="card-link {card.amount == 0 ? 'disabled' : ''}"
								>{card.amount == 0 ? '품절' : '구매'}</a
							>
						</p>
					</div>
				</div>
			{/if}
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
