<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>에코잉 | HOME</title>
	<meta name="description" content="환경을 위한 움직임 ― 에코잉" />
</svelte:head>

<main>
	{#if !data.user}
		#redirect /register
	{:else}
		<div>안녕하세여? {data.user.name}님!</div>
		<div>당신의 포인트는 <strong>{data.user.point}</strong>입니다.</div>
		<li>무언갈 사고싶나요? <a href="/shop">여길</a> 눌러보세요!</li>
		<button formaction="/logout" type="submit">Logout</button>
	{/if}
</main>
