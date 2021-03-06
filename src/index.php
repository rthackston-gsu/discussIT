<?php

//set currentPage
$currentPage = "navHome";

// Import the application classes
require_once('include/classes.php');

// Create an instance of the Application class
$app = new Application();
$app->setup();

?>

<!doctype html>
<html lang="en">
<?php include 'include/head.php'; ?>
<body>
	<?php include 'include/header.php'; ?>
	<div id="barba-wrapper">
	<div class="barba-container" data-id="navHome">
	<main id="wrapper">
		<h2>IT 3234 Class Discussions</h2>

		<p>
			This private discussion site is for students
			enrolled in Dr. Thackston's IT courses.
			Students currently registered in one of my courses may
			<a href="register.php">create an account</a>
			or proceed directly to the
			<a href="login.php">login page</a>.
		</p>
	</main>
	</div>
	</div>
	<?php include 'include/footer.php'; ?>
	<?php $app->includeJavascript(array('jquery-3.3.1.min','site','barba','mybarba')); ?>
</body>
</html>
