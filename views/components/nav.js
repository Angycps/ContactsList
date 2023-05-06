const navbar = document.querySelector('#navbar');

const createNavHome = () => {
    navbar.innerHTML = `
    <div class="max-w-7xL bg-violet-700 h-16 mx-auto flex items-center px-4 justify-between">
                <p class="text-white font-bold text-xl ">Lista de Contactos</p>

        <!-- version movil -->
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-violet-800 rounded-lg">

                <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

        <!-- version de escritorio  -->
            <div class="hidden md:flex flex-row gap-4">
                <a href="/login/" class="transition ease-in-out text-white font-bold bg-violet-600 hover:bg-violet-800 py-2 px-4 rounded-lg">Login</a>
                <a href="/signin/" class="transition ease-in-out text-white font-bold bg-violet-600 hover:bg-violet-800 py-2 px-4 rounded-lg">Singin</a>
            </div>

        <!-- menu movil  -->
            <div class="bg-slate-900/70 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
                <a href="/login/" class="transition ease-in-out text-white font-bold bg-violet-600 hover:bg-violet-800 py-2 px-4 rounded-lg">Login</a>
                <a href="/signin/" class="transition ease-in-out text-white font-bold bg-violet-600 hover:bg-violet-800 py-2 px-4 rounded-lg">Singin</a>
            </div>
    </div>
    `;
};

const createNavSignup = () => {
    navbar.innerHTML = `
    <div class="max-w-7xL bg-violet-700 h-16 mx-auto flex items-center px-4 justify-between">
                <p class="text-white font-bold text-xl ">Lista de Contactos</p>

        <!-- version movil -->
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-violet-800 rounded-lg">

                <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

        <!-- version de escritorio  -->
            <div class="hidden md:flex flex-row gap-4">
                <a href="/login/" class="transition ease-in-out text-white font-bold bg-violet-600 hover:bg-violet-800 py-2 px-4 rounded-lg">Login</a>
            </div>

        <!-- menu movil  -->
            <div class="bg-slate-900/70 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
                <a href="/login/" class="transition ease-in-out text-white font-bold bg-violet-600 hover:bg-violet-800 py-2 px-4 rounded-lg">Login</a>
    </div>
    `;
};

const createNavLogin = () => {
    navbar.innerHTML = `
    <div class="max-w-7xL bg-violet-700 h-16 mx-auto flex items-center px-4 justify-between">
                <p class="text-white font-bold text-xl ">Lista de Contactos</p>

        <!-- version movil -->
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-violet-800 rounded-lg">

                <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

        <!-- version de escritorio  -->
            <div class="hidden md:flex flex-row gap-4">
                <a href="/signup/" class="transition ease-in-out text-white font-bold bg-violet-600 hover:bg-violet-800 py-2 px-4 rounded-lg">Sign up</a>
            </div>

        <!-- menu movil  -->
            <div class="bg-slate-900/70 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
                <a href="/singup/" class="transition ease-in-out text-white font-bold bg-violet-600 hover:bg-violet-800 py-2 px-4 rounded-lg">Sing up</a>
    </div>
    `;
};


const createNavContacts = () => {
    navbar.innerHTML = `
    <div class="max-w-7xL bg-violet-700 h-16 mx-auto flex items-center px-4 justify-between">
                <p class="text-white font-bold text-xl ">Lista de Contactos</p>

        <!-- version movil -->
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-violet-800 rounded-lg">

                <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

        <!-- version de escritorio  -->
            <div class="hidden md:flex flex-row gap-4">
                <button id="close-btn" class="transition ease-in-out text-white font-bold bg-violet-600 hover:bg-violet-800 py-2 px-4 rounded-lg">Sign out</button>
            </div>

        <!-- menu movil  -->
            <div class="bg-slate-900/70 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
                <button id="close-btn" class="transition ease-in-out text-white font-bold bg-violet-600 hover:bg-violet-800 py-2 px-4 rounded-lg">Sign out</button>
    
    </div>
    `;
};

if (window.location.pathname === '/'){
    createNavHome();
} else if (window.location.pathname === '/signup/') {
    createNavSignup();
} else if (window.location.pathname === '/login/') {
    createNavLogin();
} else if (window.location.pathname === '/contacts/') {
    createNavContacts();
}

const navBtn = navbar.children[0].children[1];

navBtn.addEventListener('click', e => {
 const menuMobile = navbar.children[0].children[3];
    if (!navBtn.classList.contains('active')) {
        navBtn.classList.add('active');
        navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />'
        menuMobile.classList.remove('hidden');
        menuMobile.classList.add('flex');

    } else {
        navBtn.classList.remove('active');
        navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />'
        menuMobile.classList.add('hidden');
        menuMobile.classList.remove('flex');
    }
    
});



const closeBtnDesktop = navbar.children[0].children[2].children[0]; 
const closeBtnMobile = navbar.children[0].children[3].children[0]; 

closeBtnDesktop.addEventListener('click', async e => {
try {
    await axios.get('/api/logout');
    window.location.pathname = '/login';

} catch (error) {
    console.log(error);
}
});

closeBtnMobile.addEventListener('click', async e => {
    try {
        await axios.get('/api/logout');
        window.location.pathname = '/login';
    
    } catch (error) {
        console.log(error);
    }
    });
