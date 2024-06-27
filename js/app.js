window.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector("#main");
    flag = false;
    const APIURL = "https://api.github.com/users/";
    const searchBox = document.querySelector("#form")
    const getUser = async (username) => {
        const response = await fetch(APIURL + username);
        const data = await response.json()
        console.log(data);
        if (data.status == 404) {
            alert('User Not Found');
            return;
        }
        const card = `
        <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
            </div>
            <div class="user-info">
                <h2>${data.login}</h2>
                
                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos">
                  
                </div>
            </div>
        </div>
    `
        main.innerHTML = card;
        getRepos(username)
    }


    // init call
    getUser("YunusPanwar70");


    const getRepos = async (username) => {
        const repos = document.querySelector("#repos")
        const response = await fetch(APIURL + username + "/repos")
        const data = await response.json();
        if (!Array.isArray(data)) {
            return
        }
        data.forEach(
            (item) => {

                const elem = document.createElement("a")
                elem.classList.add("repo")
                elem.href = item.html_url
                elem.innerText = item.name
                elem.target = "_blank"
                repos.appendChild(elem)
            }
        )
    }

    // let submit = document.getElementById("submit");
    // submit.addEventListener("submit", function() {
    //     if (searchBox.value != "") {
    //         getUser(searchBox.value);
    //         searchBox.value = ""
    //     }
    //     return false;
    // })

    const formSubmit = (e) => {
        e.preventDefault()
        let userValue = e.target.children[0].value;
        if (userValue != "") {
            getUser(userValue.trim());
            userValue = ''
        }
        return false;
    }


    searchBox.addEventListener('submit', formSubmit)

    // <a class="repo" href="#" target="_blank">Repo 1</a>
    //                 <a class="repo" href="#" target="_blank">Repo 2</a>
    //                 <a class="repo" href="#" target="_blank">Repo 3</a>
})
