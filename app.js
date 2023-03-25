// Instantiate github
const github = new GitHub;

// Instantiate the UI class 
const ui = new UI; 

// Search input 
const searchUser = document.getElementById('searchUser');

// Search input event listener 
searchUser.addEventListener('keyup', (e) => {
    // Get input text 
    const userText = e.target.value; 
    
    if(userText !== ''){
       // Make http call 
       github.getUser(userText)
       .then(data => {
        if(data.profile.message === 'Not Found'){
        //show alert
        ui.showAlert('User not found', 'alert alert-danger')
        console.log(data);
        } else {
            // Show profile
            console.log(data);
            ui.showProfile(data.profile);
            ui.showRepos(data.repos);
        } 
        // console.log(data);
       })
    } else {
        // Clear profile
        ui.clearProfile();
    }
} )
