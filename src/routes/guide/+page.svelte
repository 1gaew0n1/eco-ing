<script lang="ts">
	import { onMount } from 'svelte';
	import chrome from '$lib/assets/chrome.png';
	import { goto } from '$app/navigation';

	let deferredPrompt: any;

	onMount(() => {
		window.addEventListener('beforeinstallprompt', (e) => {
			// Prevents the default mini-infobar or install dialog from appearing on mobile
			e.preventDefault();
			// Save the event because you'll need to trigger it later.
			deferredPrompt = e;
		});
	});

	async function handleClick() {
		deferredPrompt.prompt();
		// Find out whether the user confirmed the installation or not
		const { outcome } = await deferredPrompt.userChoice;
		// The deferredPrompt can only be used once.
		deferredPrompt = null;
		// Act on the user's choice
		if (outcome === 'accepted') {
			console.log('User accepted the install prompt.');
		} else if (outcome === 'dismissed') {
			console.log('User dismissed the install prompt');
		}
	}
</script>

<div class="container">
	<div class="header">
		<button
			class="back"
			type="button"
			on:click={() => {
				goto('/');
			}}>&#60;</button
		>
	</div>
	{#if navigator.userAgent.includes('Chrome')}
		<img src={chrome} alt="how to install (chrome)" width="100%" />
	{:else}
		크롬 브라우저 사용 권장 (사실 기능 구현 못함 ㅈㅅ)
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.header {
		flex: 0.5;
		height: 5vh;
	}

	.back {
		height: 100%;
		width: 10%;
		color: gray;
		font-weight: 400;
		font-size: 1.5rem;
		background-color: white;
		border: none;
	}
</style>
