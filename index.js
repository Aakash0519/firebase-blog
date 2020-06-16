// Your web app's Firebase configuration
	var firebaseConfig = {
    apiKey: "AIzaSyBzVMBlw2M2E2fs0aBblRDpKj2jxXP0D60",
    authDomain: "blogapp-a79f6.firebaseapp.com",
    databaseURL: "https://blogapp-a79f6.firebaseio.com",
    projectId: "blogapp-a79f6",
    storageBucket: "blogapp-a79f6.appspot.com",
    messagingSenderId: "407135533851",
    appId: "1:407135533851:web:6df802c2d7060ea27531be",
    measurementId: "G-87YDDZFJQ8"
  };
 
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.auth.Auth.Persistence.LOCAL;
			
var likeChecker=false;

    function googlesignin(){
      console.log("function chal gya h");
   var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
  
  console.log("signed in");
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);
});
}
   				

	function signin(email,password){
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	alert(errorMessage);
	// ...
});
}
	function signup(email,password,Cpassword)
	{
		if(password==Cpassword){
			firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				alert(errorMessage + errorCode);  
			});
		}
		else
		{
				alert("password dont match");
		}
	}

	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.    
    var email = user.email;    
    var uid = user.uid;
    currentUser=user;
    console.log(currentUser.email+"has logged in");
   
    // ...
  } 
});


//event listeners

$("#btn-login").click(function()
	{
		var email = $("#inputEmail").val();
		var password = $("#inputPassword").val();
		signin(email,password);
	});

$("#btn-logout").click(function()
{
	firebase.auth().signOut();
});

$("#btn-signup").click(function()
	{
		var email = $("#inputEmail").val();
		var password = $("#inputPassword").val();
		var Cpassword = $("#inputConfirmPassword").val();
		
		signup(email,password,Cpassword);
	});
		
$("#btn-reset").click(function()
{
  var auth = firebase.auth();
  var email = $("#inputEmail").val();
  if(email!="")
  {
    auth.sendPasswordResetEmail(email).then(function()
    {
        alert("email has been sent to you. Please check and verify.");
    }).catch(function(error)
    {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage + errorCode); 
    });
  }
  else
  {
    alert("please enter your email");
  }
});


$("#btn-update").click(function()
  {
    var phone = $("#phone").val();
    var address = $("#address").val();
    var bio = $("#bio").val();
    var firstName = $("#firstName").val();
    var secondName = $("#secondName").val();
    var country = $("#country").val();
    var gender = $("#gender").val();   

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if(firstName!="" && secondName!="" && phone!="" && address!="" && bio!="" && country!="" && gender!="")
    {
        var userData=
        {
          "phone": phone,
          "address": address,
          "bio": bio,
          "firstName": firstName,
          "secondName": secondName,
          "country": country,
          "gender": gender,
        };
        usersRef.set(userData, function(error)
        {
            if(error)
            {
              var errorCode = error.code;
              var errorMessage = error.message;
              alert(errorMessage + errorCode); 
            }
            else
            {
              window.location.href = "mainpage.html";
            }

        });
    }
    else
    {
        alert("Form is Incomplete, Please fill out all the fields");
    }
    
   
  });
$("#updatesettings").click(function()
  {
    window.location.href = "acc.html";
  });


$("#like").click(function(key)
  {
    likeChecker=true;
    var likeRef = firebase.database().ref().child("Likes");
    var userID = firebase.auth().currentUser.uid;
    likeRef.on("value").then(function(snapshot)
        { 
            if( snapshot.child(key).hasChild(userID))
            {
                likeRef.child(key).child(userID).remove();
                likeChecker=false;
                $("#like").attr("class","alert alert-danger");
            }
            else
            {
                likeRef.child(key).child(userID).set(true);
                likeChecker=true;
                $("#like").attr("class","alert alert-success");
            }

        });


  });
$("#comments").click(function()
  {
  });
$("#noOfLike").click(function()
  {
  });


function switchView(view)
{
  $.get({
    url:view,
    cache:false,
  }).then(function(data){
    $("#container").html(data);
  }); 

}

              function googlesignin(){
   var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
  
  console.log("signed in");
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);
});
}
 

function facesignin(){

 var provider = new firebase.auth.FacebookAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
  console.log("signed in");
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);
});
}

function twittersignin(){

  var provider = new firebase.auth.TwitterAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
  console.log("signed in");
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);
});
}



function githubsignin(){

var provider = new firebase.auth.GithubAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
   console.log("signed in");
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
 alert(errorMessage);
});
}

function anonymus(){
  firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
}


