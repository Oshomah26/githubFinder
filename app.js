// Instantiate github
// const github = new GitHub;

// Function that takes in all the user parameters
async function getUser(user) {
    const client_id = '7fdff6f64f733604f8d0';
    const client_secret = 'd6d4699ee9ce177c8e3cda253147567c94c6c5e2';
    const repos_count = 5;
    const repos_sort = 'created: asc';
  
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);
    const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${repos_count}&sort=${repos_sort}&client_id=${client_id}&client_secret=${client_secret}`);
  
    const profile = await profileResponse.json();
    const repos = await reposResponse.json();
  
    return {
      profile,
      repos
    };
  }
  

// Instantiate the UI class 
// const ui = new UI; 


    

    // Display profile in UI

    function showProfile(user){
        profile.innerHTML = `
        <div class="card card-body mb-3">
          <div class ="row">
            <div class="col-md-3">
            <img class= "img-fluid mb-2" src="${user.avatar_url}">
            <a href="${user.html_url}" target = "_blank" class = "btn btn-primary btn-block mb-4">View Profile</a>
            
            </div>
            <div class="col-md-9">
            <span class="badge badge-primary"> Public Repos:${user.public_repos}
            </span>
            <span class="badge badge-secondary"> Public Gists:${user.public_gists}
            </span>
            <span class="badge badge-success"> Public Followers:${user.followers}
            </span>
            <span class="badge badge-info"> Public Following:${user.following}
            </span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member since: ${user.created_at}</li>
            </ul>
            </div>
          </div>
        </div>

        <h3 class="page-heading mb-3">Latest Repos</h3>
        <div id="repos"></div>
        `;
    }

    // Show user repos
    function showRepos(repos) {
        let output = '';
        
        repos.forEach(function(repo){
            output += `
              <div class = "card card-body mb-2">
                <div class="row">
                 <div class="col-md-6">
                  <a href="${repo.html_url}" target ="_blank">${repo.name} </a>
                 </div>
                 <div class="col-md-6">
                 <span class="badge badge-primary"> Stars:${repo.stargazers_count}
                 </span>
                 <span class="badge badge-secondary"> Watchers: ${repo.watchers_count}
                 </span>
                 <span class="badge badge-success"> Forks:${repo.forks_count}
                 </span>
                 </div>
              </div>
              </div>
            `;
        });

        //Output repos
        document.getElementById('repos').innerHTML = output;
    }

    // Show alert message
    function showAlert(message, className){
        //Clear any remaining alerts
        clearAlert()
        // Create div
        const div = document.createElement('div');
        // Add Classes
        div.className = className;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent 
        const container = document.querySelector('.searchContainer'); 
        // Get search box 
        const search = document.querySelector('.search'); 
        // Insert Alert 
        container.insertBefore(div, search);
        
        //Timeout after 3 secs
        setTimeout(() => {
            this.clearAlert();
        }, 3000);

    }

    function clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove();
        }
    }

    // Clear profile
    function clearProfile(){
        this.profile.innerHTML = '';
    }


// Search input 
const searchUser = document.getElementById('searchUser');

// Search input event listener 
searchUser.addEventListener('keyup', (e) => {
    // Get input text 
    const userText = e.target.value; 
    
    if(userText !== ''){
       // Make http call 
      getUser(userText)
       .then(data => {
        if(data.profile.message === 'Not Found'){
        //show alert
        showAlert('User not found', 'alert alert-danger')
        console.log(data);
        } else {
            // Show profile
            console.log(data);
            showProfile(data.profile);
            showRepos(data.repos);
        } 
        // console.log(data);
       })
    } else {
        // Clear profile
        ui.clearProfile();
    }
} )
