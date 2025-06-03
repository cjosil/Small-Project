<?php
	$inData = getRequestInfo();
	
	$firstName = $inData["FirstName"];
    $lastName = $inData["LastName"];
    $login = $inData["Login"]; 
    $password = $inData["Password"]; 

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		// Check for duplicate Username
		$checkDuplicateUsername = $conn->prepare("Select Login from Users where Login=?");
		$checkDuplicateUsername->bind_param("s", $login);
		$checkDuplicateUsername->execute();
		$result = $checkDuplicateUsername->get_result();
		if ($result->num_rows > 0)
		{
			returnWithError("Username is already taken.");
		}
		$checkDuplicateUsername->close();

		// Register new users
		if($result->num_rows == 0)
		{
			$stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
			$stmt->bind_param("ssss", $firstName,$lastName, $login, $password);
			$stmt->execute();
			$stmt->close();
			$conn->close();
			returnWithError("");
		}
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
