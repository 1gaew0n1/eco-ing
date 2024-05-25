<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<form method="POST">
	<hgroup>
		<h2>Change Account Settings</h2>
		<h3>To post articles, you'll need an account.</h3>
	</hgroup>
	
	<label for="name">Name</label>
	<input type="text" id="name" name="name" value={data.user.name} required/>

	<label for="username">Username</label>
	<input type="text" id="username" name="username" value={data.user.username} required />

	<label for="studentsId">Student's ID</label>
	<input type="text" id="studentsId" name="studentsId" value={data.user.studentsId} required />

	<label for="schoolName">School Name</label>
	<input type="text" id="schoolName" name="schoolName" value={data.user.schoolName} required />

	<label for="email">Email</label>
	<input type="email" id="email" name="email" value={data.user.email}/>

	<button type="submit">Register</button>
</form>
<p>Already have an account? <a href="/login">Login</a></p>
