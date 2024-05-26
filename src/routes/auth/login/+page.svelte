<script>
	import { goto } from '$app/navigation';
</script>

<form method="POST" class="container">
	<div class="header">
		<button
			class="back"
			type="button"
			on:click={() => {
				goto('/');
			}}>&#60;</button
		>
	</div>
	<div class="contents">
		<p class="title">로그인</p>
		<input type="text" id="username" name="username" placeholder="아이디" required />
		<input type="password" id="password" name="password" placeholder="비밀번호" required />
	</div>
	<div class="footer">
		<button type="submit" class="next">로그인</button>
	</div>
</form>

<style>
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
</style>
