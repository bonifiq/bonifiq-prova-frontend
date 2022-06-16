function doCreateStyle() {
    const style = document.createElement('style');

    style.textContent = `
        .bonifiq-widget-container {
            background-color: white;
            border-radius: 4px 4px 0 0;
            bottom: 0;
            height: 40px;
            max-height: 40px;
            max-width: 260px;
            overflow: hidden;
            position: fixed;
            right: 3vw;
            transition: 500ms ease-out;
            width: 94vw;
            z-index: 1000;
        }

        .bonifiq-widget-container.open {
            height: calc(100vh - 10px);
            max-height: 600px;
        }

        .bonifiq-widget-header {
            align-items: center;
            background-color: #3f51b5;
            background-image: linear-gradient(0, rgba(0, 0, 0, 0.12), rgba(255, 255, 255, 0.12));
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            box-shadow: 0 0 8px black;
            color: white;
            cursor: pointer;
            display: flex;
            font-size: 1.1em;
            height: 41px;
            justify-content: space-between;
            padding: 0 10px;
            width: 100%;
            z-index: 1000;
        }

        .bonifiq-widget-title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .bonifiq-widget-icon {
            display: flex;
            fill: white;
            transform: rotate(-90deg);
            transition-duration: 300ms;
        }

        .open .bonifiq-widget-icon {
            transform: rotate(90deg);
        }

        .bonifiq-width-content-container {
            border-left: 1px solid rgba(0, 0, 0, 0.3);
            border-right: 1px solid rgba(0, 0, 0, 0.3);
            height: calc(100% - 41px);
            overflow: auto;
            padding: 10px;
        }

        .bonifiq-user-label:not(:last-child) {
            margin-bottom: 5px;
        }
    `;

    return style;
}

async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    return users;
}

function doCreateUserLabel(name) {
    const label = document.createElement('div');
    label.className = 'bonifiq-user-label';
    label.innerHTML = `<strong>Nome:</strong> ${name}`;
    return label;
}

async function doCreateWidget() {
    const widget = document.createElement('section');
    widget.className = 'bonifiq-widget-container';

    const header = document.createElement('div');
    header.className = 'bonifiq-widget-header';
    header.addEventListener('click', () => {
        widget.classList.toggle('open');
        title.innerText = widget.classList.contains('open') ? 'Lista de pessoas' : 'Clique para abrir';
    });

    const title = document.createElement('span');
    title.className = 'bonifiq-widget-title';
    title.innerText = 'Clique para abrir';
    header.appendChild(title);

    const icon = document.createElement('span');
    icon.className = 'bonifiq-widget-icon';
    icon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707"/></svg>';
    header.appendChild(icon);

    const content = document.createElement('div');
    content.className = 'bonifiq-width-content-container';

    const users = await fetchUsers();
    users.forEach(user => { content.appendChild(doCreateUserLabel(user.name)) });

    widget.appendChild(header);
    widget.appendChild(content);
    return widget;
}

window.onload = async () => {
    const widget = await doCreateWidget();
    const style = doCreateStyle();
    document.head.appendChild(style);
    document.body.appendChild(widget);
    console.log('widget instalado');
};
