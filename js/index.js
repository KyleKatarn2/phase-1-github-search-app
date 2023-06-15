
const init = () => {
    const form = document.querySelector("#github-form");
    const list = document.querySelector("#user-list");
    const repo = document.querySelector("#repos-list");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        list.innerHTML = "";
        repo.innerHTML = "";

        fetch(`https://api.github.com/search/users?q=${event.target.search.value}`)
            .then((response) => response.json())
            .then(data => data.items.forEach(renderUser))
    })
    
    function renderUser(userData) {
        let card = document.createElement('li');
        card.className = 'card'
        card.innerHTML = `<h2>${userData.login}</h2>
            <img
                src="${userData.avatar_url}"
                alt="${userData.login} avatar"
            />
            <div class="content">
                <a>${userData.html_url} Profile</a>
            </div>
        `
        card.querySelector("a").addEventListener('click', (e) => handleClick(userData));

       list.appendChild(card);
    }

    function handleClick(userData) {
        fetch(`https://api.github.com/users/${userData.login}/repos`)
        .then((response) => response.json())
        .then(userRepos => {
            list.innerHTML = "";
            renderUser(userData);
            userRepos.forEach(renderRepos)
        })
    }

    function renderRepos(user) {
        const li = document.createElement('li');
        li.innerHTML = user.full_name;
        repo.append(li);
    }

};

document.addEventListener("DOMContentLoaded", init)