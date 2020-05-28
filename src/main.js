import api from './api';

class App {
    
    constructor() {
        this.repositories = [];
        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');
        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    async addRepository(event) {
        event.preventDefault();

        const repoInput = this.inputEl.value;
        if (repoInput.length === 0) {
            return;
        }
        this.setLoading();
        try {
            const response = await api.get(`/repos/${repoInput}`);

            console.log(response.data);
    
            const { name, description, owner: { avatar_url } } = response.data;
    
            
            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url: ''
            });
            this.render();
        } catch(err) {
            alert('repositório não existe!');
        }
        this.setLoading(false);
    }

    setLoading(loading = true) {
        if (loading === true) {
            let loadingEL = document.createElement('span');
            loadingEL.appendChild(document.createTextNode('carregando'));
            loadingEL.setAttribute('id', 'loading');
            this.formEl.appendChild(loadingEL);
        } else {
            document.getElementById('loading').remove();
        }

    }

    render() {
        this.listEl.innerHTML = '';
        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);
            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);

            this.listEl.appendChild(listItemEl);
        })

    }
}

new App();