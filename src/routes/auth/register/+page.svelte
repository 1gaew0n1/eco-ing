<script lang="ts">
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
	import { writable } from 'svelte/store';
	import Loding from '../../Loding.svelte';

	export let step: number = 0;
	const titles = [
		'안녕하세요?',
		'이름을 알려주세요.',
		'학교와 학번을 입력해주세요.',
		'아이디를 설정해주세요.',
		'비밀번호를 설정해주세요.',
		'학생증 뒷면 바코드의 글자를 입력해주세요.',
		''
	];

	const isLoading = writable(false);

	// 폼 제출 이벤트 핸들러
	const handleSubmit = (event: Event) => {
		isLoading.set(true);
	};
</script>

{#if $isLoading}
	<Loding />
{/if}

<div class="container">
	<form method="POST" on:submit={handleSubmit}>
		<div class="header">
			<button
				class="back"
				type="button"
				on:click={() => {
					if (step == 0) {
						goto('/');
					} else {
						step = step - 1;
					}
				}}>&#60;</button
			>
		</div>

		<div class="contents">
			{#if step == 0}
				<p class="emoji">👋</p>
				<p class="title first">{titles[step]}</p>
				<p class="description">만나서 반가워요! 회원가입을 해볼까요?</p>
			{:else}
				<p class="title">{titles[step]}</p>
			{/if}

			<input
				type="text"
				id="name"
				name="name"
				placeholder="이름을 입력해주세요."
				class={step == 1 ? '' : 'hidden'}
			/>
			<input
				type="text"
				id="schoolName"
				name="schoolName"
				placeholder="학교 이름을 입력해주세요."
				class={step == 2 ? '' : 'hidden'}
			/>
			<input
				type="number"
				id="studentsId"
				name="studentsId"
				placeholder="학번을 입력해주세요."
				class={step == 2 ? '' : 'hidden'}
			/>
			<input type="text" id="username" name="username" class={step == 3 ? '' : 'hidden'} />
			<input type="password" id="password" name="password" class={step == 4 ? '' : 'hidden'} />
			<input type="text" id="barcode" name="barcode" class={step == 5 ? '' : 'hidden'} />
		</div>

		<div class="footer">
			{#if step == 5}
				<button type="submit" class="next">가입하기</button>
			{:else}
				<button
					class="next"
					type="button"
					on:click={() => {
						step = step + 1;
					}}>다음</button
				>
			{/if}
		</div>
	</form>
</div>

<svelte:head>
	<title>에코잉 | 회원가입</title>
	<meta name="description" content="환경을 위한 움직임 ― 에코잉" />
</svelte:head>

<style>
	.hidden {
		display: none;
	}
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	input {
		color: black;
		border: none;
		border-bottom: 0.1rem solid gray;
		margin-top: 2rem;
		width: 80%;
		padding: 0.5rem;
		font-size: 1.5rem;
		height: 3rem;
	}

	input:focus {
		border-bottom: 0.1rem solid var(--green-dark);
		outline: none;
	}

	.contents,
	.footer {
		text-align: center;
		align-items: center;
		justify-content: center;
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

	.contents {
		flex: 8.5;
		height: 85vh;
	}
	.title {
		font-size: 2rem;
		padding-top: 1em;
		font-weight: 1000;
	}

	.emoji {
		font-size: 9rem;
		padding-top: 1.25em;
		font-weight: 1000;
	}

	.first {
		font-size: 3rem;
		padding-top: 2rem;
	}

	.footer {
		flex: 1;
		height: 10vh;
		width: 100%;
	}

	button.next {
		width: 100%;
		height: 100%;
		background-color: var(--green);
		font-weight: bold;
		color: white;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
	}

	.description {
		color: gray;
	}
</style>
