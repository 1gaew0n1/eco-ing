<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>에코잉 | HOME</title>
	<meta name="description" content="환경을 위한 움직임 ― 에코잉" />
</svelte:head>

<main>
	<div class="container">
		{#if !data.user}
			<div class="box green no-top-radius">
				<p class="title">Eco -ing</p>
				<p class="description">환경을 지키는 움직임 - 에코잉</p>
				<div class="small-box">
					<a href="/auth/login">로그인 하기</a>
				</div>
				<div class="small-box">
					<a href="/auth/register">회원가입 하기</a>
				</div>
			</div>
		{:else}
			<div class="box green no-top-radius">
				<p class="title">Eco -ing</p>
				<p class="description">환경을 지키는 움직임 - 에코잉</p>
				<div class="point">
					<p class="small-title">{data.user.name}님의 환경 포인트</p>
					<p class="big-number">{data.user.point}P</p>
				</div>
			</div>
			<div class="toolkit">
				<div class="menu-button">
					<button
						on:click={() => {
							goto('/');
						}}
						><p>Main Page</p>
						메인 페이지</button
					>
				</div>
				<div class="menu-button">
					<button
						on:click={() => {
							goto('/shop');
						}}
						><p>Shop</p>
						구매
					</button>
					<p>></p>
				</div>

				<div class="menu-button">
					<form method="POST">
						<button formaction="/logout" type="submit"
							><p>Log out</p>
							로그아웃</button
						>
					</form>
				</div>
				<div class="menu-button">
					<button
						on:click={() => {
							goto('/auth/accounts');
						}}
						><p>Accounts</p>
						계정관리</button
					>
					<p>></p>
				</div>
			</div>
		{/if}
	</div>
	<section class="contents">
		<div class="card-news">
			<img src="" alt="틀딱" />
			<p class="news-title">에코잉 첫 시범</p>
			<p class="news-contents">테스트 콘텐츠입니다.</p>
			<button>확인하기</button>
		</div>
	</section>
</main>

<style>
	.container {
		display: flex;
		text-align: center;
		justify-items: center;
		align-items: center;
		flex-wrap: wrap;
		text-decoration: none;
		background-color: rgb(231, 231, 231);
	}

	.title {
		font-size: 3rem;
		margin-top: 1rem;
		font-weight: 800;
	}

	.description {
		font-size: 1rem;
		margin-top: 0.5rem;
		font-weight: 500;
	}

	.box {
		display: inline-block;
		flex-wrap: wrap;
		border-radius: 2rem;
		flex-grow: 1;
		height: 17rem;
		width: 100%;
	}

	.small-box {
		box-sizing: border-box;
		background-color: var(--green-dark);
		margin: 1rem;
		border-radius: 2rem;
		font-weight: 700;
		flex-grow: 1;
		width: calc(100% - 2rem);
		margin-right: 1rem;
		padding-top: 1.25rem;
		padding-bottom: 1.25rem;
		color: white;
	}

	.point {
		display: grid;
		text-align: left;
		margin-top: 1rem;
		background-color: var(--green-dark);
		box-sizing: border-box;
		height: calc(100% - 7.2rem);
		border-radius: 2rem;
	}

	.big-number {
		font-size: 4rem;
		margin-left: 1rem;
		font-weight: 1000;
	}

	.small-title {
		font-size: 1.5rem;
		margin: 1rem;
		margin-left: 1.5rem;
		margin-bottom: 0;
		font-weight: 700;
		height: 1rem;
	}

	.toolkit {
		margin-top: 1rem;
		margin-left: 1rem;
		margin-right: 1rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-gap: 1rem;
		width: 100%;
		margin-bottom: 1rem;
	}

	.menu-button {
		border: 0.1em solid var(--light-gray);
		display: flex;
		justify-content: center;
		align-items: center;
		height: 3rem;
		background-color: white;
		border-radius: 1rem;
		padding: 1rem;
	}

	.menu-button button {
		font-size: 1.25rem;
		text-align: center;
		background-color: white;
		border: none;
		width: 100%;
		height: 100%;
		font-weight: 700;
	}
	.menu-button button p {
		font-weight: 300;
		color: gray;
		font-size: 0.75rem;
	}

	.small-box a {
		color: white;
		text-decoration: none;
	}

	.small-box a:visited {
		color: white;
	}

	.green {
		background-color: var(--green);
		color: white;
	}

	.no-top-radius {
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
</style>
