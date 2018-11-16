$( document ).ready(function() {
	let role1;
	let domain1 = 'test';
	$(" input[name='optradio']").click(function(){
		if($('input[name="optradio"]:checked').val() == "enterprise"){
			$("#divDomain").show();
		} else {
			$("#divDomain").hide();
		}
	});
	// SUBMIT FORM
    $("#customerForm").submit(function(event) {
		// Prevent the form from submitting via the browser.
		var radioValue = $("input[name='optradio']:checked").val();
		if(radioValue){
			role1 = radioValue;
		}
		event.preventDefault();
		ajaxPost();
	});
    function ajaxPost(){
		let username = $("#username").val(); username = username.trim();
		let password = $("#password").val();password = password.trim();
		let email = $("#email").val(); email = email.trim();
		let domain = $("#domain").val(); domain = domain.trim();
		// PREPARE FORM DATA
    	var formData = {username: username, password: password, email:  email, role: role1, domain: domain}
    	// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : "/user/signup",
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(customer) {
				if(customer.state == "ok"){
					if(customer.role == "personal") window.location = "/user/manager/1";
					else if(customer.role == "enterprise") window.location = "/enterprise/manager";
				}
				if(customer.state == "fail"){
					// console.log("customer:", customer);
					if(customer.userBlank) $('#errUserBlank').show();
					else $('#errUserBlank').hide();
					if(customer.passBlank) $('#errPassBlank').show();
					else $('#errPassBlank').hide();
					if(customer.emailBlank) $('#errEmailBlank').show();
					else $('#errEmailBlank').hide();
					if(customer.userDup) $('#errUser').show();
					else $('#errUser').hide();
					if(customer.emailDup) $('#errEmail').show();
					else $('#errEmail').hide();
					if(customer.blankDomain == true) $("#blankDomain").show();
					else $("#blankDomain").hide();
					if(customer.existDomain) $("#existDomain").show();
					else  $("#existDomain").hide();
				}
			},
			error : function(e) {
				
				//alert("Error tuan!")
				console.log("ERROR: ", e);
			}
		});
    	// Reset FormData after Posting
    	resetData();
    }
    function resetData(){
		//do sth...
    }
})